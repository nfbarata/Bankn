import  { Account } from "./account";

export class Bankn {
  id:string;
  name:string;
  accounts : Account[] = [];
  referenceCountry:string;

  constructor(
    id:string,
    name:string,
    accounts : Account[], 
    referenceCountry:string) {
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