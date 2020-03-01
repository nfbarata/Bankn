import  { Account } from "./account";

export class Bankn {
  id:String;
  name:String;
  accounts : Account[] = [];
  referenceCountry:String;

  constructor(
    id:String,
    name:String,
    accounts : Account[], 
    referenceCountry:String) {
    this.id = id;
    this.name = name;
    if(accounts==null){
      this.accounts = [];
    }else{
      this.accounts = accounts;
    }
    this.referenceCountry = referenceCountry;
  }
}