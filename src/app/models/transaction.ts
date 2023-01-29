import { Account } from './account';
import { TransactionType } from './enums';
import { Entity } from './entity';
import { Category } from './category';
import { Bankn } from './bankn';
import { Dinero } from 'dinero.js';
import { BanknService } from '../services/bankn.service';

export class Transaction {
  private _id: string; //uuid
  public type: TransactionType;
  public date: Date;
  public amount: Dinero<number>;

  public entity?: Entity;
  public category?: Category;
  public receiptReference?: string;
  public description?: string;

  //
  //Volatile:
  //
  public hide: boolean = false;
  public account!: Account;
  public balanceBefore: Dinero<number> | null = null;
  public balanceAfter: Dinero<number> | null = null;

  constructor(
    uuid: string,
    amount: Dinero<number>,
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
      amount: this.amount.toJSON().amount, //Dinero to value, compacted result
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
      BanknService.toDinero(
        parseFloat(transaction.amount),
        account.referenceAmount.toJSON().currency
      ),
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
