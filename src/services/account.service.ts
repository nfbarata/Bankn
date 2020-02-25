import { Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { uuid } from 'uuid';
import { environment } from '../environments/environment';

import  { Account } from "../models/account";
import  { Transaction } from "../models/transaction";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  @Output() accountSelectionChange: EventEmitter<any> = new EventEmitter();
  @Output() accountsChange: EventEmitter<any> = new EventEmitter();

  private accounts : Account[] = environment.accounts;

  constructor() { }

  import(json){
    //clear
    while (this.accounts.length > 0) {
      this.accounts.pop();
    }
    
  }

  createAccount(account:Account){
    console.log(uuid());
    this.accounts.push(account);
    this.accountsChange.emit();
  }

  deleteAccountId(accountId:String){
    this.accounts = this.accounts.filter(function(account){
       return account.id != accountId;
    });
    this.accountsChange.emit();
  }

  deleteAccount(account:Account){
    this.deleteAccountId(account.id);
  }

  getAccounts() : Account[]{
    return this.accounts;
  }

  getAccount(accountId:String) : Account{
    returnAccount : Account;
    for (let i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].id == accountId) 
        return this.accounts[i];
    }
    console.error("account not found:"+accountId);
  }

  getSelectedAccounts() : Account[]{
    var accounts : Account[] = [];
    this.accounts.forEach(account => {
      if(account.selected)
        accounts.push(account);
    });
    return accounts;
  }

  getSelectedAccountsTransactions() : Transaction[]{
    var accounts : Account[] = this.getSelectedAccounts();
    return this.getTransactions(accounts);
  }

  getTransactions(accounts : Account[]) : Transaction[] {
    var transactions : Transaction[] = [];
    this.getSelectedAccounts().forEach(account => {
      account.transactions.forEach(transaction => {
        transactions.push(transaction);
      });
    });
    transactions = transactions.sort(this.compareTransaction);
    return transactions;
  }

  compareTransaction(a:Transaction,b:Transaction){
    return a.date-b.date;
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
      this.accountSelectionChange.emit();
    }
  }

  unselectAccountId(accountId){
    var account : Account = this.getAccount(accountId);
    this.unselectAccount(account);
  }

  unselectAccount(account : Account){
    if(account.selected){
      account.selected = false;
      this.accountSelectionChange.emit();
    }
  }
}