import { Injectable } from '@angular/core';
import { uuid } from 'uuid';
import { environment } from '../../../environments/environment';

import  { Account } from "../models/account";
import  { Transaction } from "../models/transaction";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
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

  getTransactions(accounts : Account[]) : Transation[] {
    var transactions : Transaction[] = [];
    accounts.forEach(account => {
    //TODO order
      //transactions.push(account.getTransactions());
      account.transactions.forEach(transaction => {
        transactions.push(transaction);
      });
    });
    var points = [40, 100, 1, 5, 25, 10];
    transactions.sort(this.compareTransaction);
    return transactions;
  }

  compareTransaction(a:Transaction,b:Transaction){
    return a.getDate()-b.getDate();
  }
}