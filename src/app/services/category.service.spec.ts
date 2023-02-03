import { TestBed } from '@angular/core/testing';
import { Bankn } from '../models/bankn';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('upsertCategory works', () => {
    let bankn = new Bankn("", "", "");
    expect(bankn.categories.length).toBe(0);
    CategoryService.upsertCategory(bankn, "cat","catDesc");
    expect(bankn.categories.length).toBe(1);
    CategoryService.upsertCategory(bankn, "cat","catDesc");
    expect(bankn.categories.length).toBe(1);
    CategoryService.upsertCategory(bankn,"cat2","catDesc2");
    expect(bankn.categories.length).toBe(2);

    //service.upsertCategory("cat.cat11","catDesc");
    //expect(service.getBankn()?.categories.length).toBe(2);
  });
});
