import  { Account } from "./account";

export class Transaction {
  
  private id:String;//uuid
  
  private amount;
  private date:Date;

  //type;  despesa/receita/transfer
  //account:Account;
  private toAccount : string;

  private entity:string;//fromAccount
  private category:string;

  private description:string;

  //receipt;

  constructor(
    uuid:string,
    amount,
    date:Date,
    toAccount:string,
    entity:string,
    category:string,
    description:string
  ) {
    this.id = uuid;
    this.amount = amount;
    this.date = date;
    this.toAccount = toAccount;
    this.entity = entity;
    this.category = category;
    this.description = description;
  }

  getAmount():Dinero{
    return this.amount;
  }

  getDate():Date{
    return this.date;
  }
}

