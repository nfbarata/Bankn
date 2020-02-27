import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Dinero } from 'dinero.js';
import { Account } from "../models/account";
import { Transaction } from "../models/transaction";
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn:'root'
})
export class TransactionService {

  constructor(
    private accountService : AccountService
  ) { }


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
    transactions = transactions.sort(this.compareTransaction);
    return transactions;
  }

  compareTransaction(a:Transaction,b:Transaction){
    return a.date-b.date;
  }
}