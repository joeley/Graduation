const sequelize = require("../db");
const { DataTypes } = require("sequelize");
//创建一个模型对象
const Display = sequelize.define(
  "Display",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displaySrc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    paranoid: true //从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间
  }
);

module.exports = Display;
