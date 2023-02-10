import { Bankn } from './bankn';
import { Category } from './category';
import { Entity } from './entity';

describe('Bankn', () => {

  it('should create an instance', () => {
    expect(new Bankn("", "", "")).toBeTruthy();
  });
});
