const Mock = require("mockjs");
const result = Mock.mock({
  "datas|4-10": [
    {
      username: "@last",
      phone: /1\d{10}/,
      "role":'user',
      password:/\w{5,10}/,
      "vip|1":[0,1,2,3,4,5,6]
    }
  ],
}).datas;
const User = require("../models/moudules/User");
User.bulkCreate(result);

