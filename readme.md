我的毕业设计

##表之间的关系
```javascript
Class.hasMany(Student);
Student.belongsTo(Class);

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

```

业务
code 0 成功
code 1 失败 
code 2 没权限 重新登录
