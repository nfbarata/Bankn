import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import  { Accounts } from "../../shared/models/account";

@Component({
  selector: 'account-select',
  templateUrl: './account-select.component.html',
  styleUrls: ['./account-select.component.css']
})
export class AccountSelectComponent implements OnInit {

  constructor(
     private accountService: AccountService
  ) { }

  ngOnInit() {
  }

  onAccountsSelected(){
    
    this.accountService.toggleAccount(account);
  }
}