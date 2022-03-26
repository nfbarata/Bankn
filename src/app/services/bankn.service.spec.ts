import { TestBed } from '@angular/core/testing';
// import { AccountService } from './account.service';
import { BanknService } from './bankn.service';
// import { TransactionService } from './transaction.service';

describe('BanknService', () => {

    let service: BanknService;
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
    service = TestBed.inject(BanknService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });  
});
