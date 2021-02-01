const sequelize = require("../db");
const { DataTypes } = require("sequelize");
//创建一个模型对象
const Address = sequelize.define(
  "Address",
  {
    receiverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverMobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverProvince: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverDistrict: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverZip: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    // freezeTableName:true,
    // createdAt: false,
    // updatedAt: false,
    paranoid: true //从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间
  }
);

module.exports = Address;
