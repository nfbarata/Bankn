import { Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Bankn } from "../models/bankn";
import { Account } from "../models/account";

@Injectable({
  providedIn:'root'
})
export class BanknService {
  @Output() banknChange:  EventEmitter<any> = new EventEmitter();
  @Output() accountsChange: EventEmitter<any> = new EventEmitter();
  @Output() accountSelectionChange: EventEmitter<any> = new EventEmitter();

  private bankn : Bankn = environment.bankn;

  constructor() { }

  import(bankn:Bankn){
    //clear (necessary? quickly...)
    while (this.bankn.accounts.length > 0) {
      while(this.bankn.accounts[this.bankn.accounts.length()-1].transactions.length>0){
          this.bankn.accounts[this.bankn.accounts.length()-1].transactions.pop();    
      }
      this.bankn.accounts.pop();
    }
    //fill
    this.bankn = bankn;

    this.banknChange.emit();
    this.accountsChange.emit();
    this.accountSelectionChange.emit();
  }

  addAccount(account:Account):void{
    this.bankn.accounts.push(account);
    this.accountsChange.emit();
  }

  deleteAccountId(accountId:String){
    this.bankn.accounts = this.bankn.accounts.filter(function(account){
       return account.id != accountId;
    });
    this.accountsChange.emit();
  }

  getAccounts() : Account[]{
    return this.bankn.accounts;
  }
}