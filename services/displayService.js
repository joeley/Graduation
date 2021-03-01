const Display = require("../models/moudules/Display");
const Product = require("../models/moudules/Product");
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

exports.getAdminDisplay = async (typeP,orderP)=>{
  const display = await Display.findOne({
    where:{
      type:typeP,
      order:orderP
    },
    include: [{ 
      model: Product
    }],
    raw: true
  })
  if(display  === null){
    return{
      type:undefined,
      displaySrc:undefined,
      order:0,
      productId:0,
      productName:undefined
    }
  }else{
    const {type, displaySrc, order, ProductId, "Product.productName":productName} = display
    return {type, displaySrc, order, ProductId,productName}
  }

}

exports.setAdminDisplay = async (type,order,displaySrc,ProductId)=>{
  const display = await Display.update({
    displaySrc,
    ProductId
  },{
    where: {
      type,
      order
    }
  })
  if(display[0] > 0){
    return display
  }else{
    return null
  }
}