import { Bankn } from './bankn';
import { Category } from './category';
import { Entity } from './entity';

describe('Entity', () => {

  it('should create an instance', () => {
    expect(new Entity("e")).toBeTruthy();
  });
});
