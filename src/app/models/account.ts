import { Transaction } from './transaction';
import { ColumnSeparator, RowSeparator } from './enums';
import { Bankn } from './bankn';
import { Dinero } from 'dinero.js';
import { MathService } from '../services/math.service';

export class Account {
  private _id: string; //uuid
  name: string;
  description: string;

  transactions: Transaction[];

  //TODO type
  //TOOD arquived
  //TODO exclude orçamentos
  selected: boolean;

  //
  // From where balance is calculated
  //
  referenceAmount: Dinero<number>; //currency; inside referenceAmount
  referenceCountry: string; //to select in edit
  referenceDate: Date;

  columnSeparator: ColumnSeparator;
  customColumnSeparator: string | null;
  rowSeparator: RowSeparator;
  customRowSeparator: string | null;

  constructor(
    id: string,
    name: string,
    description: string = '',
    referenceAmount: Dinero<number>,
    referenceDate: Date,
    referenceCountry: string,
    transactions: Transaction[] = [],
    selected: boolean = false,
    columnSeparator: ColumnSeparator = ColumnSeparator.TAB,
    customColumnSeparator: string | null = null,
    rowSeparator: RowSeparator = RowSeparator.NEWLINE,
    customRowSeparator: string | null = null
  ) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.referenceAmount = referenceAmount;
    this.referenceDate = referenceDate;
    this.referenceCountry = referenceCountry;
    if (transactions == null) this.transactions = [];
    else this.transactions = transactions;
    this.selected = selected;
    this.columnSeparator = columnSeparator;
    this.rowSeparator = rowSeparator;
    this.customColumnSeparator = customColumnSeparator;
    this.customRowSeparator = customRowSeparator;
  }

  public get id(): string {
    return this._id;
  }

  public toJson(): any {
    var transactionsJson: any[] = [];
    this.transactions.forEach((transaction) => {
      transactionsJson.push(transaction.toJson());
    });
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      referenceAmount: this.referenceAmount.toJSON().amount,
      referenceDate: this.referenceDate.toISOString().substring(0, 10),
      referenceCountry: this.referenceCountry,
      transactions: transactionsJson,
      selected: this.selected,
      columnSeparator: this.columnSeparator,
      customColumnSeparator: this.customColumnSeparator,
      rowSeparator: this.columnSeparator,
      customRowSeparator: this.customRowSeparator,
    };
  }

  public static fromJson(json: any, bankn: Bankn): Account {
    console.log(json);
    var account = new Account(
      json.id,
      json.name,
      json.description,
      MathService.fromInputValue(
        json.referenceAmount,
        json.referenceCountry
      ),
      new Date(json.referenceDate),
      json.referenceCountry,
      [],
      json.selected,
      json.columnSeparator,
      json.customColumnSeparator,
      json.rowSeparator,
      json.customRowSeparator
    );
    if (json.transactions)
      json.transactions.forEach((transaction: any) => {
        account.transactions.push(
          Transaction.fromJson(transaction, account, bankn)
        );
      });
    return account;
  }
}
