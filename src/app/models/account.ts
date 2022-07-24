import { Transaction } from './transaction';
import { ColumnSeparator, RowSeparator } from './enums';
import { Bankn } from './bankn';
//import Dinero, { Currency } from 'dinero.js';
import { Dinero, dinero } from 'dinero.js';

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
  referenceAmount: Dinero; //currency; inside referenceAmount
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
    referenceAmount: Dinero,
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
      referenceAmount: this.referenceAmount.toObject(),
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
    var account = new Account(
      json.id,
      json.name,
      json.description,
      dinero({
        amount: json.referenceAmount.amount,
        currency: json.referenceAmount.currency,
      }), //Dinero(json.referenceAmount),
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

  private static getPrecision(currency: string): number {
    //TODO guardar este valor em memória
    //var reference = Dinero({ currency: <Dinero.Currency>currency });
    var reference = dinero({ currency: <Dinero.Currency>currency });
    return reference.getPrecision();
  }

  public static toDinero(
    currency: string,
    amount: number
  ): any /*Dinero.Dinero*/ {
    /*return Dinero({
      amount: amount * Math.pow(10, Account.getPrecision(currency)),
      currency: Account.getCurrencyObject(currency),
    });*/
    return dinero({
      amount: amount * Math.pow(10, Account.getPrecision(currency)),
      currency: Account.getCurrencyObject(currency),
    });
  }

  public static toDineroFromAccount(amount: number, account: Account): Dinero {
    //return this.toDinero(Account.getCurrency(account), amount);
    return this.toDinero(Account.getCurrency(account), amount);
  }

  public static getCurrency(account: Account): string {
    return account.referenceAmount.getCurrency();
  }

  public static getCurrencyObject(currency: string): any /*Currency*/ {
    //return <Dinero.Currency>currency;
    return <Dinero.Currency>currency;
  }
}
