import { Dinero } from 'dinero.js';
import  { Account } from "./account";

export class Transaction {
  
  private id:String;//uuid
  
  private amount;
  private date:Date;

  //type;  despesa/receita/transfer
  //account:Account;
  private toAccount : Account;

  private entity:string;//fromAccount
  private category:string;

  private description:string;

  //receipt;

  constructor(uuid:string) {
    this.id = uuid;
  }

  getAmount(){
    return this.amount;
  }

  getDate():Date{
    return this.date;
  }
}

