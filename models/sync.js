
module.exports = function(callback=()=>{}){
  require("./moudules/User")
  require("./moudules/Product");
  require("./moudules/Category");
  require("./moudules/RCart")
  require("./moudules/Order");
  require("./moudules/RList");
  require("./moudules/Navigation");
  require("./moudules/RMenu");
  require("./moudules/Display");

  const sequelize = require("./db");

  sequelize.sync({ force: true }).then(() => {    
    console.log("模型构建完成");
    callback()         // 同步模拟数据
  });
}