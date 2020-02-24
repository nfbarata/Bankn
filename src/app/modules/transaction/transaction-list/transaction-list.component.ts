import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../shared/services/account.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  accounts = [];
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.accounts = this.accountService.getAccounts();
  }

}