const Product = require("../models/moudules/Product");
const { Op } = require("sequelize");
const validate = require("validate.js");
const moment = require("moment");
const { pick } = require("../util/propertyHelper");


// 后面在改 根据session推荐
exports.getRecommend = async function () {
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
exports.getFlag = async function (id) {
  if (!id){
    console.log("object1")
    return false
  }
  const query = await Product.findOne({
    where: {
      id: id
    }
  })
  if (!query || !query.dataValues) {
    return null
  } else {
    console.log("object")
    return query.dataValues.productFlag
  }
}

exports.getProductInfoById = async function (id) {
  const query = await Product.findOne({
    where: {
      id:id
    }
  })
  if (!query || !query.dataValues) {
    return null
  } else {
    return pick(
      query.dataValues,
      "id", 
      "productName", 
      "productPrice", 
      "productSubtitle",
      "productFlag",
      "productDescribe1",
      "productDescribe2",
      "productDescribe3",
      "productDescribe4",
      "productBg1",
      "productBg2",
      "productBg3",
      "productBg4",
      "galleryFlag",
      "galleryText",
      "galleryImg1",
      "galleryImg2",
      "galleryImg3",
      "galleryImg4",
      "galleryImg5",
      "videoFlag",
      "videoSrc",
      "videoCover",
      "videoMainTitleText1",
      "videoMainTitleText2",
      "videoSubheadText1",
      "videoSubheadText2"
    )
  }
}



exports.getDetailById = async function () {
  const query = await Product.findOne({
    where: {}
  })
  console.log(query)
  if (query.dataValues === undefined) {
    return null
  } else {
    return pick(
      query.dataValues,
      "id", 
      "productName", 
      "productPrice", 
      "productFlag",
      "detailImg1",
      "detailImg2",
      "detailImg3",
      "detailImg4"
    )
  }
}
