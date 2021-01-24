const sequelize = require("../db");
const { DataTypes } = require("sequelize");
//创建一个模型对象
const User = sequelize.define(
  "User",
  {
    userName: {
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
    // freezeTableName:true,
    // createdAt: false,
    // updatedAt: false,
    paranoid: true //从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间
  }
);

module.exports = User;
