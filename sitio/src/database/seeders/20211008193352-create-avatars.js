'use strict';

const avatars = [
  {/* 1 */
    file : 'avatar.png',
    createdAt: new Date,
    updatedAt : new Date
  }
 
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('Avatars', avatars, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('Avatars', null, {});
     
  }
};
