import { Bankn } from './bankn';
import { Category } from './category';
import { Entity } from './entity';

describe('Entity', () => {

  it('should create an instance', () => {
    expect(new Entity("e")).toBeTruthy();
  });

  it('should process fromJson', () => {
    var name = "name";
    var descriptionPatterns: string[] = [];

    //no optional vars
    var entity = Entity.fromJson({
      name: name,
      descriptionPatterns: descriptionPatterns,
    });
    expect(entity.name).toBe(name);
    expect(entity.descriptionPatterns.length).toBe(0);
    expect(entity.referenceCategory).toBeNull();

    //with optional vars
    var newEntity = Entity.fromJson({
      name: name,
      descriptionPatterns: ["a","b"],
      referenceCategory: {name:"cat"}
    });
    expect(newEntity.name).toBe(name);
    expect(newEntity.descriptionPatterns.length).toBe(2);
    expect(newEntity.descriptionPatterns[0]).toBe("a");
    expect(newEntity.descriptionPatterns[1]).toBe("b");
    expect(newEntity.referenceCategory).toBeInstanceOf(Category);
    expect(newEntity.referenceCategory?.name).toBe("cat");
  });
});
