import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../../services/account.service';
import { EventsService } from '../../../../services/events.service';
import { TransactionService } from '../../../../services/transaction.service';
import { Account } from '../../../../models/account';
import { Transaction } from '../../../../models/transaction';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css'],
})
export class ChartListComponent implements OnInit {
  transactions: Transaction[] = [];
  selectedAccounts: Account[] = [];
  accounts: Account[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.refreshAccounts();

    this.eventsService.accountSelectionChange.subscribe(() =>
      this.refreshData()
    );

    this.eventsService.accountsChange.subscribe(() => this.refreshAccounts());

    this.route.paramMap.subscribe((params) => {
      var accountId = params.get('accountId');
      if (accountId == null || accountId.trim().length == 0) {
        //do nothing
      } else {
        this.accounts.forEach((account) => {
          if (account.id == accountId) {
            this.accountService.selectAccount(account);
          } else {
            if (account.selected) {
              this.accountService.toggleAccount(account);
            }
          }
        });
      }
    });
  }

  refreshAccounts() {
    this.accounts = this.accountService.getAccounts();
    this.refreshData();
  }

  refreshData() {
    //clear
    while (this.transactions.length > 0) this.transactions.pop();

    this.selectedAccounts = this.accountService.getSelectedAccounts();

    this.selectedAccounts.forEach((account) => {
      this.transactions = this.transactions.concat(account.transactions);
    });
  }
}
