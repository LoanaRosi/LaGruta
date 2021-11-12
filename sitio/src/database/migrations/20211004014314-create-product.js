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
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(8,2)
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      player: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      timeGame: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      publisher: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      thematic: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      content: {
        type: Sequelize.TEXT
      },
      mechanic: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      statusId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Statuses'
          },
          key : 'id'
        }
      },
      complexityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Complexities'
          },
          key : 'id'
        }
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Categories'
          },
          key : 'id'
        }
      },
      laguageId: {
        allowNull: false,
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