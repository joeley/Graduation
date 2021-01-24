const sequelize = require("../db");
const { DataTypes } = require("sequelize");
const Navigation = require("./Navigation")
const Product = require("./Product")

const RMenu = sequelize.define(
  "RMenu",
  {
    NavigationId: {
      type: DataTypes.INTEGER,
      references: {
        model: Navigation, 
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
    order:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    paranoid: true 
  }
);

module.exports = RMenu;
