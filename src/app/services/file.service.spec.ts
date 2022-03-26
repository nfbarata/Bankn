import { TestBed } from '@angular/core/testing';
import { FileService } from './file.service';

describe('FileService', () => {

    let service: FileService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [],
      providers: []
    }).compileComponents();
    service = TestBed.inject(FileService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
