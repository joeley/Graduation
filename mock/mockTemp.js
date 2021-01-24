const User = require("../models/moudules/User");
const result =[];
result.push(
  {
    username:"joe",
    phone:'15318118513',
    role:"admin", 
    password:"123",
    vip:6
  },
  {
    username:"admin",
    phone:'15318118513',
    role:"admin", 
    password:"123",
    vip:6
  }
)
User.bulkCreate(result);

