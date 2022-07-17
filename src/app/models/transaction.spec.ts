import Dinero from "dinero.js";
import { Account } from './account';
import { TransactionType } from "./enums";
import { Transaction } from './transaction';

describe('Transaction', () => {

  it('should create an instance', () => {
    expect(new Transaction(
      "id",
      Dinero({ amount: 0, currency: 'EUR'}),
      TransactionType.CREDIT, 
      new Date(),
      "entity", 
      "category", 
      "receipt",
      "desc",
      new Account(
        "id",
        "name",
        "desc",
        Dinero({ amount: 0, currency: 'EUR' }),
        new Date(),
        "PT"
      ))).toBeTruthy();
  });

  it('should process fromJson', () => {
    var id = "testId";
    var amount = 0;
    var date = "2020-01-01"
    var entityName = "ent";
    var categoryName = "cat";
    var receiptReference = "rec"
    var description = "desc";
    var type = TransactionType.CREDIT;
    var account = new Account(
      "id",
      "name",
      "des",
      Dinero({ amount: 0, currency: 'EUR' }),
      new Date(),
      "PT"
    );

    var transaction = Transaction.fromJson({
      id: id,
      amount: amount,
      type: type,
      date: date,
      entityName: entityName,
      categoryName: categoryName,
      receiptReference: receiptReference,
      description: description,
    }, account);
    expect(transaction.id).toBe(id);
    expect(transaction.amount.toJSON().amount).toEqual(amount);
    expect(transaction.type).toBe(type);
    expect(transaction.date).toEqual(new Date(date));
    expect(transaction.entityName).toBe(entityName);
    expect(transaction.categoryName).toBe(categoryName);
    expect(transaction.receiptReference).toBe(receiptReference);
    expect(transaction.description).toBe(description);
  });
});
