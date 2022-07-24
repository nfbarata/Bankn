import { Account } from './account';
import { TransactionType } from './enums';
import { Entity } from './entity';
import { Category } from './category';
import { Bankn } from './bankn';
//import Dinero, { Currency } from 'dinero.js';

export class Transaction {
  private _id: string; //uuid
  public type: TransactionType;
  public date: Date;
  public amount: any; //Dinero.Dinero;

  public entity?: Entity;
  public category?: Category;
  public receiptReference?: string;
  public description?: string;

  //
  //Volatile:
  //
  public hide: boolean = false;
  public account!: Account;
  public balanceBefore: any /*Dinero.Dinero*/ | null = null;
  public balanceAfter: any /*Dinero.Dinero*/ | null = null;

  constructor(
    uuid: string,
    amount: any, //Dinero.Dinero,
    type: TransactionType,
    date: Date = new Date(),
    entity?: Entity,
    category?: Category,
    receiptReference?: string,
    description?: string,
    account: Account | null = null
  ) {
    this._id = uuid;
    this.amount = amount;
    this.type = type;
    this.date = date;
    this.entity = entity;
    this.category = category;
    this.receiptReference = receiptReference;
    this.description = description;
    if (account != null) this.account = account;
  }

  public get id(): string {
    return this._id;
  }

  public toJson() {
    return {
      id: this.id,
      amount: this.amount.toUnit(), //Dinero to value, compacted result
      type: this.type,
      date: this.date.toISOString().substring(0, 10),
      entityName: this.entity?.name,
      categoryName: this.category?.name,
      receiptReference: this.receiptReference,
      description: this.description,
    };
  }

  public static fromJson(
    transaction: any,
    account: Account,
    bankn: Bankn
  ): Transaction {
    return new Transaction(
      transaction.id,
      Account.toDinero(Account.getCurrency(account), transaction.amount), //value to Dinero, speed
      transaction.type,
      new Date(transaction.date),
      bankn.getEntity(transaction.entityName)!,
      bankn.getCategory(transaction.categoryName)!,
      transaction.receiptReference,
      transaction.description,
      account
    );
  }
}
