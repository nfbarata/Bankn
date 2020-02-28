import { Output, LOCALE_ID, Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Bankn } from "../models/bankn";
import { Account } from "../models/account";
import { EventsService} from "./events.service";
import { FileService} from "./file.service";

const countries        = require('country-data-list').countries,
      currencies       = require('country-data-list').currencies,
      regions          = require('country-data-list').regions,
      languages        = require('country-data-list').languages,
      callingCountries = require('country-data-list').callingCountries;

@Injectable({
  providedIn:'root'
})
export class BanknService {

  private bankn : Bankn=null;
  countries;
  defaultCountryCode:String='null';

  constructor(
    private eventsService:EventsService,
    private fileService:FileService,
    @Inject(LOCALE_ID) public locale: string
  ) {  
    if(locale!=null && locale.split("-").length>0){
      this.defaultCountryCode = locale.split("-")[0].toUpperCase();

      /*var country;
      for (let i = 0; i < this.currencies.length; i++) {
        if (this.currencies[i].alpha2 == this.defaultCountryCode) 
          country = this.currencies[i];
      }
      var defaultCurrency = country.currencies[0];*/
    }
    console.log("default countryCode: "+this.defaultCountryCode);
    this.countries = countries.all.filter(function(country){
          return country.currencies.length>0;
        });
    
  }

  getCountries(){
    return this.countries;
  }

  getDefaultCountryCode(){
    return this.defaultCountryCode;
  }

  getReferenceCountry(){
    return this.bankn.referenceCountry;
  }

  saveToFile():void{
    this.fileService.downloadJsonFile(this.bankn);
  }

  loadFromFile(): void{
    this.fileService.parseJsonFile((bankn:Bankn)=>{
      this.loadFromJson(bankn);    
    });
  }

  private clear():void{
    if(this.bankn!=null){
      //(necessary? quickly...)
      while(this.bankn.accounts.length > 0) {
        while(this.bankn.accounts[this.bankn.accounts.length()-1].transactions.length>0){
            this.bankn.accounts[this.bankn.accounts.length()-1].transactions.pop();    
        }
        this.bankn.accounts.pop();
      }
    }
  }

  loadFromJson(bankn:Bankn):void{
    this.clear();
    this.bankn = bankn;
    this.eventsService.banknChange.emit();
    this.eventsService.accountsChange.emit();
    this.eventsService.accountSelectionChange.emit();
  }

  addAccount(account:Account):void{
    this.bankn.accounts.push(account);
    this.eventsService.accountsChange.emit();
  }

  deleteAccountId(accountId:String){
    this.bankn.accounts = this.bankn.accounts.filter(function(account){
       return account.id != accountId;
    });
    this.eventsService.accountsChange.emit();
  }

  getAccounts() : Account[]{
    if(this.bankn==null)
      return [];
    return this.bankn.accounts;
  }
}