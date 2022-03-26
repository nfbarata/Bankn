import { Bankn } from './bankn';

describe('Bankn', () => {

  it('should create an instance', () => {
    expect(new Bankn("","",[],"")).toBeTruthy();
  });

  it('should process fromJson', () => {
    var id = "testId";
    var name = "name";
    var referenceCountry = "PT";

    //no accounts
    var bankn = Bankn.fromJson({
      id: id,
      name: name,
      referenceCountry: referenceCountry
    });
    expect(bankn.id).toBe(id);
    expect(bankn.name).toBe(name);
    expect(bankn.referenceCountry).toBe(referenceCountry);
    expect(bankn.accounts.length).toBe(0);

    //with accounts
    bankn = Bankn.fromJson({
      id: id,
      name: name,
      referenceCountry: referenceCountry,
      accounts: [{
        id: "1",
        name: "",
        description: "",
        referenceAmount: "1",
        referenceDate: "2020-01-01",
        referenceCountry: "PT",
        selected: false,
      },{
        id: "2",
        name: "",
        description: "",
        referenceAmount: "2",
        referenceDate: "2020-01-01",
        referenceCountry: "PT",
        selected: false,
      }]
    });
    expect(bankn.id).toBe(id);
    expect(bankn.name).toBe(name);
    expect(bankn.referenceCountry).toBe(referenceCountry);
    expect(bankn.accounts.length).toBe(2);
    expect(bankn.accounts[0].id).toBe("1");
    expect(bankn.accounts[1].id).toBe("2");
  });
});
