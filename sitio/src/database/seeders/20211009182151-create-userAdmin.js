'use strict';

const bcrypt = require('bcryptjs')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('users', [
      {
         name : 'admin',
         email: 'francoromangimenez@gmail.com',
         password: bcrypt.hashSync('123123', 10),
         avatarId: 1,
         rollId: 1,
         createdAt: new Date,
         updatedAt: new Date
      },
      {
         name : 'admin',
         email: 'loarosi24@gmail.com',
         password: bcrypt.hashSync('123123', 10),
         avatarId: 1,
         rollId: 1,
         createdAt: new Date,
         updatedAt: new Date
      },
      {
         name : 'admin',
         email: 'marielaerobles@gmail.com',
         password: bcrypt.hashSync('123123', 10),
         avatarId: 1,
         rollId: 1,
         createdAt: new Date,
         updatedAt: new Date
      }

   ], {}); 
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('users', null, {});
     
  }
};
