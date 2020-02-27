import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { FileService } from '../../../services/file.service';
import  { Account } from "../../../models/account";

@Component({
  selector: 'main-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  accounts = [];
  constructor(
    private accountService: AccountService,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.refreshAccounts();
    this.accountService.accountsChange.subscribe(()=>{
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
    this.fileService.downloadJson(this.accountService.getAccounts());
  }
  //onexport account to csv
}