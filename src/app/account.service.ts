import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts = [];

  constructor() { }

  createAccount(account){
    this.accounts.push(account);
  }

  deleteAccount(account){
    //this.accounts.
  }

  getAccounts(){
    return this.accounts;
  }

  getAccount(id){
    return this.accounts[+id];
  }
}