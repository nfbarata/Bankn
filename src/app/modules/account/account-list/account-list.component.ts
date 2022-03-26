import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { AccountService } from '../../../services/account.service';
import { Account } from "../../../models/account";

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];

  constructor(
    private eventsService: EventsService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.refreshAccounts();
    this.eventsService.accountsChange.subscribe(()=>{
      this.refreshAccounts();
    });
  }

  refreshAccounts(){
    this.accounts = this.accountService.getAccounts();  
  }
}