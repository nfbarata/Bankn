import { Dinero } from 'dinero.js';
import  { Transaction } from "./transaction";

export class Account {

  id:String;//uuid
  name : String;
  //type
  //arquived
  transactions : Transaction[] = [];
  referenceAmount:Dinero;
  referenceCountry:String;//to select in edit
  referenceDate:Date;
  description:String = "";
  //currency; inside referenceAmount
  //exclude orçamentos

  selected:Boolean = false;

  constructor(
    id:String,
    name:String,
    description:String, 
    referenceAmount:Dinero, 
    referenceDate:Date,
    referenceCountry:String,
    transactions:Transaction[],
    selected:Boolean
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.referenceAmount = referenceAmount;
    this.referenceDate = referenceDate;
    this.referenceCountry = referenceCountry;
    if(transactions==null)
      this.transactions = [];
    else
      this.transactions = transactions;
    this.selected=selected;
  }

  getTransactions() : Transaction[] {
    return this.transactions;
  };
}


