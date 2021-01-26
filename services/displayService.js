const Display = require("../models/moudules/Display");
const { Op } = require("sequelize");
const validate = require("validate.js");
const moment = require("moment");
const { pick } = require("../util/propertyHelper");
const { sortObj } = require("../util/sortHelper")


exports.getDisplay = async function (type){
  const query =  await Display.findAll({
    where:{
      type
    }
  })
  if (query.length === 0 ){
    return null
  }else{
    const processedQuery =  query.map((ele)=>{
      return pick(ele.dataValues, "displaySrc", "order","ProductId")
    })
    return sortObj(processedQuery)
  }
} 
