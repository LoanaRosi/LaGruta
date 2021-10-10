'use strict';

const images = require("../../data/imagesDB")

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkInsert('image', images, {});
  
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('image', null, {});
    
  }
};
