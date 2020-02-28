import  { Account } from "./account";

export class Bankn {
  name:String;
  accounts : Account[] = [];
  referenceCountry:String;

  constructor(
    name:String,
    accounts : Account[], 
    referenceCountry:String) {
    this.name = name;
    this.accounts = accounts;
    this.referenceCountry = referenceCountry;
  }
}