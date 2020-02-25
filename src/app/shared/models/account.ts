import { Dinero } from 'dinero.js';
import  { Transaction } from "./transaction";

export class Account {

  id:string;//uuid
  name : string;
  //type
  //arquived
  transactions : Transaction[] = [];
  referenceValue:Dinero;
  referenceDate:Date;
  description:string;
  currency;
  //exclude orçamentos

  selectd:Boolean;

  constructor(uuid:string) {
    this.id = uuid;
  }

  getTransactions() : Transaction[] {
    return this.transactions;
  };
}


