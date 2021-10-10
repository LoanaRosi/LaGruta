'use strict';

const products = require("../../data/productsDB");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('product', products , {});
    
  },
  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('product', null, {});
     
  }
};
