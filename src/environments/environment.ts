export const environment = {
  production: false,
  accounts : [
    {
      id:1,
      name:"conta teste 1",
      selected : false,
      referenceValue : {
        ammount:0,
        currency:'EUR'
      },
      referenceCountry:'PT',
      referenceDate : new Date(2000,1,1),
      description:'aaa',
      transactions : [
        {
          id:11,
          value:10,
          date:new Date(2009,5,11,11,59,11),
          description: "movimento teste 11"
        },
        {
          id:12,
          value:11,
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
      referenceValue : {
        ammount:0,
        currency:'EUR'
      },
      referenceDate : new Date(2000,1,1),
      description:'bbb',
      transactions :[
        {
          id:21,
          value:20,
          date:new Date(2009,6,11,11,59,11),
          description: "movimento teste 21"
        },
        {
          id:22,
          value:21,
          date:new Date(2009,5,12,11,59,11),
          description: "movimento teste 22"
        },
      ]
    },
  ],
};
