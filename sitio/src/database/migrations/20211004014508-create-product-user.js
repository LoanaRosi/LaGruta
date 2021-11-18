'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product_Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Users'
          },
          key : 'id'
        }
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Products'
          },
          key : 'id'
        }
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Order'
          },
          key : 'id'
        }
      },
      orderId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Orders'
          },
          key : 'id'
        },
        onDelete : 'cascade'
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Product_Users');
  }
};