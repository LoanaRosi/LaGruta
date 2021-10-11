'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(100)
      },
      price: {
        type: Sequelize.DECIMAL(8,2)
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      player: {
        type: Sequelize.STRING(100)
      },
      timeGame: {
        type: Sequelize.STRING(100)
      },
      author: {
        type: Sequelize.STRING(100)
      },
      publisher: {
        type: Sequelize.STRING(100)
      },
      thematic: {
        type: Sequelize.STRING(500)
      },
      content: {
        type: Sequelize.STRING(500)
      },
      mechanic: {
        type: Sequelize.STRING(500)
      },
      statusId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Statuses'
          },
          key : 'id'
        }
      },
      complexityId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Complexities'
          },
          key : 'id'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Categories'
          },
          key : 'id'
        }
      },
      laguageId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Languages'
          },
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};