import  { Account } from "./account";
import { Category } from "./category";
import { Entity } from "./entity";

export class Bankn {
  
  _id:string;
  name:string;
  accounts : Account[];
  //for default account country
  referenceCountry:string;
  
  entities: Entity[];
  categories: Category[];

  constructor(
    id:string,
    name:string,
    accounts : Account[], 
    referenceCountry:string,
    categories: Category[] = [],
    entities: Entity[]=[],
  ) {
    this._id = id;
    this.name = name;
    if(accounts==null){
      this.accounts = [];
    }else{
      this.accounts = accounts;
    }
    this.referenceCountry = referenceCountry;
    this.entities = entities;
    this.categories = categories;
  }

  public get id(): string{
    return this._id;
  }

  public toJson(): any{
    var accountsJson: any[] = [];
    this.accounts.forEach((account) => {
      accountsJson.push(account.toJson());
    });
    return {
      id: this.id,
      name: this.name,
      accounts: accountsJson,
      referenceCountry: this.referenceCountry,
      entities : this.entities,
      categories : this.categories,
    };
  }

  public static fromJson(json: any): Bankn{
    var accounts: Account[] = [];
    if(json.accounts)
      json.accounts.forEach((account: any) => {
        accounts.push(Account.fromJson(account));
      });
    return new Bankn(
      json.id,
      json.name,
      accounts,
      json.referenceCountry,
      json.entities,
      json.categories
    );
  }
}