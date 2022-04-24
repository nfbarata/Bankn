import { Output, LOCALE_ID, Inject } from '@angular/core';
import { Injectable, Injector } from '@angular/core';

import { v4 as uuid } from 'uuid';

import { EventsService } from './events.service';
import { FileService } from './file.service';
import { ACCOUNT_SERVICE } from '../app.module';

import { Bankn } from '../models/bankn';
import { Account } from '../models/account';
//@ts-ignore
import { countries } from 'country-data-list';

@Injectable({ providedIn: 'root' })
export class BanknService {
  
  private bankn: Bankn | null = null;
  private countries: any;
  private defaultCountryCode: string = 'null';

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private injector: Injector,
    private eventsService: EventsService,
    private fileService: FileService
  ) {
    if (locale != null && locale.split('-').length > 0) {
      this.defaultCountryCode = locale.split('-')[0].toUpperCase();

      /*var country;
      for (let i = 0; i < this.currencies.length; i++) {
        if (this.currencies[i].alpha2 == this.defaultCountryCode) 
          country = this.currencies[i];
      }
      var defaultCurrency = country.currencies[0];*/
    }
    console.log('default countryCode: ' + this.defaultCountryCode);
    this.countries = countries.all.filter(function (country: any) {
      return country.currencies.length > 0;
    });
  }

  initialized(): boolean {
    return this.bankn != null;
  }

  setBankn(bankn: Bankn) {
    this.clear();
    this.bankn = bankn;
    this.eventsService.emitBanknChange();
    this.eventsService.emitAccountsChange();
    this.eventsService.emitAccountSelectionChange();
  }

  static createBankn(name: string, referenceCountry: string): Bankn {
    return new Bankn(uuid(), name, [], referenceCountry);
  }

  getBankn(): Bankn | null {
    return this.bankn;
  }

  loadFromFile(): void {
    this.fileService.parseJsonFile((bankn: Bankn) => {
      this.clear();
      this.setBankn(Bankn.fromJson(bankn));
      this.eventsService.emitBanknChange();
      this.eventsService.emitAccountsChange();
      this.eventsService.emitAccountSelectionChange();
    });
  }

  saveToFile(): void {
    if(this.bankn!=null)
      this.fileService.downloadJsonFile(this.bankn.toJson());
    else
      console.error("No bankn");
  }

  update(name: string, referenceCountry: string): void {
    if(this.bankn!=null){
      this.bankn.name = name;
      this.bankn.referenceCountry = referenceCountry;
      this.eventsService.emitBanknChange();
    }
  }

  private clear(): void {
    if (this.bankn != null) {
      //(necessary? quickly...)
      if (this.bankn.accounts != null) {
        while (this.bankn.accounts.length > 0) {
          while (this.bankn.accounts[0].transactions.length > 0) {
            this.bankn.accounts[0].transactions.pop();
          }
          this.bankn.accounts.pop();
        }
      }
    }
  }

  addAccount(account: Account): void {
    if(this.bankn!=null){
      this.bankn.accounts.push(account);
      this.eventsService.accountsChange.emit();
    }
  }

  deleteAccountId(accountId: string) {
    if(this.bankn!=null){
      this.bankn.accounts = this.bankn.accounts.filter(function (account) {
        return account.id != accountId;
      });
      this.eventsService.accountsChange.emit();
    }
  }

  getAccounts(): Account[] {
    if (this.bankn == null) return [];
    return this.bankn.accounts;
  }

  getCountries() {
    return this.countries;
  }

  getDefaultCountryCode(): string {
    return this.defaultCountryCode;
  }

  getCurrencyOfCountry(countryCode: string): string {
    var country = null;
    for (let i = 0; i < this.countries.length && country == null; i++) {
      if (this.countries[i].alpha2 == countryCode) country = this.countries[i];
    }
    return country.currencies[0];
  }

  getReferenceCountry(): string | null {
    if(this.bankn!=null){
      return this.bankn.referenceCountry;
    }
    return null;
  }
}
