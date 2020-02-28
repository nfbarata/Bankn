export const environment = {
  production: false,

  bankn : {
    name:'teste',
    referenceCountry:'PT',
    accounts : [
      {
        id:1,
        name:"conta teste 1",
        selected : false,
        referenceAmount : {
          amount:0,
          currency:'EUR',
          precision:0
        },
        referenceCountry:'PT',
        referenceDate : new Date(2000,1,1),
        description:'aaa',
        transactions : [
          {
            id:11,
            amount:10.01,
            date:new Date(2009,5,11,11,59,11),
            description: "movimento teste 11"
          },
          {
            id:12,
            amount:11.1,
            date:new Date(2009,5,12,11,59,11),
            description: "movimento teste 22"
          },
        ]
      },
      {
        id:2,
        name:"conta teste 2",
        selected : false,
        referenceCountry:'PT',
        referenceAmount : {
          amount:0,
          currency:'EUR',
          precision:0
        },
        referenceDate : new Date(2000,1,1),
        description:'bbb',
        transactions :[
          {
            id:21,
            amount:20,
            date:new Date(2009,6,11,11,59,11),
            description: "movimento teste 21"
          },
          {
            id:22,
            amount:21,
            date:new Date(2009,5,12,11,59,11),
            description: "movimento teste 22"
          },
        ]
      },
    ],
  }
};
