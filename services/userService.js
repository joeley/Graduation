const User = require("../models/moudules/User");
const { Op } = require("sequelize");
const validate = require("validate.js");
const moment = require("moment");
const { pick } = require("../util/propertyHelper");


exports.userLogin = async function (username,password){
  const query =  await User.findAll({
    where:{
      username:username,
      password:password
    }
  })
  if (query.length === 0 ){
    return null
  }else{
    return pick(query[0].dataValues,"username", "phone", "role", "vip")
  }
} 
