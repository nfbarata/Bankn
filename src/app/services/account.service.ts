import { Injectable } from '@angular/core';

import { BanknService } from './bankn.service';
import { EventsService } from './events.service';
import { Account } from '../models/account';

import { Transaction } from '../models/transaction';

//import Dinero from 'dinero.js';
import { Dinero } from 'dinero.js';
import { TransactionService } from './transaction.service';
import { TransactionType } from '../models/enums';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private banknService: BanknService,
    private eventsService: EventsService
  ) {}

  createAccount(
    name: string,
    description: string,
    referenceDate: Date,
    referenceCountry: string,
    referenceAmount?: Dinero
  ): Account {
    var account: Account = new Account(
      this.createId(),
      name,
      description,
      referenceAmount === undefined
        ? Account.toDinero(this.banknService.getReferenceCurrency()!, 0)
        : referenceAmount,
      referenceDate,
      referenceCountry,
      [],
      true
    );
    this.banknService.addAccount(account);
    return account;
  }

  updateAccount(
    id: string,
    name: string,
    description: string,
    referenceAmount: Dinero,
    referenceDate: Date,
    referenceCountry: string
  ) {
    var account: Account | null = this.getAccount(id);
    if (account != null) {
      account.name = name;
      account.description = description;
      account.referenceAmount = referenceAmount;
      account.referenceDate = referenceDate;
      account.referenceCountry = referenceCountry;
      this.eventsService.accountsChange.emit();
    }
  }

  private createId(): string {
    //return uuid();
    var accounts: Account[] = this.getAccounts();
    var accountIds: string[] = [];
    for (let i = 0; i < accounts.length; i++) {
      accountIds.push(accounts[i].id);
    }
    accountIds = accountIds.sort((a: string, b: string): any => {
      return Number(a) - Number(b);
    });
    let i;
    for (i = 0; i < accountIds.length; i++) {
      if (accountIds[i].localeCompare(i + '') != 0) {
        //console.log(i);
        return i + '';
      }
    }
    return i + '';
  }

  deleteAccountId(accountId: string) {
    this.banknService.deleteAccountId(accountId);
  }

  deleteAccount(account: Account) {
    this.deleteAccountId(account.id);
  }

  getAccounts(): Account[] {
    return this.banknService.getAccounts();
  }

  getAccount(accountId: string): Account | null {
    var accounts: Account[] = this.getAccounts();
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id == accountId) return accounts[i];
    }
    console.error('account not found:' + accountId);
    return null;
  }

  getSelectedAccounts(): Account[] {
    var accounts: Account[] = [];
    this.banknService.getAccounts().forEach((account) => {
      if (account.selected) accounts.push(account);
    });
    return accounts;
  }

  toggleAccountId(accountId: string) {
    var account: Account | null = this.getAccount(accountId);
    if (account != null) this.toggleAccount(account);
  }

  toggleAccount(account: Account) {
    if (account.selected) this.unselectAccount(account);
    else this.selectAccount(account);
  }

  selectAccountId(accountId: string) {
    var account: Account | null = this.getAccount(accountId);
    if (account != null) this.selectAccount(account);
  }

  selectAccount(account: Account) {
    if (!account.selected) {
      account.selected = true;
      this.eventsService.accountSelectionChange.emit();
    }
  }

  unselectAccountId(accountId: string) {
    var account: Account | null = this.getAccount(accountId);
    if (account != null) this.unselectAccount(account);
  }

  unselectAccount(account: Account) {
    if (account.selected) {
      account.selected = false;
      this.eventsService.accountSelectionChange.emit();
    }
  }

  addTransaction(account: Account, transaction: Transaction) {
    transaction.account = account;
    account.transactions.push(transaction);
    TransactionService.sortTransactions(account.transactions);
    this.eventsService.accountTransactionsChange.emit();
  }

  deleteTransactionId(account: Account, transactionId: string) {
    account.transactions = account.transactions.filter(function (transaction) {
      return transaction.id != transactionId;
    });
    this.eventsService.transactionChange.emit();
    this.eventsService.accountTransactionsChange.emit();
  }

  static getInitialValue(account: Account): Dinero {
    var initialBalance = Account.toDinero(
      account.referenceAmount.toJSON().currency,
      account.referenceAmount.toUnit()
    );

    //calculate initial balance
    for (let i = account.transactions.length - 1; i >= 0; i--) {
      if (
        account.referenceDate.getTime() > account.transactions[i].date.getTime()
      ) {
        switch (account.transactions[i].type) {
          case TransactionType.CREDIT:
            initialBalance = initialBalance.subtract(
              account.transactions[i].amount
            );
            break;
          case TransactionType.DEBIT:
            initialBalance = initialBalance.add(account.transactions[i].amount);
            break;
        }
      } else {
        //no need to continue
        break;
      }
    }
    return initialBalance;
  }

  static getInitialValueMultiple(accounts: Account[]): Dinero {
    var initialBalance = Account.toDinero(
      accounts[0].referenceAmount.toJSON().currency, //TODO dif currencies
      0
    );
    accounts.forEach((account) => {
      initialBalance = initialBalance.add(
        AccountService.getInitialValue(account)
      );
    });
    return initialBalance;
  }
}
