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
    /*this.accountService.accountsChange.subscribe(()=>{
      this.refreshAccounts();
    });*/  
  }

  refreshAccounts(){
    var accounts:[Account] = this.accountService.getAccounts()
    ;
    while (this.items.length > 0) {
      this.items.pop();
    }
    accounts.forEach(account => {
      this.items.push({
        id : "asc"+account.id,
        account_id : account.id,
        name : account.name,
        selected : account.selected
      });
    });
  }

  onAccountsSelected(){
    this.items.forEach(item => {
      console.log(item);
      if(item.selected){
        this.accountService.selectAccountId(item.account_id);
      }else{
        this.accountService.unselectAccountId(item.account_id);
      }
    });
  }
}