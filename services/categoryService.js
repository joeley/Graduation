const Category = require("../models/moudules/Category");
const Product = require("../models/moudules/Product");
const { Op } = require("sequelize");
const validate = require("validate.js");
const moment = require("moment");
const { pick } = require("../util/propertyHelper");
const { sortObj } = require("../util/sortHelper")



exports.getCategory = async function () {
  const query = await Category.findAll({
    where: {}
  })
  if (query.length === 0) {
    return null
  } else {
    const promArr = [];
    for (let i = 0; i < query.length; i++) {
      const ele = query[i];
      const tempPromise = (async () => {
        const nav = await Product.findAll({
          where: {
            CategoryId: ele.dataValues.id
          }
        })
        const ProcessedNav = nav.map((yu) => {
          return pick(yu.dataValues, "id", "productMainImage", "productName", "order")
        })
        ele.dataValues.productList = sortObj(ProcessedNav)
      })()
      tempPromise.then(() => {
        query[i]  = pick(ele.dataValues, "describe", "id", "order", "productList")
      })
      promArr.push(tempPromise);
    }
    return Promise.all(promArr).then(() => {
      return sortObj(query)
    })

  }
} 

exports.getCategoryOnly = async () =>{
  const categoryJson = await Category.findAll({
    where: {},
    raw: true
  })
  return categoryJson.map(category=>{
    const {order, createdAt, updatedAt, ...newCategory } = category
    return newCategory
  })
}