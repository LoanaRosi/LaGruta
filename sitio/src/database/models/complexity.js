'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Complexity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Complexity.hasMany(models.Product,{
        as : "products",
        foreignKey : "complexityId"
      })
    }
  };
  Complexity.init({
    name: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'Complexity',
  });
  return Complexity;
};