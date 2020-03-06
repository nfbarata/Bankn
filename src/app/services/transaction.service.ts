import { Injectable, Inject } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import { EventsService } from './events.service';
import { AccountService } from './account.service';

import { Account } from "../models/account";
import { Transaction, TransactionType, getTransactionType } from "../models/transaction";

@Injectable({providedIn: 'root'})
export class TransactionService {

  importTransactions;

  constructor(
    private eventsService: EventsService,
    private accountService : AccountService
  ) { }

  createTransaction(
    account:Account,
    amount:Dinero,
    date:Date,
    type,
    entity:String,
    category:String,
    description:String
  ){
    var transaction = new Transaction(
        uuidv4(),
        amount,
        date,
        entity,
        category,
        description,
        type
      );
      this.accountService.addTransaction(account,transaction);
  }

  updateTransaction(
    account:Account,
    transaction:Transaction,
    amount:Dinero,
    date:Date,
    type,
    entity:String,
    category:String,
    description:String
  ){
    transaction.amount = amount;
    transaction.date = date;
    transaction.type = type;
    transaction.entity = entity;
    transaction.category = category;
    transaction.description = description;
    this.eventsService.transactionChange.emit();
  }

  toJson(transactions:Transaction[]){
    var results = [];
    transactions.forEach(transaction => {
      results.push({
        id: transaction.id,
        amount: transaction.amount.toUnit(),//Dinero to value, compacted result
        date: transaction.date.toISOString().substring(0,10),
        entity: transaction.entity,
        category: transaction.category,
        description: transaction.description,
        type: transaction.type.id
      });
    });
    return results;
  }

  fromJson(json, currency:String, accountId:String){
    var results = [];
    if(json!=null){
      json.forEach(transaction => {
        var newTransaction=new Transaction(
          transaction.id,
          this.accountService.toDinero(currency, transaction.amount),//value to Dinero, speed
          new Date(transaction.date),
          typeof transaction.entity  === "undefined"?null:transaction.entity,
          typeof transaction.category  === "undefined"?null:transaction.category,
          transaction.description,
          getTransactionType(transaction.type)
        )
        newTransaction.accountId=accountId;
        results.push(newTransaction);
      });
    }
    return results;
  }

  /*getReferenceTransaction(account:Account){
    return new Transaction(
      "referenceAccount-"+account.id,
      account.referenceAmount,
      account.referenceDate,
      null,
      null,
      null,
      null,
      account.referenceAmount.toUnit()>0?TransactionType.CREDIT:TransactionType.DEBIT
    );
  }*/

  getSelectedAccountsTransactions() : Transaction[]{
    var accounts : Account[] = this.accountService.getSelectedAccounts();
    return this.getTransactions(accounts);
  }

  getTransactions(accounts : Account[]) : Transaction[] {
    var transactions : Transaction[] = [];
    accounts.forEach(account => {
      account.transactions.forEach(transaction => {
        transactions.push(transaction);
      });
    });
    return transactions;
  }

  getTransaction(account:Account, id:String){
    var transactions = this.getTransactions([account]);
    for(var i = 0; i!=transactions.length;i++){
      if(transactions[i].id==id)
        return transactions[i];
    }
  }

  sortTransactions(transactions:Transaction[]){
    return transactions.sort(this.compareTransaction);
  }

  compareTransaction(a:Transaction,b:Transaction){
    return b.date-a.date;
  }

  deleteTransactionId(accountId:String, transactionId:String){
    var account = this.accountService.getAccount(accountId);
    this.deleteTransaction(account, transactionId);
  }

  deleteTransaction(account:Account, transactionId:String){
    this.accountService.deleteTransactionId(account,transactionId);
  }
}