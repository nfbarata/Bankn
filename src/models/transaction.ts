import  { Account } from "./account";

export const TransactionType = {
    CREDIT: {
      id:'c',
      description:'Credit'//i18n
    },
    DEBIT: {
      id:'d',
      description:'Debit'//i18n
    },
    TRANSFER: {
      id:'t',
      description:'Transfer'//i18n
    },
}

export function getTransactionType(id:String){
  for (let [key, value] of Object.entries(object1)) {
    if(key==id)
      return value;
  }
}

export class Transaction {
  
  private id:String;//uuid
  
  private amount:Dinero;
  private date:Date;

  private typeId:String;
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
    description:String,
    type:String
  ) {
    this.id = uuid;
    this.amount = amount;
    this.date = date;
    this.toAccount = toAccount;
    this.entity = entity;
    this.category = category;
    this.description = description;
    this.type = type;
  }

  getAmount():Dinero{
    return this.amount;
  }

  getDate():Date{
    return this.date;
  }
}

