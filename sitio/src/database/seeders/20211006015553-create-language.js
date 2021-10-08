'use strict';

const language = require("../../data/languageDB");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('language', language, {});
  
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('language', null, {});
    
  }
};
