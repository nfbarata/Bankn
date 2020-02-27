import { Component, OnInit } from '@angular/core';
import { BanknService } from '../../../services/bankn.service';
import { AccountService } from '../../../services/account.service';
import { Account } from "../../../models/account";

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts = [];

  constructor(
    private banknService: BanknService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.refreshAccounts();
    this.banknService.accountsChange.subscribe(()=>{
      this.refreshAccounts();
    });
  }

  refreshAccounts(){
    this.accounts = this.accountService.getAccounts();  
  }

  onDelete(account:Account){
    this.accountService.deleteAccount(account);
  }
}