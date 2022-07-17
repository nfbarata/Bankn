import Dinero from "dinero.js";
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
      Dinero({ amount: 0, currency: 'EUR'}),
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

    var bankn = new Bankn("id","teste",[],"");

    var category = new Category(categoryName);
    bankn.categories.push(category);

    var entity = new Entity(entityName);
    entity.referenceCategory = category;
    bankn.entities.push(entity);

    var account = new Account(
      "id",
      "name",
      "des",
      Dinero({ amount: 0, currency: 'EUR' }),
      new Date(),
      "PT"
    );
    bankn.accounts.push(account);

    var transaction = Transaction.fromJson({
      id: id,
      amount: amount,
      type: type,
      date: date,
      entityName: entityName,
      categoryName: categoryName,
      receiptReference: receiptReference,
      description: description,
    }, account, bankn);
    expect(transaction.id).toBe(id);
    expect(transaction.amount.toJSON().amount).toEqual(amount);
    expect(transaction.type).toBe(type);
    expect(transaction.date).toEqual(new Date(date));
    expect(transaction.entity?.name).toBe(entityName);
    expect(transaction.category?.name).toBe(categoryName);
    expect(transaction.receiptReference).toBe(receiptReference);
    expect(transaction.description).toBe(description);
  });
});
