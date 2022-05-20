import { Transaction } from './transaction';
import { Dinero, dinero } from 'dinero.js';

export class Account {
  private _id: string; //uuid
  name: string;
  //type
  //arquived
  transactions: Transaction[] = [];
  referenceAmount: Dinero.Dinero;
  referenceCountry: string; //to select in edit
  referenceDate: Date;
  description: string = '';
  //currency; inside referenceAmount
  //exclude orçamentos

  lastColumnSeparator: string | null = null;
  lastLineSeparator: string | null = null;

  selected: boolean = false;

  constructor(
    id: string,
    name: string,
    description: string,
    referenceAmount: Dinero.Dinero,
    referenceDate: Date,
    referenceCountry: string,
    transactions: Transaction[] = [],
    selected: boolean = false
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
    };
  }

  public static fromJson(json: any): Account {
    var account = new Account(
      json.id,
      json.name,
      json.description,
      dinero(json.referenceAmount),
      new Date(json.referenceDate),
      json.referenceCountry,
      [],
      json.selected
    );
    if (json.transactions)
      json.transactions.forEach((transaction: any) => {
        account.transactions.push(Transaction.fromJson(transaction, account));
      });
    return account;
  }

  private static getPrecision(currency: string): number {
    //TODO guardar este valor em memória
    var reference = dinero({ currency: <Dinero.Currency>currency });
    return reference.getPrecision();
  }

  public static toDinero(currency: string, amount: number): Dinero.Dinero {
    return dinero({
      amount: amount * Math.pow(10, Account.getPrecision(currency)),
      currency: <Dinero.Currency>currency,
    });
  }

  public static toDineroFromAccount(
    amount: number,
    account: Account
  ): Dinero.Dinero {
    return this.toDinero(Account.getCurrency(account), amount);
  }

  public static getCurrency(account: Account): string {
    return account.referenceAmount.getCurrency();
  }
}
