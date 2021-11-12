'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Language.hasMany(models.Product,{
        as : "Products",
        foreignKey : "laguageId"
      })
    }
  };
  Language.init({
    name: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'Language',
  });
  return Language;
};