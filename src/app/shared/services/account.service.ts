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

  getAccount(id) : Account{
    return this.accounts[+id];
  }

  getTransactions(accounts : Account[]) : Transation[] {
    var transactions : Transation[] = [];
    accounts.forEach(account => {
    //TODO order
      //transactions.push(account.getTransactions());
      transactions.push(account.transactions);
    });
    return transactions;
  }
}