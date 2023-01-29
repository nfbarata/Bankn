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

  it('should process fromJson', () => {
    var id = "testId";
    var name = "name";
    var description = "desc";
    var referenceAmount = "0.00";
    var referenceDate = "2020-01-01"
    var referenceCountry = "PT";

    var bankn = new Bankn("id", "name", [], "PT");

    //no transactions
    var account = Account.fromJson({
      id: id,
      name: name,
      description: description,
      referenceAmount: referenceAmount,
      referenceDate: referenceDate,
      referenceCountry: referenceCountry
    }, bankn);
    expect(account.id).toBe(id);
    expect(account.name).toBe(name);
    expect(account.description).toBe(description);
    expect(toDecimal(account.referenceAmount)).toEqual(referenceAmount);    
    expect(account.referenceDate).toEqual(new Date(referenceDate));
    expect(account.referenceCountry).toBe(referenceCountry);
    expect(account.transactions.length).toBe(0);
    expect(account.selected).toBeFalse();

    //with transactions
    account = Account.fromJson({
      id: id,
      name: name,
      description: description,
      referenceAmount: referenceAmount,
      referenceDate: referenceDate,
      referenceCountry: referenceCountry,
      transactions: [{
        id: "1",
        amount: "0",
        date: "2022-01-01",
        entity: "",
        category: "",
        description: "",
        type: TransactionType.CREDIT,
      },{
        id: "2",
        amount: "0",
        date: "2022-01-01",
        entity: "",
        category: "",
        description: "",
        type: TransactionType.CREDIT,
      }],
      selected: true
    }, bankn);
    expect(account.id).toBe(id);
    expect(account.name).toBe(name);
    expect(account.description).toBe(description);
    expect(toDecimal(account.referenceAmount)).toEqual(referenceAmount);    
    expect(account.referenceDate).toEqual(new Date(referenceDate));
    expect(account.referenceCountry).toBe(referenceCountry);
    expect(account.transactions.length).toBe(2);
    expect(account.transactions[0].id).toBe("1");
    expect(account.transactions[1].id).toBe("2");
    expect(account.selected).toBeTrue();
  });
});
