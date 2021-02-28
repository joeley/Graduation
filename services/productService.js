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
    return false
  }
  const query = await Product.findOne({
    where: {
      id: id
    },
    paranoid: false
  })
  if (!query || !query.dataValues) {
    return null
  } else {
    return query.dataValues.productFlag
  }
}

exports.getProductInfoById = async function (id) {
  const query = await Product.findOne({
    where: {
      id:id
    },
    paranoid: false
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
exports.getDetailById = async function (id) {
  const query = await Product.findOne({
    where: {
      id
    },
    paranoid: false
  })
  if (query.dataValues === undefined) {
    return null
  } else {
    return pick(
      query.dataValues,
      "id", 
      "productName", 
      "productSubtitle",
      "productPrice", 
      "productFlag",
      "detailImg1",
      "detailImg2",
      "detailImg3",
      "detailImg4"
    )
  }
}

exports.getProductAllById = async function (){
  const productArr = await Product.findAll({
    where:{},
    raw: true,
    order: [["createdAt", "ASC"]],
    paranoid: false
  })
  return productArr.map((ele)=>{
    const {
      productDescribe1,
      productDescribe2,
      productDescribe3,
      productDescribe4,
      productBg1,
      productBg2,
      productBg3,
      productBg4,
      galleryFlag,
      galleryText,
      galleryImg1,
      galleryImg2,
      galleryImg3,
      galleryImg4,
      galleryImg5,
      videoFlag,
      videoSrc,
      videoCover,
      videoMainTitleText1,
      videoMainTitleText2,
      videoSubheadText1,
      videoSubheadText2,
      deletedAt,
      createdAt, updatedAt, CategoryId, ...newEle
    } = ele
    newEle.productPage=[
      {
        productDescribe1,
        productDescribe2,
        productDescribe3,
        productDescribe4,
        productBg1,
        productBg2,
        productBg3,
        productBg4,
        galleryFlag,
        galleryText,
        galleryImg1,
        galleryImg2,
        galleryImg3,
        galleryImg4,
        galleryImg5,
        videoFlag,
        videoSrc,
        videoCover,
        videoMainTitleText1,
        videoMainTitleText2,
        videoSubheadText1,
        videoSubheadText2,
      }
    ].map((ele)=>{
      propArr = Object.keys(ele)
      ele.key = propArr[0]
      return ele
    })
    newEle.status = !deletedAt   // true 在售 false 下架
    return newEle
  })
  
}

exports.deleteProcuct =async function (id){
  const productEntity = await Product.findOne({
    where: {
      id: id
    }
  });
  if (productEntity !== null) {
    const res = await productEntity.destroy();
    return res.get();
  } else {
    return null;
  }
}
exports.addProcuct = async function(productInfo){
  const product = await Product.create(productInfo);
  return product
}