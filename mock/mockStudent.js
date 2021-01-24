const Mock = require("mockjs");
const result = Mock.mock({
  "datas|3-5": [
    {
      name: "@cname",
      birthday: "@date",
      "sex|1-2": true,
      mobile: /1\d{10}/,
      //   location: "@city(true)",
      "ClassId|1-10": 0
    }
  ],
}).datas;
// console.log(result);
const Student = require("../models/moudules/Student");
Student.bulkCreate(result);

