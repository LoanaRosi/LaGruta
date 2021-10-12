'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Image,{
        as : "images"
      })

      Product.belongsTo(models.Status,{
        as : "status"
      })

      Product.belongsTo(models.Complexity,{
        as : "complexities"
      })

      Product.belongsTo(models.Category,{
        as : "categories"
      })

      Product.belongsTo(models.Language,{
        as : "languages"
      })

    }
  };
  Product.init({
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(8,2),
    discount: DataTypes.INTEGER,
    player: DataTypes.STRING(100),
    timeGame: DataTypes.STRING(100),
    author: DataTypes.STRING(100),
    publisher: DataTypes.STRING(100),
    thematic: DataTypes.STRING(500),
    content: DataTypes.TEXT,
    mechanic: DataTypes.STRING(500),
    statusId: DataTypes.INTEGER,
    complexityId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    laguageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};