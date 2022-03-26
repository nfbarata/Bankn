import { TestBed } from '@angular/core/testing';
import { EventsService } from './events.service';

describe('EventsService', () => {

    let service: EventsService;
  
  beforeEach(() => {
  //    banknServiceMock = jasmine.createSpyObj([]);
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [],
      providers: [
          //{provide: BanknService, useValue: banknServiceMock}
      ]
    }).compileComponents();
    service = TestBed.inject(EventsService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
