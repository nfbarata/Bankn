import { Bankn } from './bankn';
import { Category } from './category';
import { Entity } from './entity';

describe('Bankn', () => {

  it('should create an instance', () => {
    expect(new Bankn("", "", "")).toBeTruthy();
  });

  it('should process getEntity', () => {
    var bankn = new Bankn("id","name","PT");
    expect(bankn.getEntity("ent")).toBeNull();
    
    var entity = new Entity("ent");
    bankn.entities.push(entity);
    expect(bankn.getEntity("ent")).toBeTruthy();
  });

  it('should process getCategory', () => {
    var bankn = new Bankn("id","name","PT");
    expect(bankn.getCategory("cat")).toBeNull();
    
    var category = new Category("cat");
    bankn.categories.push(category);
    expect(bankn.getCategory("cat")).toBeTruthy();
    
    var subCategory = new Category("subcat");
    category.innerCategory=subCategory;
    expect(bankn.getCategory("cat")).toBeTruthy();
    expect(bankn.getCategory("subcat")).toBeTruthy();

    var sub2Category = new Category("subcat2");
    subCategory.innerCategory=sub2Category;
    expect(bankn.getCategory("cat")).toBeTruthy();
    expect(bankn.getCategory("subcat")).toBeTruthy();
    expect(bankn.getCategory("subcat2")).toBeTruthy();
  });
});
