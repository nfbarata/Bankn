import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { FileService } from '../../../services/file.service';
import  { Account } from "../../../models/account";

@Component({
  selector: 'bankn-menu',
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
    this.accounts = this.accountService.getAccounts();  
  }

  onAccountClick(account:Account){
    this.accountService.toggleAccount(account);
  }

  onOpen(){
    this.fileService.fileToUpload
  }

  onSaveAs(){
    this.fileService.downloadFile(this.accountService.getAccounts());
  }
  //onexport account to csv
}