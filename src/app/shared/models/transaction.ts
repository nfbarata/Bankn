import { Dinero } from 'dinero.js';

export class Transaction {
  
  id:String;//uuid
  
  value:Dinero;
  date:Date;

  //type;  despesa/receita/transfer
  //account:Account;
  toAccount : Account;

  entity:string;//fromAccount
  category:string;

  description:string;

  //receipt;

  constructor(uuid:string) {
    this.id = uuid;
  }

  public getValue(){
    return this.value;
  }
}

