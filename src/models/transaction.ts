import  { Account } from "./account";

export class Transaction {
  
  private id:String;//uuid
  
  private value:Dinero;
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

  getValue():Dinero{
    return this.value;
  }

  getDate():Date{
    return this.date;
  }
}

