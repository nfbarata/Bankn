import { TestBed } from '@angular/core/testing';
import { dinero, toDecimal } from 'dinero.js';
import { EUR } from '@dinero.js/currencies';
import { Account } from '../models/account';
import { TransactionType } from '../models/enums';
import { Transaction } from '../models/transaction';
import { AccountService } from './account.service';
import { BanknService } from './bankn.service';
import { EventsService } from './events.service';
import { TransactionService } from './transaction.service';
import { MathService } from './math.service';

describe('AccountService', () => {

  let service: AccountService;
  let banknServiceMock: jasmine.SpyObj<BanknService>;
  let transactionServiceMock: jasmine.SpyObj<TransactionService>;
  let mathServiceMock: jasmine.SpyObj<MathService>;

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
    mathServiceMock = jasmine.createSpyObj("mathService",["toCurrency", "toDinero"]);
    mathServiceMock.toCurrency = jasmine.createSpy().and.callFake(function(){
      return EUR;
    });
    mathServiceMock.toDinero = jasmine.createSpy().and.callFake(function(value){
      return dinero({
        amount: value,
        currency: EUR,
        //scale: 2
      });
    });
    transactionServiceMock = jasmine.createSpyObj("transactionService",["sortTransactions"]);
    var eventsService = TestBed.inject(EventsService);
    service = new AccountService(banknServiceMock, eventsService, mathServiceMock);
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
    var transaction = new Transaction("teste",dinero({amount:0,currency:EUR}), TransactionType.DEBIT);
    service.addTransaction(account, transaction);
    expect(account.transactions.length).toBe(1);
    expect(transaction.account.id).toBe(account.id);
    service.deleteTransactionId(account, transaction.id);
    expect(account.transactions.length).toBe(0);
  });

  it('getInitialValue works', () => {
    var account = service.createAccount("teste", "teste", new Date(), "PT");
    var balance = AccountService.getInitialValue(account);
    expect(toDecimal(balance)).toBe("0.00");
    var transaction = new Transaction("teste", dinero({amount:1000,currency:EUR}), TransactionType.CREDIT, new Date(account.referenceDate.getDate()+1));
    service.addTransaction(account, transaction);
    balance = AccountService.getInitialValue(account);
    expect(toDecimal(balance)).toBe("-10.00");
    service.deleteTransactionId(account, transaction.id);
    balance = AccountService.getInitialValue(account);
    expect(toDecimal(balance)).toBe("0.00");
  });

  it('getInitialValueMultiple works', () => {
    var accounts: Account[] = [];
    var account = service.createAccount("teste", "teste", new Date(), "PT");
    accounts.push(account);
    var balance = service.getInitialValueMultiple(accounts);
    expect(toDecimal(balance)).toBe("0.00");
    var transaction = new Transaction("teste", dinero({amount:1000,currency:EUR}), TransactionType.CREDIT, new Date(account.referenceDate.getDate()+1));
    service.addTransaction(account, transaction);
    balance = service.getInitialValueMultiple(accounts);
    expect(toDecimal(balance)).toBe("-10.00");
  });
});
