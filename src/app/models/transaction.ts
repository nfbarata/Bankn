import { Account } from './account';
/import * as Dinero from 'dinero.js';
import Dinero from 'dinero.js'
// import { AccountService } from '../services/account.service';

export enum TransactionType {
  CREDIT = 'c',
  DEBIT = 'd',
  TRANSFER = 't'
};

export enum ImportColumnType {
  IGNORE = 'i', //'Ignore',
  DESCRIPTION = 'des',// 'Description',
  DATE_DMY = 'dtdmy',// 'Date (Day Month Year)',
  DATE_MDY = 'dtmdy',// 'Date (Month Day Year)',
  DATE_YMD = 'dtymd', // 'Date (Year Month Day)',
  AMOUNT = 'a',// 'Amount',
  CREDIT = 'c',// 'Credit',
  DEBIT = 'd',// 'Debit',
  SIGN = 's',// 'Sign',
};

export class Transaction {

  private _id: string; //uuid
  public type: TransactionType;
  public date: Date;
  public amount: Dinero.Dinero;

  public description: string | null;
  public category: string | null;
  public entity: string | null; //toAccount
  
  //receipt;
  public hide: boolean = false;//volatile
  public account: Account; //volatile
  public balanceBefore: Dinero.Dinero | null = null; //volatile
  public balanceAfter: Dinero.Dinero | null = null; //volatile

  constructor(
    uuid: string,
    amount: Dinero.Dinero,
    date: Date,
    entity: string | null,
    category: string | null,
    description: string | null,
    type: TransactionType,
    account: Account
  ) {
    this._id = uuid;
    this.amount = amount;
    this.date = date;
    this.entity = entity;
    this.category = category;
    this.description = description;
    this.type = type;

    this.account = account;
  }

  public get id(): string{
    return this._id;
  }

  public toJson(){
    return {
      id: this.id,
      amount: this.amount.toUnit(), //Dinero to value, compacted result
      date: this.date.toISOString().substring(0, 10),
      entity: this.entity,
      category: this.category,
      description: this.description,
      type: this.type
    }
  }

  public static fromJson(transaction: any, account: Account): Transaction{
    return new Transaction(
      transaction.id,
      Account.toDinero(Account.getCurrency(account), transaction.amount), //value to Dinero, speed
      new Date(transaction.date),
      typeof transaction.entity === "undefined" ? null : transaction.entity,
      typeof transaction.category === "undefined"
        ? null
        : transaction.category,
      transaction.description,
      transaction.type,
      account
    )
  }
}
