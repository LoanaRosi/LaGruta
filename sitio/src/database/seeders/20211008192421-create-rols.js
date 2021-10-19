'use strict';

const rols = [
  {
    name : 'Admin',
    createdAt: new Date,
    updatedAt : new Date
  },
  {
    name : 'User',
    createdAt: new Date,
    updatedAt : new Date
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('Rols', rols, {}); //bulkinsert. inserta muchos en la tabla rols
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('Rols', null, {});
     
  }
};
