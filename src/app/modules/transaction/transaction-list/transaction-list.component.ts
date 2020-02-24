import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';
import  { Account } from "../../../shared/models/account";
import  { Transaction } from "../../../shared/models/account";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  /*@Input() */accounts : Account[];
  transactions : Transaction[] = [];

  constructor(
    private accountService: AccountService
  ) { 
    this.accounts = this.accountService.getAccounts();//TODO take from input
    this.transactions = this.accountService.getTransactions(this.accounts);
    console.log(this.transactions.length);
  }

  ngOnInit() {
    
  }
}