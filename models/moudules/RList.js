const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const Order = require("./Order")
const Product = require("./Product")
const RList = sequelize.define(
  "RList",
  {
    OrderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order, 
        key: 'id'
      }  
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product, 
        key: 'id'
      }      
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    createdAt: false,
    updatedAt: false,
    paranoid: true //从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间
  }
);

module.exports = RList;
