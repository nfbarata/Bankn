import { LOCALE_ID, Inject } from '@angular/core';
import { Injectable } from '@angular/core';

import { EventsService } from './events.service';
import { FileService } from './file.service';

import { Bankn } from '../models/bankn';
import { Account } from '../models/account';
//@ts-ignore
import { countries } from 'country-data-list';

import { UUID } from 'angular2-uuid';
import { Entity } from '../models/entity';
import { Category } from '../models/category';
import { Dinero, dinero, Currency, toDecimal } from 'dinero.js';
import { EUR } from '@dinero.js/currencies';
import { CurrencyPipe } from '@angular/common';
import { faEur } from '@fortawesome/free-solid-svg-icons';

@Injectable({ providedIn: 'root' })
export class BanknService {
  private bankn: Bankn | null = null;
  private countries: any;
  private defaultCountryCode: string = 'null';

  constructor(
    @Inject(LOCALE_ID) public locale: string,
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
    return new Bankn(UUID.UUID(), name, [], referenceCountry);
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
    if (this.bankn != null)
      this.fileService.downloadJsonFile(this.bankn.toJson());
    else console.error('No bankn');
  }

  update(name: string, referenceCountry: string): void {
    if (this.bankn != null) {
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
    if (this.bankn != null) {
      this.bankn.accounts.push(account);
      this.eventsService.accountsChange.emit();
    }
  }

  deleteAccountId(accountId: string) {
    if (this.bankn != null) {
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

  getReferenceCountry(): string {
    if (this.bankn != null) {
      return this.bankn.referenceCountry;
    }
    return this.getDefaultCountryCode();
  }

  getReferenceCurrency(): string {
    var country = this.getReferenceCountry();
    return this.getCurrencyOfCountry(country);
  }

  toCurrency(currencyCode?: string): Currency<number> {
    if(currencyCode == undefined)
      currencyCode = this.getReferenceCurrency();
    return BanknService.toCurrency(currencyCode);
  }

  static toCurrency(currencyCode: string): Currency<number> {
    //TODO search all currencies by code
    return EUR;
    /*return {
      code: currencyCode,
      base: 10,
      exponent: 2
    };*/
  }

  toDinero(value: number, currency?:Currency<number> ): Dinero<number>{
    if(currency == undefined)
      currency = this.toCurrency();
    return BanknService.toDinero(value, currency);
  }

  static toDinero(value: number, currency:Currency<number> ): Dinero<number>{
    //console.log(value);
    return dinero({
      amount: value,
      currency: currency,
      //scale: 2
    });
  }

  toInputValue(value: Dinero<number>): string{
    return toDecimal(value);  
  }

  fromInputValue(number: string, currency: string): Dinero<number>{
    var cur = this.toCurrency(currency);
    var value = Math.round(parseFloat(number) * Math.pow(10, cur.exponent));
    return this.toDinero(value, cur);
  }

  upsertEntity(entityName: string, descriptionPattern: string|null = null, referenceCategory: Category|null=null): Entity{
    var entity = this.bankn!.getEntity(entityName);
    if(entity==null){
      entity = new Entity(entityName);
      this.bankn!.entities.push(entity);//? event
    }
    if(descriptionPattern!=null)
      //TODO more inteligent
      if(!this.isDescriptionFromPatterns(descriptionPattern, entity.descriptionPatterns))
        entity.descriptionPatterns.push(descriptionPattern);
    if(referenceCategory)
      entity.referenceCategory = referenceCategory;
    return entity;
  }

  upsertCategory(categoryFullName: string, descriptionPattern?: string): Category|null{

    //stop condition
    if(categoryFullName.trim().length==0)
      return null;

    var categoryNames = categoryFullName.split(".");

    var parentCategoryName = categoryNames[0];
    var category = this.bankn!.getCategory(parentCategoryName); 
    if(category==null){
      category = new Category(parentCategoryName);
      this.bankn!.categories.push(category);//? event
    }

    //recursive category creation
    if(categoryNames.length>1)
      category.innerCategory = this.upsertCategory(categoryFullName.substring(parentCategoryName.length), descriptionPattern);

    //pattern only in the inner most category
    if(category.innerCategory==null && descriptionPattern!==undefined)
      this.addNewPattern(descriptionPattern, category.descriptionPatterns);

    return category;
  }

  addNewPattern(descriptionPattern: string,  descriptionPatterns: string[]){
    //TODO more inteligent
    if(!this.isDescriptionFromPatterns(descriptionPattern, descriptionPatterns))
      descriptionPatterns.push(descriptionPattern);
  }

  private isDescriptionFromPatterns(descriptionPattern: string,  descriptionPatterns: string[]): boolean{
    for (let d = 0; d < descriptionPatterns.length; d++) {
      if(this.isDescriptionFromPattern(descriptionPattern, descriptionPatterns[d])){
        //TOOD optimize other descriptionPatterns?
        return true;
      }
    }
    return false;
  }

  private isDescriptionFromPattern(description: string,  descriptionPattern: string): boolean{
    //TODO more inteligent
    return description==descriptionPattern;
  }

  getEntityFromDescriptionPattern(descriptionPattern: string, referenceCategory: Category|null): Entity|null{
    //TODO parse category
    for (let e = 0; e < this.bankn!.entities.length; e++) {
      if(this.isDescriptionFromPatterns(descriptionPattern, this.bankn!.entities[e].descriptionPatterns))
        return this.bankn!.entities[e];
    }
    return null;
  }

  getCategoryFromDescriptionPattern(descriptionPattern: string): Category|null{
    //check top most categories
    for (let c = 0; c < this.bankn!.categories.length; c++) {
      var result = this.getCategoryFromDescriptionPatternRecursive(descriptionPattern, this.bankn!.categories[c].innerCategory!);
      if(result!=null)
        return result;
    }
    return null;
  }

  getCategoryFromDescriptionPatternRecursive(descriptionPattern: string, parentCategory: Category): Category|null{
    var result = null;
    //give priority to innerCategories
    if(parentCategory.innerCategory!=null)
      result = this.getCategoryFromDescriptionPatternRecursive(descriptionPattern, parentCategory.innerCategory!);
    if(result!=null)
      return result;
    if(this.isDescriptionFromPatterns(descriptionPattern, parentCategory.descriptionPatterns))
      return parentCategory;
    return null;
  }
}
