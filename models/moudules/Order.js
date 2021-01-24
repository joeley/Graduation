const sequelize = require("../db");
const { DataTypes } = require("sequelize");
//创建一个模型对象
const Order = sequelize.define(
  "Order",
  {
    paymentType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentTypeDesc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusDesc:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    paranoid: true //从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间
  }
);

module.exports = Order;
