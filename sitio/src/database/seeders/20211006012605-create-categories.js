'use strict';

const categories = require("../../data/categoriesDB");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('categories', categories, {});

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('categories', null, {});
  
  }
};
