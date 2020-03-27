import  { Transaction } from "./transaction";
import Dinero from 'dinero.js';

export class Account {

  private id:string;//uuid
  name : string;
  //type
  //arquived
  transactions : Transaction[] = [];
  referenceAmount:Dinero.Dinero;
  referenceCountry:string;//to select in edit
  referenceDate:Date;
  description:string = "";
  //currency; inside referenceAmount
  //exclude orçamentos

  lastColumnSeparator:string;
  lastLineSeparator:string;

  selected:boolean = false;

  constructor(
    id:string,
    name:string,
    description:string, 
    referenceAmount:Dinero.Dinero, 
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

  getId():string{
    return this.id;
  }
}


