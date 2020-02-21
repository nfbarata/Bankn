import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //TODO para q?
})
export class AccountService {
  //accounts[];

  constructor() { }

  ceateAccount(account){
   // this.accounts.push(account);
  }

  deleteAccount(account){
    //this.accounts.
  }

  getAccounts(){
  //  return this.accounts;
  }
}