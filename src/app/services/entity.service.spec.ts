import { TestBed } from '@angular/core/testing';
import { Bankn } from '../models/bankn';

import { EntityService } from './entity.service';

describe('EntityService', () => {
  let service: EntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('upsertEntity works', () => {
    let bankn = new Bankn("","","");
    expect(bankn.entities.length).toBe(0);
    EntityService.upsertEntity(bankn, "ent","entDesc");
    expect(bankn.entities.length).toBe(1);
    EntityService.upsertEntity(bankn, "ent","entDesc");
    expect(bankn.entities.length).toBe(1);
    EntityService.upsertEntity(bankn, "ent2","entDesc");
    expect(bankn.entities.length).toBe(2);
  });

});
