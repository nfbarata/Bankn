import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import  { Account } from "../../../models/account";

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts = [];

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.accounts = this.accountService.getAccounts();
  }

  onDelete(account:Account){
    this.accountService.deleteAccount(account.id);
  }
}