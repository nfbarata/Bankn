import { Bankn } from './bankn';
import { Category } from './category';
import { Entity } from './entity';

describe('Bankn', () => {

  it('should create an instance', () => {
    expect(new Bankn("", "", [], "")).toBeTruthy();
  });

  it('should process fromJson', () => {
    var id = "testId";
    var name = "name";
    var referenceCountry = "PT";

    //no optional fields
    var bankn = Bankn.fromJson({
      id: id,
      name: name,
      referenceCountry: referenceCountry
    });
    expect(bankn.id).toBe(id);
    expect(bankn.name).toBe(name);
    expect(bankn.referenceCountry).toBe(referenceCountry);
    expect(bankn.accounts.length).toBe(0);

    //with optional fields
    bankn = Bankn.fromJson({
      id: id,
      name: name,
      referenceCountry: referenceCountry,
      entities: [{
        name: "ent",
      }, {
        name: "ent2",
      }],
      categories: [{
        name: "cat",
      }, {
        name: "cat2",
      }],
      accounts: [{
        id: "1",
        name: "ac1",
        description: "",
        referenceAmount: 1,
        referenceDate: "2020-01-01",
        referenceCountry: referenceCountry,
        selected: false,
      }, {
        id: "2",
        name: "ac2",
        description: "",
        referenceAmount: 2,
        referenceDate: "2020-01-01",
        referenceCountry: referenceCountry,
        selected: false,
      }]
    });
    expect(bankn.id).toBe(id);
    expect(bankn.name).toBe(name);
    expect(bankn.referenceCountry).toBe(referenceCountry);
    expect(bankn.accounts.length).toBe(2);
    expect(bankn.accounts[0].id).toBe("1");
    expect(bankn.accounts[1].id).toBe("2");
    expect(bankn.entities.length).toBe(2);
    expect(bankn.entities[0].name).toBe("ent");
    expect(bankn.categories.length).toBe(2);
    expect(bankn.categories[0].name).toBe("cat");
  });

  it('should process getEntity', () => {
    var bankn = new Bankn("id","name",[],"PT");
    expect(bankn.getEntity("ent")).toBeNull();
    
    var entity = new Entity("ent");
    bankn.entities.push(entity);
    expect(bankn.getEntity("ent")).toBeTruthy();
  });

  it('should process getCategory', () => {
    var bankn = new Bankn("id","name",[],"PT");
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
