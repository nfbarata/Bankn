import { dinero, toDecimal } from 'dinero.js';
import { EUR } from '@dinero.js/currencies';
import { Account } from './account';
import { Bankn } from "./bankn";
import { Category } from "./category";
import { Entity } from "./entity";
import { TransactionType } from "./enums";
import { Transaction } from './transaction';

describe('Transaction', () => {

  it('should create an instance', () => {
    expect(new Transaction(
      "id",
      dinero({ amount: 0, currency: EUR}),
      TransactionType.CREDIT, 
      new Date(),
      new Entity("e"), 
      new Category("c"), 
      "receipt",
      "desc",
      new Account(
        "id",
        "name",
        "desc",
        dinero({ amount: 0, currency: EUR }),
        new Date(),
        "PT"
      ))).toBeTruthy();
  });
});
