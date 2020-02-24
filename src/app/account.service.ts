import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //TODO para q?
})
export class AccountService {
  accounts = [
  {
    id: 1,
    name: 'Phone XL',
    price: 799,
    description: 'A large phone with one of the best screens'
  },
  {
    id: 2,
    name: 'Phone Mini',
    price: 699,
    description: 'A great phone with one of the best cameras'
  },
  {
    id: 3,
    name: 'Phone Standard',
    price: 299,
    description: ''
  }
  ];

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