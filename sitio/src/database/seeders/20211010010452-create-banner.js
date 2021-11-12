'use strict';

const banners = [
  {/* 1 */
    name : 'banner-1.jpg',
    createdAt: new Date,
    updatedAt : new Date
  },
  {/* 2 */
    name : 'banner-2.png',
    createdAt: new Date,
    updatedAt : new Date
  },
  {/* 3 */
    name : 'bannerbanner-1630204422358.png',
    createdAt: new Date,
    updatedAt : new Date
  },
 
]

module.exports = {
  up: async (queryInterface, Sequelize) => {

   await queryInterface.bulkInsert('Banners',banners, {});
  },

  down: async (queryInterface, Sequelize) => {

   await queryInterface.bulkDelete('Banners', null, {});
  
  }
};
