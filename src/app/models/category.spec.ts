import { Bankn } from './bankn';
import { Category } from './category';

describe('Category', () => {

  it('should create an instance', () => {
    expect(new Category("c")).toBeTruthy();
  });

  it('should process fromJson', () => {
    var name = "name";
    var descriptionPatterns: string[] = [];

    //no optional vars
    var category = Category.fromJson({
      name: name,
      descriptionPatterns: descriptionPatterns,
    });
    expect(category.name).toBe(name);
    expect(category.descriptionPatterns.length).toBe(0);
    expect(category.innerCategory).toBeNull();

    //with optional vars
    var newCategory = Category.fromJson({
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
