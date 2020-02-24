export const environment = {
  production: false,
  accounts : [
    {
      id:1,
      name:"conta teste 1",
      transactions : [
        {
          id:11,
          value:10,
          date:'2009-05-11:11:59:11',
          description: "movimento teste 11"
        },
        {
          id:12,
          value:11,
          date:'2009-05-12:11:59:11',
          description: "movimento teste 22"
        },
      ]
    },
    {
      id:2,
      name:"conta teste 2",
      transactions :[
        {
          id:21,
          value:20,
          date:'2009-06-11:11:59:11',
          description: "movimento teste 21"
        },
        {
          id:22,
          value:21,
          date:'2009-06-12:11:59:11',
          description: "movimento teste 22"
        },
      ]
    },
  ],
};
