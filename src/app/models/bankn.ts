import  { Account } from "./account";

export class Bankn {
  
  _id:string;
  name:string;
  accounts : Account[];
  //for default account country
  referenceCountry:string;

  constructor(
    id:string,
    name:string,
    accounts : Account[], 
    referenceCountry:string) {
    this._id = id;
    this.name = name;
    if(accounts==null){
      this.accounts = [];
    }else{
      this.accounts = accounts;
    }
    this.referenceCountry = referenceCountry;
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
      json.referenceCountry
    );
  }
}