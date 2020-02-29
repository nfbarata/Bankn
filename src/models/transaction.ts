import  { Account } from "./account";

export class Transaction {
  
  private id:String;//uuid
  
  private amount:Dinero;
  private date:Date;

  //type;  despesa/receita/transfer
  //account:Account;
  private toAccount : String;

  private entity:String;//fromAccount
  private category:String;

  private description:String;

  //receipt;

  constructor(
    uuid:String,
    amount:Dinero,
    date:Date,
    toAccount:String,
    entity:String,
    category:String,
    description:String
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

