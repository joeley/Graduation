const User = require("../models/moudules/User");
const { Op } = require("sequelize");
const validate = require("validate.js");
const moment = require("moment");
const { pick } = require("../util/propertyHelper");



exports.userLogin = async function (username,password){
  const query =  await User.findOne({
    where:{
      username:username,
      password:password
    }
  })
  if (query === null ){
    return null
  }else{
    return pick(query.dataValues,"id", "username", "phone", "role", "vip")
  }
} 
