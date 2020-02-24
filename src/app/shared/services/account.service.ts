import { Injectable } from '@angular/core';
import { uuid } from 'uuid';
import { environment } from '../../../environments/environment';

import  { Account } from "../models/account";
import  { Transation } from "../models/transaction";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  accounts : Account[] = environment.accounts;

  constructor() { }

  createAccount(account){
    console.log(uuid())
    this.accounts.push(account);
  }

  deleteAccount(account){
    //this.accounts.
  }

  getAccounts() : Account[]{
    return this.accounts;
  }

  getAccount(accountId) : Account{
    returnAccount : Account;
    for (let i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].id == accountId) 
        return this.accounts[i];
    }
    console.error("account not found:"+accountId);
  }

  getTransactions(accounts : Account[]) : Transation[] {
    var transactions : Transation[] = [];
    accounts.forEach(account => {
    //TODO order
      //transactions.push(account.getTransactions());
      account.transactions.forEach(transaction => {
        transactions.push(transaction);
      });
    });
    return transactions;
  }
}