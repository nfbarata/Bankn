import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Dinero } from 'dinero.js';
import { Account } from "../models/account";
import { BanknService } from '../services/bankn.service';
import { EventsService } from '../services/events.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private banknService : BanknService,
    private eventsService : EventsService
  ) { }

  createAccount(
    name:String, 
    description:String, 
    referenceValue:Dinero, 
    referenceDate:Date,
    referenceCountry:String){
    var account : Account = new Account(this.createId());
    account.name = name;
    account.description = description;
    account.referenceValue = referenceValue;
    account.referenceDate = referenceDate;
    account.referenceCountry = referenceCountry;
    //selected
    this.banknService.addAccount(account);
  }

  private createId(){
    //return uuidv4();
    var accounts:Account[] = this.getAccounts();
    for (let i = 0; i < accounts.length; i++) {
      if(accounts[i].id!=i)
        return i;
    }
  }

  updateAccount(
    id:String,
    name:String, 
    description:String, 
    referenceValue:Dinero, 
    referenceDate:Date,
    referenceCountry:String){

    var account : Account = this.getAccount(id);
    account.name = name;
    account.description = description;
    account.referenceValue = referenceValue;
    account.referenceDate = referenceDate;
    account.referenceCountry = referenceCountry;
    this.eventsService.accountsChange.emit();
  }

  deleteAccountId(accountId:String){
    this.banknService.deleteAccountId(accountId);
  }

  deleteAccount(account:Account){
    this.deleteAccountId(account.id);
  }

  getAccounts() : Account[]{
    return this.banknService.getAccounts();
  }

  getAccount(accountId:String) : Account{
    var accounts:Account[] = this.getAccounts();
    returnAccount : Account;
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id == accountId) 
        return accounts[i];
    }
    console.error("account not found:"+accountId);
  }
  
  getSelectedAccounts() : Account[]{
    var accounts : Account[] = [];
    this.banknService.getAccounts().forEach(account => {
      if(account.selected)
        accounts.push(account);
    });
    return accounts;
  }

  toggleAccountId(accountId:String){
    var account : Account = this.getAccount(accountId);
    this.toggleAccount(account);
  }

  toggleAccount(account : Account){
    if(account.selected)
      this.unselectAccount(account);
    else
      this.selectAccount(account);
  }

  selectAccountId(accountId){
    var account : Account = this.getAccount(accountId);
    this.selectAccount(account);
  }

  selectAccount(account : Account){
    if(!account.selected){
      account.selected = true;
      this.eventsService.accountSelectionChange.emit();
    }
  }

  unselectAccountId(accountId){
    var account : Account = this.getAccount(accountId);
    this.unselectAccount(account);
  }

  unselectAccount(account : Account){
    if(account.selected){
      account.selected = false;
      this.eventsService.accountSelectionChange.emit();
    }
  }
}