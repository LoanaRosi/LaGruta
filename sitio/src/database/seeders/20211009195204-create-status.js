'use strict';

const status = [
  {
    name : 'En oferta',
    createdAt: new Date,
    updatedAt : new Date
  },
  {
    name : 'Catálogo',
    createdAt: new Date,
    updatedAt : new Date
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('status', status, {}); //bulkinsert. inserta muchos en la tabla status
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('status', null, {});
     
  }
};
