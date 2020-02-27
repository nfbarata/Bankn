import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { BanknService } from '../../../services/bankn.service';
import { FileService } from '../../../services/file.service';
import { EventsService } from '../../../services/events.service';
import { Account } from "../../../models/account";

@Component({
  selector: 'main-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  accounts = [];
  constructor(
    private banknService: BanknService,
    private accountService: AccountService,
    private eventsService: EventsService
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

  onAccountClick(account:Account){
    this.accountService.toggleAccount(account);
  }

  onSaveAs(){
    this.banknService.saveToFile();
  }
  
  //onexport account to csv
}