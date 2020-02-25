import { Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { uuid } from 'uuid';
import { environment } from '../../../environments/environment';

import  { Account } from "../models/account";
import  { Transaction } from "../models/transaction";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  @Output() accountSelectionChange: EventEmitter<any> = new EventEmitter();
  
  private accounts : Account[] = environment.accounts;

  constructor() { }

  createAccount(account:Account){
    console.log(uuid());
    this.accounts.push(account);
  }

  deleteAccount(accountId:String){
    this.accounts = this.accounts.filter(function(account){
       return account.id != accountId;
    });
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
    accounts.forEach(account => {
      if(account.selected)
        accounts.push(account);
    });
    return accounts;
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

  toggleAccount(accountId:String){
    var account : Account = this.getAccount(accountId);
    account.selected = !account.selected;
    this.accountSelectionChange.emit();
  }

  selectAccount(accountId){
    var account : Account = this.getAccount(accountId);
    account.selected = true;
    this.accountSelectionChange.emit();
  }

  unselectAccount(accountId){
    var account : Account = this.getAccount(accountId);
    account.selected = false;
    this.accountSelectionChange.emit();
  }
}