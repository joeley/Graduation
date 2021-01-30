const { Sequelize } = require("sequelize");
const { sqlLogger } = require("../logger");
const cls = require('continuation-local-storage'); // CLS模块 事务要用
const namespace = cls.createNamespace('joeley'); 

// 要用事务必须启用cls
Sequelize.useCLS(namespace);   

const sequelize = new Sequelize("xiaomi", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  logging: (msg) => {
    sqlLogger.debug(msg);
  },
});

module.exports = sequelize;
