import { TestBed } from '@angular/core/testing';
import Dinero from 'dinero.js';
import { Account } from '../models/account';
import { BanknService } from './bankn.service';

describe('BanknService', () => {

  let service: BanknService;
  let account: Account = new Account("teste","teste","desc",Dinero({amount:0,currency:"EUR"}),new Date(),"PT");

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
      ]
    }).compileComponents();
    service = TestBed.inject(BanknService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('initialized works', () => {
    expect(service.initialized()).toBeFalse();
    let bankn = BanknService.createBankn("test","PT");
    service.setBankn(bankn);
    expect(service.initialized()).toBeTrue();
  });

  it('addAccount, getAccounts and deleteAccountId works', () => {
    expect(service.initialized()).toBeFalse();
    let bankn = BanknService.createBankn("test","PT");
    service.setBankn(bankn);
    expect(service.getAccounts().length).toBe(0);
    expect(service.getBankn()!.accounts.length).toBe(0);
    service.addAccount(account);
    expect(service.getAccounts().length).toBe(1);
    expect(service.getBankn()!.accounts.length).toBe(1);
    service.deleteAccountId(account.id);
    expect(service.getAccounts().length).toBe(0);
    expect(service.getBankn()!.accounts.length).toBe(0);
  });
});
