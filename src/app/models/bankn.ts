import { Account } from './account';
import { Category } from './category';
import { Entity } from './entity';

export class Bankn {
  _id: string;
  name: string;
  accounts: Account[];
  //for default account country
  referenceCountry: string;

  entities: Entity[];
  categories: Category[];

  constructor(
    id: string,
    name: string,
    referenceCountry: string,
    accounts: Account[] = [],
    categories: Category[] = [],
    entities: Entity[] = []
  ) {
    this._id = id;
    this.name = name;
    if (accounts == null) {
      this.accounts = [];
    } else {
      this.accounts = accounts;
    }
    this.referenceCountry = referenceCountry;
    this.entities = entities;
    this.categories = categories;
  }

  public get id(): string {
    return this._id;
  }

  getEntity(entityName: string): Entity | null {
    for (let e = 0; e < this.entities.length; e++) {
      if (this.entities[e].name == entityName) return this.entities[e];
    }
    return null;
  }

  getCategory(
    categoryName: string,
    parentCategory?: Category
  ): Category | null {
    //check top most categories
    if (parentCategory === undefined) {
      for (let c = 0; c < this.categories.length; c++) {
        if (this.categories[c].name == categoryName) {
          return this.categories[c];
        } else {
          var category = this.getCategory(categoryName, this.categories[c]);
          if (category != null) return category;
        }
      }
    } else {
      //check inner categories
      if (parentCategory.name == categoryName) {
        return parentCategory;
      } else {
        if (parentCategory.innerCategory != null)
          return this.getCategory(categoryName, parentCategory.innerCategory);
      }
    }
    return null;
  }

  public toJson(): any {
    var accountsJson: any[] = [];
    this.accounts.forEach((account) => {
      accountsJson.push(account.toJson());
    });
    return {
      id: this.id,
      name: this.name,
      accounts: accountsJson,
      referenceCountry: this.referenceCountry,
      entities: this.entities,
      categories: this.categories,
    };
  }

  public static fromJson(json: any): Bankn {
    var bankn = new Bankn(
      json.id,
      json.name,
      json.referenceCountry,
    );

    if (json.categories)
      json.categories.forEach((category: any) => {
        bankn.categories.push(Category.fromJson(category));
      });

    if (json.entities)
      json.entities.forEach((entity: any) => {
        bankn.entities.push(Entity.fromJson(entity));
      });

    if (json.accounts)
      json.accounts.forEach((account: any) => {
        bankn.accounts.push(Account.fromJson(account, bankn));
      });

    return bankn;
  }
}
