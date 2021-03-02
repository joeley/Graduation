const sequelize = require("../db");
const { DataTypes } = require("sequelize");
//创建一个模型对象
const Navigation = sequelize.define(
  "Navigation",
  {
    navName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // order: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // }
  },
  {
    paranoid: false
  }
);

module.exports = Navigation;
