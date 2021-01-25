const Product = require("../models/moudules/Product");
const { Op } = require("sequelize");
const validate = require("validate.js");
const moment = require("moment");
const { pick } = require("../util/propertyHelper");


// 后面在改 根据session推荐
exports.recommend = async function () {
  const query = await Product.findAll({
    where: {}
  })
  if (query.length === 0) {
    return null
  } else {
    return query.map(ele => {
      return pick(ele.dataValues, "id", "productName", "productMainImage", "productPrice", "productSubtitle", "tag", "tagColor")
    })
  }
}


