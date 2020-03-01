import { Injectable, Inject, Injector } from '@angular/core';
import { Account } from "../models/account";
import { Transaction } from "../models/transaction";
import { BanknService } from '../services/bankn.service';
import { EventsService } from '../services/events.service';
import { TRANSACTION_SERVICE } from '../modules/app/app.module';
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
      results.push(new Account(
        account.id,
        account.name,
        account.description,
        account.referenceAmount.toObject(),
        account.referenceDate,
        account.referenceCountry,
        transactionService.toJson(account.transactions),
        account.selected
      ));
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
          account.referenceDate,
          account.referenceCountry,
          transactionService.fromJson(account.transactions, account.referenceAmount.currency),
          account.selected
        ));
      });
    }
    return results;
  }

  private createId():String{
    //return uuidv4();
    var accounts:Account[] = this.getAccounts();
    for (let i = 0; i < accounts.length; i++) {
      var is = i.toString();
      if(!accounts[i].id==is)
        return i.toString();
    }
    return "0";
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
    account.transactions.push(transaction);
    this.eventsService.accountTransactionsChange.emit();
  }
}