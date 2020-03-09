import { Injectable, Inject, Injector } from '@angular/core';

import { BanknService } from './bankn.service';
import { EventsService } from './events.service';
import { Account } from "../models/account";

import { Transaction, TransactionType } from "../models/transaction";

import { TRANSACTION_SERVICE } from '../app.module';
//import { Dinero } from '@types/dinero.js'

@Injectable({providedIn: 'root'})
export class AccountService {

  constructor(
    private injector:Injector,
    private banknService : BanknService,
    private eventsService : EventsService,
  ) { }

  createAccount(
    name:String, 
    description:String, 
    referenceAmount:Dinero, 
    referenceDate:Date,
    referenceCountry:String){
    var account : Account = new Account(
      this.createId(),
      name,
      description,
      referenceAmount,
      referenceDate,
      referenceCountry,
      null,
      true
    );
    this.banknService.addAccount(account);
  }

  updateAccount(
    id:String,
    name:String, 
    description:String, 
    referenceAmount:Dinero, 
    referenceDate:Date,
    referenceCountry:String){

    var account : Account = this.getAccount(id);
    account.name = name;
    account.description = description;
    account.referenceAmount = referenceAmount;
    account.referenceDate = referenceDate;
    account.referenceCountry = referenceCountry;
    this.eventsService.accountsChange.emit();
  }

  toJson(accounts:Account[]){
    var transactionService = this.injector.get(TRANSACTION_SERVICE);
    var results = [];
    accounts.forEach(account => {
      results.push({
        id: account.id,
        name: account.name,
        description: account.description,
        referenceAmount: account.referenceAmount.toObject(),
        referenceDate: account.referenceDate.toISOString().substring(0,10),
        referenceCountry: account.referenceCountry,
        transactions: transactionService.toJson(account.transactions),
        selected: account.selected
      });
    });
    return results;
  }

  fromJson(json){
    var transactionService = this.injector.get(TRANSACTION_SERVICE);
    var results = [];
    if(json!=null){
      json.forEach(account => {
        results.push(new Account(
          account.id,
          account.name,
          account.description,
          Dinero(account.referenceAmount),
          new Date(account.referenceDate),
          account.referenceCountry,
          transactionService.fromJson(account.transactions, account.referenceAmount.currency, account.id),
          account.selected
        ));
      });
    }
    return results;
  }

  private createId():String{
    //return uuidv4();
    var accounts:Account[] = this.getAccounts();
    var accountIds:String[]=[];
    for (let i=0; i < accounts.length; i++) {
      accountIds.push(accounts[i].id);
    }
    accountIds = accountIds.sort((a:String,b:String):any=>{
      return Number(a)-Number(b);
    });
    let i;
    for (i=0; i < accountIds.length; i++) {
      if(accountIds[i].localeCompare(i+"")!=0){
        console.log(i);
        return i+"";
      }
    }
    return (i)+"";
  }


  private getPrecision(currency:String){
    //TODO guardar este valor em memória
    var reference = Dinero({currency:currency});
    return reference.getPrecision();
  }

  toDinero(currency:String, amount){
    return Dinero({
        amount:amount * Math.pow(10,this.getPrecision(currency)),
        currency:currency
    });
  }

  getCurrency(account:Account){
    return account.referenceAmount.getCurrency();
  }

  deleteAccountId(accountId:String){
    this.banknService.deleteAccountId(accountId);
  }

  deleteAccount(account:Account){
    this.deleteAccountId(account.id);
  }

  getAccounts() : Account[]{
    return this.banknService.getAccounts();
  }

  getAccount(accountId:String) : Account{
    var accounts:Account[] = this.getAccounts();
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id == accountId) 
        return accounts[i];
    }
    console.error("account not found:"+accountId);
  }
  
  getSelectedAccounts() : Account[]{
    var accounts : Account[] = [];
    this.banknService.getAccounts().forEach(account => {
      if(account.selected)
        accounts.push(account);
    });
    return accounts;
  }

  toggleAccountId(accountId:String){
    var account : Account = this.getAccount(accountId);
    this.toggleAccount(account);
  }

  toggleAccount(account : Account){
    if(account.selected)
      this.unselectAccount(account);
    else
      this.selectAccount(account);
  }

  selectAccountId(accountId){
    var account : Account = this.getAccount(accountId);
    this.selectAccount(account);
  }

  selectAccount(account : Account){
    if(!account.selected){
      account.selected = true;
      this.eventsService.accountSelectionChange.emit();
    }
  }

  unselectAccountId(accountId){
    var account : Account = this.getAccount(accountId);
    this.unselectAccount(account);
  }

  unselectAccount(account : Account){
    if(account.selected){
      account.selected = false;
      this.eventsService.accountSelectionChange.emit();
    }
  }

  addTransaction(account:Account, transaction:Transaction){
    transaction.accountId = account.id;
    account.transactions.push(transaction);
    var transactionService = this.injector.get(TRANSACTION_SERVICE);
    account.transactions = transactionService.sortTransactions(account.transactions);
    this.eventsService.accountTransactionsChange.emit();
  }

  deleteTransactionId(account:Account, transactionId:String){
    account.transactions = account.transactions.filter(function(transaction){
       return transaction.id != transactionId;
    });
    this.eventsService.transactionChange.emit();
    this.eventsService.accountTransactionsChange.emit();
  }

  getInitialValue(account:Account):Dinero{
    var initialBalance = this.toDinero(
      account.referenceAmount.getCurrency(),
      account.referenceAmount.toUnit()
    );

    //calculate initial balance
    for (let i = account.transactions.length-1; i >=0 ; i--) {
      if(account.referenceDate.getTime()>account.transactions[i].date.getTime()){
        switch(account.transactions[i].type){
          case TransactionType.CREDIT:
            initialBalance = initialBalance.subtract(account.transactions[i].amount);
          break;
          case TransactionType.DEBIT:
            initialBalance = initialBalance.add(account.transactions[i].amount);
          break;
        }
      }else{
        //no need to continue
        break;
      }
    }
    return initialBalance;
  }

  getInitialValueMultiple(accounts:Account[]):Dinero{
    var initialBalance = this.toDinero(
      accounts[0].referenceAmount.getCurrency(),//TODO dif currencies
      0
    );
    accounts.forEach(account => {
      initialBalance = initialBalance.add(this.getInitialValue(account));
    });
    return initialBalance;
  }
}