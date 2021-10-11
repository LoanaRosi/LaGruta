'use strict';

const language = require("../../data/languageDB");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('languages', language, {});
  
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('languages', null, {});
    
  }
};
