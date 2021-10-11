'use strict';

const products = require("../../data/productsDB");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('products', products , {});
    
  },
  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('products', null, {});
     
  }
};
