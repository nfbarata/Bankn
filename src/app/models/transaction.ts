import { Account } from './account';
import Dinero from 'dinero.js';
import { TransactionType } from './enums';

export class Transaction {
  private _id: string; //uuid
  public type: TransactionType;
  public date: Date;
  public amount: Dinero.Dinero;

  public entityName?: string;
  public categoryName?: string;
  public receiptReference?: string;
  public description?: string;

  //
  //Volatile:
  //
  public hide: boolean = false; 
  public account!: Account; 
  public balanceBefore: Dinero.Dinero | null = null; 
  public balanceAfter: Dinero.Dinero | null = null;

  constructor(
    uuid: string,
    amount: Dinero.Dinero,
    type: TransactionType,
    date: Date = new Date(),
    entityName?: string,
    categoryName?: string,
    receiptReference?: string,
    description?: string,
    account: Account | null = null
  ) {
    this._id = uuid;
    this.amount = amount;
    this.type = type;
    this.date = date;
    this.entityName = entityName;
    this.categoryName = categoryName;
    this.receiptReference = receiptReference;
    this.description = description;
    if(account != null)
      this.account = account;
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
      entityName: this.entityName,
      categoryName: this.categoryName,
      receiptReference: this.receiptReference,
      description: this.description,
    };
  }

  public static fromJson(transaction: any, account: Account): Transaction {
    return new Transaction(
      transaction.id,
      Account.toDinero(Account.getCurrency(account), transaction.amount), //value to Dinero, speed
      transaction.type,
      new Date(transaction.date),
      transaction.entityName,
      transaction.categoryName,
      transaction.receiptReference,
      transaction.description,
      account
    );
  }
}
