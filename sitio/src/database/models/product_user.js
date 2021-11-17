'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product_User.belongsTo(models.Order,{
        as : "order",
        foreignKey : "orderId",
        onDelete : "cascade"
      })
      Product_User.hasMany(models.Product,{
        as : "product",
        foreignKey : "productId"
      })
    }
  };
  Product_User.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    orderId : DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product_User',
  });
  return Product_User;
};