const sequelize = require("../db");
const { DataTypes } = require("sequelize");
//创建一个模型对象
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vip: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true 
  }
);

module.exports = User;
