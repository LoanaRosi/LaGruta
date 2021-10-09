'use strict';

const avatars = [
  {
    file : 'avatar.png',
    createdAt: new Date,
    updatedAt : new Date
  }
 
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('avatars', avatars, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('avatars', null, {});
     
  }
};
