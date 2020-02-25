import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';
import  { Account } from "../../../shared/models/account";
import  { Transaction } from "../../../shared/models/transaction";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions : Transaction[] = [];
  selectedAccounts : Account[] = [];

  constructor(
    private accountService: AccountService
  ) { 
  }

  ngOnInit() {   
    this.refreshTransactions();
    this.accountService.accountSelectionChange.subscribe(()=>{
      this.refreshTransactions();
    });
  }

  refreshTransactions(){
    this.selectedAccounts = this.accountService.getSelectedAccounts();
    this.transactions = this.accountService.getTransactions(this.selectedAccounts);
    //this.transactions = this.accountService.getSelectedAccountsTransactions();
  }
}