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
      User.hasOne(models.RoomLists, {foreignKey:"UserId"}),
      User.hasMany(models.Chat, { foreignKey: "UserId"})
    }
  }
  User.init({
    Username: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    Email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    Password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: true
      }
    },
    Role: {
      type: DataTypes.ENUM('user', 'admin', 'superAdmin'),
      validate:{
        notEmpty: true
      }
    },
    Delete: {
      type: DataTypes.BOOLEAN,
      validate:{
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};