const { Sequelize } = require("sequelize");
const { sqlLogger } = require("../logger");
const cls = require('continuation-local-storage'); // CLS模块 事务要用
const namespace = cls.createNamespace('joeley'); 
const settings = require("../settings")

// 要用事务必须启用cls
Sequelize.useCLS(namespace);   

const sequelize = new Sequelize(settings.mysqlDatabaseName, settings.mysqlDatabaseUser, settings.mysqlDatabasePassword, {
  host: "localhost",
  dialect: "mysql",
  logging: (msg) => {
    sqlLogger.debug(msg);
  },
});

module.exports = sequelize;
