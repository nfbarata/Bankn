import { TestBed } from '@angular/core/testing';
import { dinero } from 'dinero.js';
import { EUR } from '@dinero.js/currencies';
import { Account } from '../models/account';
import { Entity } from '../models/entity';
import { BanknService } from './bankn.service';

describe('BanknService', () => {

  let service: BanknService;
  let account: Account = new Account("teste","teste","desc",dinero({amount:0,currency:EUR}),new Date(),"PT");

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

  it('upsertEntity works', () => {
    expect(service.initialized()).toBeFalse();
    let bankn = BanknService.createBankn("test","PT");
    service.setBankn(bankn);
    expect(service.getBankn()?.entities.length).toBe(0);
    service.upsertEntity("ent","entDesc");
    expect(service.getBankn()?.entities.length).toBe(1);
    service.upsertEntity("ent","entDesc");
    expect(service.getBankn()?.entities.length).toBe(1);
    service.upsertEntity("ent2","entDesc");
    expect(service.getBankn()?.entities.length).toBe(2);
  });

  it('addNewPattern works', () => {
    expect(service.initialized()).toBeFalse();
    let bankn = BanknService.createBankn("test","PT");
    service.setBankn(bankn);
    var ent = new Entity("name");
    service.getBankn()?.entities.push(ent);
  });

  it('upsertCategory works', () => {
    expect(service.initialized()).toBeFalse();
    let bankn = BanknService.createBankn("test","PT");
    service.setBankn(bankn);
    expect(service.getBankn()?.categories.length).toBe(0);
    service.upsertCategory("cat","catDesc");
    expect(service.getBankn()?.categories.length).toBe(1);
    service.upsertCategory("cat","catDesc");
    expect(service.getBankn()?.categories.length).toBe(1);
    service.upsertCategory("cat2","catDesc2");
    expect(service.getBankn()?.categories.length).toBe(2);

    //service.upsertCategory("cat.cat11","catDesc");
    //expect(service.getBankn()?.categories.length).toBe(2);
  });

});
