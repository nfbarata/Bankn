import { Injectable, Inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Account } from "../models/account";
import { Transaction, TransactionType, getTransactionType } from "../models/transaction";
import { EventsService } from '../services/events.service';
import { AccountService } from '../services/account.service';

@Injectable({providedIn: 'root'})
export class TransactionService {

  constructor(
    private eventsService: EventsService,
    private accountService : AccountService
  ) { }

  createTransaction(
    account:Account,
    amount:Dinero,
    date:Date,
    type:String,
    toAccount:String,
    entity:String,
    category:String,
    description:String
  ){
    var transaction = new Transaction(
        uuidv4(),
        transaction.amount,
        transaction.date,
        transaction.toAccount,
        transaction.entity,
        transaction.category,
        transaction.description,
        transaction.type
      );
      this.accountService.addTransaction(account,transaction);
  }

  updateTransaction(
    account:Account,
    transaction:Transaction,
    amount:Dinero,
    date:Date,
    type:String,
    toAccount:String,
    entity:String,
    category:String,
    description:String
  ){
    transaction.amount = amount;
    transaction.date = date;
    transaction.type = type;
    transaction.toAmount = toAccount;
    transaction.entity = entity;
    transaction.category = category;
    transaction.description = description;
    this.eventsService.transactionChange.emit();
  }

  toJson(transactions:Transaction[]){
    var results = [];
    transactions.forEach(transaction => {
      results.push(new Transaction(
        transaction.id,
        transaction.amount.toUnit(),//Dinero to value, compacted result
        transaction.date,
        transaction.toAccount,
        transaction.entity,
        transaction.category,
        transaction.description,
        transaction.type.id
      ));
    });
    return results;
  }

  fromJson(json, currency:String){
    var results = [];
    if(json!=null){
      json.forEach(transaction => {
        results.push(new Transaction(
          transaction.id,
          this.accountService.toDinero(currency, transaction.amount),//value to Dinero, speed
          transaction.date,
          typeof transaction.toAccount === "undefined"?null:transaction.toAccount,
          typeof transaction.entity  === "undefined"?null:transaction.entity,
          typeof transaction.category  === "undefined"?null:transaction.category,
          transaction.description,
          getTransactionType(transaction.type)
        ));
      });
    }
    return results;
  }

  getReferenceTransaction(account:Account){
    return new Transaction(
      "referenceAccount-"+account.id,
      account.referenceAmount,
      account.referenceDate,
      null,
      null,
      null,
      null,
      null
    );
  }

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
}