// 设置模型关系

const User = require("./moudules/User");
const Product = require("./moudules/Product");
const RCart = require("./moudules/RCart");
const Category = require("./moudules/Category");
const Address = require("./moudules/Address");
const Order = require("./moudules/Order");
const RList = require("./moudules/RList");
const Navigation = require("./moudules/Navigation");
const RMenu = require("./moudules/RMenu");
const Display = require("./moudules/Display");



Category.hasMany(Product);
Product.belongsTo(Category);


User.belongsToMany(Product, { through: 'RCart' });
Product.belongsToMany(User, { through: 'RCart' });

User.hasMany(Address);
Address.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Address.hasOne(Order);
Order.belongsTo(Address);

Order.belongsToMany(Product, { through: 'RList' });
Product.belongsToMany(Order, { through: 'RList' });

User.hasMany(Navigation);
Navigation.belongsTo(User);

Navigation.belongsToMany(Product, { through: 'RMenu' });
Product.belongsToMany(Navigation, { through: 'RMenu' });

Product.hasMany(Display);
Display.belongsTo(Product);


console.log("关系关联成功")
