import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
import { BanknService } from './bankn.service';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {

    let service: TransactionService;
    //let banknServiceMock: jasmine.SpyObj<BanknService>;

  beforeEach(() => {
      //banknServiceMock = jasmine.createSpyObj([]);
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [],
      providers: [
        //  {provide: BanknService, useValue: banknServiceMock}
      ]
    }).compileComponents();
    service = TestBed.inject(TransactionService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
