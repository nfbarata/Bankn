import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
// import { AccountService } from './account.service';
import { BanknService } from './bankn.service';
// import { TransactionService } from './transaction.service';

describe('AccountService', () => {

    let service: AccountService;
    // let accountServiceMock: jasmine.SpyObj<AccountService>;

  beforeEach(() => {
    //  accountServiceMock = jasmine.createSpyObj([]);
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
          // {provide: AccountService, useValue: accountServiceMock}
      ]
    }).compileComponents();
    service = TestBed.inject(AccountService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });  
});
