import { Dinero } from 'dinero.js';
import  { Transaction } from "./transaction";

export class Account {

  id:string;//uuid
  name : string;
  //type
  //arquived
  transactions : Transaction[] = [];
  referenceAmount:Dinero;
  referenceCountry:string;//to select in edit
  referenceDate:Date;
  description:string = "";
  //currency; inside referenceAmount
  //exclude orçamentos

  lastColumnSeparator:string;
  lastLineSeparator:string;

  selected:Boolean = false;

  constructor(
    id:string,
    name:string,
    description:string, 
    referenceAmount:Dinero, 
    referenceDate:Date,
    referenceCountry:string,
    transactions:Transaction[],
    selected:boolean
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


