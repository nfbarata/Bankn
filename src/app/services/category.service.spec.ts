import { TestBed } from '@angular/core/testing';
import { Bankn } from '../models/bankn';
import { Category } from '../models/category';
import { BanknService } from './bankn.service';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  //let banknServiceMock: jasmine.SpyObj<BanknService>;
  
  beforeEach(() => {
    //banknServiceMock = jasmine.createSpyObj([]);
    TestBed.configureTestingModule({imports: [ ],
      declarations: [],
      providers: [
        //{provide: BanknService, useValue: banknServiceMock}
      ]});
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
  it('upsertCategory works', () => {
    let bankn = new Bankn("", "", "");
    expect(bankn.categories.length).toBe(0);
    service.upsertCategory("cat","catDesc");
    expect(bankn.categories.length).toBe(1);
    service.upsertCategory("cat","catDesc");
    expect(bankn.categories.length).toBe(1);
    service.upsertCategory("cat2","catDesc2");
    expect(bankn.categories.length).toBe(2);

    //service.upsertCategory("cat.cat11","catDesc");
    //expect(service.getBankn()?.categories.length).toBe(2);
  });*/

  it('should process fromJson', () => {
    var name = "name";
    var descriptionPatterns: string[] = [];

    //no optional vars
    var category = CategoryService.fromJson({
      name: name,
      descriptionPatterns: descriptionPatterns,
    });
    expect(category.name).toBe(name);
    expect(category.descriptionPatterns.length).toBe(0);
    expect(category.innerCategory).toBeNull();

    //with optional vars
    var newCategory = CategoryService.fromJson({
      name: name,
      descriptionPatterns: ["a","b"],
      innerCategory: category
    });
    expect(newCategory.name).toBe(name);
    expect(newCategory.descriptionPatterns.length).toBe(2);
    expect(newCategory.descriptionPatterns[0]).toBe("a");
    expect(newCategory.descriptionPatterns[1]).toBe("b");
    expect(newCategory.innerCategory).toBeInstanceOf(Category);
    expect(newCategory.innerCategory?.name).toBe(name);
  });
});
