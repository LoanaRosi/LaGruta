'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Avatar.belongsTo(models.User,{
      //   as : "users",
      //   foreignKey : "avatarId"
      // })
    }
  };
  Avatar.init({
    file: DataTypes.STRING(500),
    // defaultValue : "avatar.png"
  }, {
    sequelize,
    modelName: 'Avatar',
  });
  return Avatar;
};