import { Component, OnInit } from '@angular/core';
import { BanknService } from '../../../services/bankn.service';
import { AccountService } from '../../../services/account.service';
import { TransactionService } from '../../../services/transaction.service';
import { Account } from "../../../models/account";
import { Transaction } from "../../../models/transaction";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions : Transaction[] = [];
  selectedAccounts : Account[] = [];
  accounts : Account[] = [];

  constructor(
    private banknService: BanknService,
    private accountService: AccountService,
    private transactionService: TransactionService
  ) { 
  }

  ngOnInit() {
    this.accounts = this.accountService.getAccounts();   
    this.refreshTransactions();
    this.banknService.accountSelectionChange.subscribe(()=>{
      this.refreshTransactions();
    });
  }

  refreshTransactions(){
    this.selectedAccounts = this.accountService.getSelectedAccounts();
    this.transactions = this.transactionService.getTransactions(this.selectedAccounts);
    //this.transactions = this.accountService.getSelectedAccountsTransactions();
  }
}