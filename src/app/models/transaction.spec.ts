import Dinero from 'dinero.js';
import { Account } from './account';
import { Transaction, TransactionType } from './transaction';

describe('Transaction', () => {

  it('should create an instance', () => {
    expect(new Transaction(
      "id",
      Dinero(),
      new Date(),
      "entity", 
      "category", 
      "desc", 
      TransactionType.CREDIT, 
      new Account(
        "id",
        "name",
        "des",
        Dinero(),
        new Date(),
        "PT"
      ))).toBeTruthy();
  });

  it('should process fromJson', () => {
    var id = "testId";
    var amount = 0;
    var date = "2020-01-01"
    var entity = "ent";
    var category = "cat";
    var description = "desc";
    var type = TransactionType.CREDIT;
    var account = new Account(
      "id",
      "name",
      "des",
      Dinero(),
      new Date(),
      "PT"
    );

    var transaction = Transaction.fromJson({
      id: id,
      amount: amount,
      date: date,
      entity: entity,
      category: category,
      description: description,
      type: type
    }, account);
    expect(transaction.id).toBe(id);
    expect(transaction.amount.getAmount()).toEqual(amount);
    expect(transaction.date).toEqual(new Date(date));
    expect(transaction.entity).toBe(entity);
    expect(transaction.category).toBe(category);
    expect(transaction.description).toBe(description);
    expect(transaction.type).toBe(type);
  });
});
