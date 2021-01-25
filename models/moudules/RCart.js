const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const User = require("./User")
const Product = require("./Product")

const RCart = sequelize.define(
  "RCart",
  {
    UserId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: User, 
        key: 'id'
      }  
    },
    ProductId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: Product, 
        key: 'id'
      }      
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    selected:{   // 是否已选择     
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    // freezeTableName:true,
    // createdAt: false,
    // updatedAt: false,
    paranoid: true //从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间
  }
);

module.exports = RCart;
