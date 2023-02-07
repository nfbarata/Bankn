import { dinero, toDecimal } from 'dinero.js';
import { EUR } from '@dinero.js/currencies';
import { Account } from './account';
import { Bankn } from './bankn';
import { TransactionType } from './enums';

describe('Account', () => {

  it('should create an instance', () => {
    expect(new Account(
      "id",
      "name",
      "des",
      dinero({amount:0, currency: EUR}),
      new Date(),
      "PT"
      )).toBeTruthy();
  });
});
