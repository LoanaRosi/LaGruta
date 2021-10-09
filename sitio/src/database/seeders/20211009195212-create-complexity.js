'use strict';

const complexity = [
  {
    name : 'Fácil',
    createdAt: new Date,
    updatedAt : new Date
  },
  {
    name : 'Media',
    createdAt: new Date,
    updatedAt : new Date
  },
  {
    name : 'Difícil',
    createdAt: new Date,
    updatedAt : new Date
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('complexity', complexity, {}); //bulkinsert. inserta muchos en la tabla rols
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('complexity', null, {});
     
  }
};
