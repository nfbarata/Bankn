import { Injectable } from '@angular/core';

import { UUID } from 'angular2-uuid';

import { EventsService } from './events.service';
import { AccountService } from './account.service';

import { Account } from '../models/account';
import { Transaction } from '../models/transaction';
import { Dinero } from 'dinero.js';
import { TransactionType } from '../models/enums';
import { BanknService } from './bankn.service';
import { Bankn } from '../models/bankn';
import { CategoryService } from './category.service';
import { EntityService } from './entity.service';
import { MathService } from './math.service';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  //
  //Volatile - for use between screens
  //
  importTransactions: any[] = [];
  filterTransactions: any[] = [];
  filterActions: any[] = [];

  constructor(
    private banknService: BanknService,
    private eventsService: EventsService,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private entityService: EntityService
  ) {}

  createTransaction(
    account: Account,
    amount: Dinero<number>,
    date: Date,
    type: TransactionType,
    entityName?: string,
    categoryName?: string,
    receiptReference?: string,
    description?: string
  ) {
    var clearDate = new Date(0); //clear hours/minutes/seconds
    clearDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());

    //create Category if not exist
    var category = null;
    if (categoryName !== undefined && categoryName.trim().length != 0)
      category = this.categoryService.upsertCategory(categoryName);

    //create Entity if not exist
    var entity = null;
    if (entityName !== undefined && entityName.trim().length != 0) {
      entity = this.entityService.upsertEntity(entityName, description, category);
    }

    var transaction = new Transaction(
      UUID.UUID(),
      amount,
      type,
      clearDate,
      entity == null ? undefined : entity,
      category == null ? undefined : category,
      receiptReference,
      description,
      account
    );
    this.accountService.addTransaction(account, transaction);
  }

  updateTransaction(
    account: Account,
    transaction: Transaction,
    amount: Dinero<number>,
    date: Date,
    type: TransactionType,
    entityName: string,
    categoryName: string,
    receiptReference: string,
    description: string
  ) {
    //create Category if not exist
    var category = null;
    if (categoryName !== undefined && categoryName.trim().length != 0)
      category = this.categoryService.upsertCategory(categoryName);

    //create Entity if not exist
    var entity = null;
    if (entityName !== undefined && entityName.trim().length != 0) {
      entity = this.entityService.upsertEntity(entityName, description, category);
    }

    transaction.amount = amount;
    transaction.date = date;
    transaction.type = type;
    transaction.entity = entity == null ? undefined : entity;
    transaction.category = category == null ? undefined : category;
    transaction.receiptReference = receiptReference;
    transaction.description = description;
    this.eventsService.transactionChange.emit();
  }

  fromJson(
    json: any[],
    currency: string,
    account: Account,
    bankn: Bankn
  ): any[] {
    var results: any[] = [];
    if (json != null) {
      json.forEach((transaction) => {
        results.push(TransactionService.fromJson(transaction, account, bankn));
      });
    }
    return results;
  }

  /*getReferenceTransaction(account:Account){
    return new Transaction(
      "referenceAccount-"+account.id,
      account.referenceAmount,
      account.referenceDate,
      null,
      null,
      null,
      null,
      account.referenceAmount.toUnit()>0?TransactionType.CREDIT:TransactionType.DEBIT
    );
  }*/

  getSelectedAccountsTransactions(): Transaction[] {
    var accounts: Account[] = this.accountService.getSelectedAccounts();
    return this.getTransactions(accounts);
  }

  getTransactions(accounts: Account[]): Transaction[] {
    var transactions: Transaction[] = [];
    accounts.forEach((account) => {
      account.transactions.forEach((transaction) => {
        transactions.push(transaction);
      });
    });
    return transactions;
  }

  getTransaction(account: Account, id: string): Transaction | null {
    var transactions = this.getTransactions([account]);
    for (var i = 0; i != transactions.length; i++) {
      if (transactions[i].id == id) return transactions[i];
    }
    return null;
  }

  public static sortTransactions(transactions: Transaction[]) {
    transactions.sort(TransactionService.compareTransaction);
  }

  public static compareTransaction(a: Transaction, b: Transaction) {
    return b.date.getTime() - a.date.getTime();
  }

  deleteTransactionId(accountId: string, transactionId: string) {
    var account = this.accountService.getAccount(accountId);
    if (account != null) this.deleteTransaction(account, transactionId);
  }

  deleteTransaction(account: Account, transactionId: string) {
    this.accountService.deleteTransactionId(account, transactionId);
  }

  parse(
    data: string,
    lineSeparator: string,
    columnSeparator: string
  ): string[][] {
    //i18n
    var lines = data.split(lineSeparator);
    if (lines.length > 0 && lines[0].trim().length > 0) {
      var firstRow = lines[0].split(columnSeparator);
      if (firstRow.length > 3) {
        var parsedData: string[][] = [];
        for (var i = 0; i != lines.length; i++) {
          if (lines[i].trim().length != 0) {
            //ignore empty lines
            var columns: string[] = lines[i].split(columnSeparator);
            if (columns.length != firstRow.length) {
              throw new Error('Not all rows have the same number of columns');
            }
            parsedData.push(columns);
          }
        }
        return parsedData;
      } else {
        throw new Error('There should be at least 3 columns');
      }
    } else {
      throw new Error('Enter some text');
    }
  }

  public static toJson(transaction: Transaction): any {
    return {
      id: transaction.id,
      amount: transaction.amount.toJSON().amount, //Dinero to value, compacted result
      type: transaction.type,
      date: transaction.date.toISOString().substring(0, 10),
      entityName: transaction.entity?.name,
      categoryName: transaction.category?.name,
      receiptReference: transaction.receiptReference,
      description: transaction.description,
    };
  }

  public static fromJson(
    transaction: any,
    account: Account,
    bankn: Bankn
  ): Transaction {
    return new Transaction(
      transaction.id,
      MathService.toDinero(
        parseFloat(transaction.amount),
        account.referenceAmount.toJSON().currency
      ),
      transaction.type,
      new Date(transaction.date),
      BanknService.getEntity(bankn, transaction.entityName)!,
      BanknService.getCategory(bankn, transaction.categoryName)!,
      transaction.receiptReference,
      transaction.description,
      account
    );
  }
}
