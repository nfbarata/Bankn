import { Dinero } from 'dinero.js';
import  { Transaction } from "./transaction";

export class Account {

  id:String;//uuid
  name : String;
  //type
  //arquived
  transactions : Transaction[] = [];
  referenceValue:Dinero;
  referenceCountry:String;
  referenceDate:Date;
  description:String = "";
  //currency; inside referenceValue
  //exclude orçamentos

  selected:Boolean = false;

  constructor(uuid:string) {
    this.id = uuid;
  }

  getTransactions() : Transaction[] {
    return this.transactions;
  };
}


