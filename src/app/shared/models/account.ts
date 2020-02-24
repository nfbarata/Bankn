import { Dinero } from 'dinero.js';

export class Account {

  id:string;//uuid
  name : string;
  //type
  //arquived
  transactions = [];
  referenceValue:Dinero;
  referenceDate:Date;
  description:string;
  currency;
  //exclude orçamentos

  constructor(uuid:string) {
    this.id = uuid;
  }

  public getTransactions(){
    return this.transactions;
  }
}


