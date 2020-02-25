import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import  { Account } from "../../../models/account";

@Component({
  selector: 'account-select-card',
  templateUrl: './account-select-card.component.html',
  styleUrls: ['./account-select-card.component.css']
})
export class AccountSelectCardComponent implements OnInit {

  items: any[] = [];

  constructor(
     private accountService: AccountService
  ) { }

  ngOnInit() {
    this.refreshAccounts();
    this.accountService.accountsChange.subscribe(()=>{
      this.refreshAccounts();
    });
    this.accountService.accountSelectionChange.subscribe(()=>{
      this.refreshAccounts();
    });
  }

  refreshAccounts(){
    var accounts:Account[] = this.accountService.getAccounts()
    ;
    while (this.items.length > 0) {
      this.items.pop();
    }
    accounts.forEach(account => {
      this.items.push({
        id : "asc"+account.id,
        account : account,
        name : account.name,
        selected : account.selected
      });
    });
  }

  onAccountsSelected(){
    this.items.forEach(item => {
      if(item.selected){
        this.accountService.selectAccount(item.account);
      }else{
        this.accountService.unselectAccount(item.account);
      }
    });
  }

  onCheck(item, e){
    item.selected= e.target.checked;
  }
}