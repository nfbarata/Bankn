import { TestBed } from '@angular/core/testing';
import Dinero from 'dinero.js';
import { Account } from '../models/account';
import { TransactionType } from '../models/enums';
import { Transaction } from '../models/transaction';
import { AccountService } from './account.service';
import { BanknService } from './bankn.service';
import { EventsService } from './events.service';
import { TransactionService } from './transaction.service';

describe('AccountService', () => {

  let service: AccountService;
  let banknServiceMock: jasmine.SpyObj<BanknService>;
  let transactionServiceMock: jasmine.SpyObj<TransactionService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
      ]
    }).compileComponents();
    banknServiceMock = jasmine.createSpyObj("bancknService",["addAccount", "getAccounts"]);
    banknServiceMock.getAccounts = jasmine.createSpy().and.callFake(function(){
      return [];
    });
    banknServiceMock.getReferenceCurrency = jasmine.createSpy().and.callFake(function(){
      return Account.getCurrencyObject("EUR");
    });
    transactionServiceMock = jasmine.createSpyObj("transactionService",["sortTransactions"]);
    var eventsService = TestBed.inject(EventsService);
    service = new AccountService(banknServiceMock, eventsService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createAccount works', () => {
    var account = service.createAccount("teste", "teste", new Date(), "PT");
    expect(banknServiceMock.addAccount).toHaveBeenCalled();
    expect(account.id).toBeDefined();
  });

  it('addTransaction deleteTransactionId works', () => {
    var account = service.createAccount("teste", "teste", new Date(), "PT");
    var transaction = new Transaction("teste",Dinero({amount:0,currency:"EUR"}), TransactionType.DEBIT);
    service.addTransaction(account, transaction);
    expect(account.transactions.length).toBe(1);
    expect(transaction.account.id).toBe(account.id);
    service.deleteTransactionId(account, transaction.id);
    expect(account.transactions.length).toBe(0);
  });

  it('getInitialValue works', () => {
    var account = service.createAccount("teste", "teste", new Date(), "PT");
    var balance = AccountService.getInitialValue(account);
    expect(balance.toUnit()).toBe(0);
    var transaction = new Transaction("teste", Account.toDineroFromAccount(10,account), TransactionType.CREDIT, new Date(account.referenceDate.getDate()+1));
    service.addTransaction(account, transaction);
    balance = AccountService.getInitialValue(account);
    expect(balance.toUnit()).toBe(-10);
    service.deleteTransactionId(account, transaction.id);
    balance = AccountService.getInitialValue(account);
    expect(balance.toUnit()).toBe(0);
  });

  it('getInitialValueMultiple works', () => {
    var accounts: Account[] = [];
    var account = service.createAccount("teste", "teste", new Date(), "PT");
    accounts.push(account);
    var balance = AccountService.getInitialValueMultiple(accounts);
    expect(balance.toUnit()).toBe(0);
    var transaction = new Transaction("teste", Account.toDineroFromAccount(10, account), TransactionType.CREDIT, new Date(account.referenceDate.getDate()+1));
    service.addTransaction(account, transaction);
    balance = AccountService.getInitialValueMultiple(accounts);
    expect(balance.toUnit()).toBe(-10);
  });
});
