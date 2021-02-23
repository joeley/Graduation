const sequelize = require("../db");
const { DataTypes } = require("sequelize");
//创建一个模型对象
const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.STRING, 
      primaryKey: true,
      autoIncrement:false
    },
    payType: {              // 支付类型 0 在线支付 1 线下支付
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payTypeDesc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payStatus:{            // 支付状态 0 未支付 1 已支付 2 交易关闭
      type: DataTypes.STRING,
      allowNull: false,
    },
    payStatusDesc:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    closeAt:{             // 关闭订单时间
      type: DataTypes.DATE,
      allowNull:true
    },
    payAt:{              // 支付时间
      type: DataTypes.DATE,
      allowNull:true
    }
  },
  {
    paranoid: true //从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间
  }
);

module.exports = Order;
