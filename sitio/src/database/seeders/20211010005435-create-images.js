'use strict';

const images = require("../../data/imagesDB")

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkInsert('Images', images, {});
  
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Images', null, {});
    
  }
};
