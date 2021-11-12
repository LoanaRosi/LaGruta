'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Rol,{
        as : "rols",
        foreignKey : "rolId"
      })

      User.belongsTo(models.Avatar,{
        as : "avatars",
        foreignKey : "avatarId"
      })
    }
  };
  User.init({
    name: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    password: DataTypes.STRING(100),
    rolId: DataTypes.INTEGER,
    avatarId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};