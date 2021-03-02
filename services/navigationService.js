const Navigation = require("../models/moudules/Navigation");
const RMenu = require("../models/moudules/RMenu");
const Product = require("../models/moudules/Product");
const sequelize = require("../models/db");

const { Op } = require("sequelize");
const validate = require("validate.js");
const { pick } = require("../util/propertyHelper");
const { unnest } = require("../util/unnestHelper");
// const { sortObj } = require("../util/sortHelper");


exports.getNavigation = async function (username, password) {
  let nav = await Navigation.findAll()
  nav = unnest(nav);
  if (nav.length === 0) {
    return null
  } else {
    const navList = [];
    const promiseArr = [];
    for (const item of nav) {
      promiseArr.push(
        RMenu.findAll({
          where: {
            NavigationId: item.id
          }
        })
          .then((menu) => {
            menu = unnest(menu)
            const productList = []
            const promiseArr = []
            for (const ele of menu) {
              promiseArr.push(
                Product.findOne({
                  where: {
                    id: ele.ProductId
                  }
                })
                  .then((prod) => {
                    // prod.order = ele.order
                    productList.push(pick(prod.dataValues, "productMainImage", "id", "productName", "productPrice"))
                  })
              )
            }
            return Promise.all(promiseArr).then(() => {
              return productList
            })
          }).then((res) => {
            item.productList = res
            navList.push(pick(item, "id", "navName", "order", "productList"))
          })
      )
    }
    return Promise.all(promiseArr).then(() => {
      return navList
    })
  }
}

exports.getNavigationProducts = async (id) => {
  // 验证存在性
  const flag = await Navigation.findOne({
    where: {
      id
    },
    raw: true
  })
  if (flag === null) {
    return null
  }
  // 取到商品
  const Info = await Navigation.findAll({
    where: {
      id
    },
    include: [{
      model: Product
    }],
    raw: true
  })

  return Info.map(ele => ({
    id: ele["Products.id"],
    productName: ele["Products.productName"]
  }))
}

exports.setNavigationProducts = async (id, { type, list }) => {
  if (type === "add") {
    const count =  await RMenu.count({
      where:{
        NavigationId:id
      }
    })
    // 总和不能超过6
    if(count + list.length > 6){
      return null
    }
    return sequelize.transaction(t => {
      const promiseArr = [];
      for (const proId of list) {
        promiseArr.push(
          RMenu.create({
            NavigationId:id,
            ProductId: proId
          }, {
            transaction: t
          })
        )
      }
      return Promise.all(promiseArr);
    }).then(() => "success").catch(() => null)
  }else{
    return sequelize.transaction(t => {
      const promiseArr = [];
      for (const proId of list) {
        promiseArr.push(
          RMenu.destroy({
            where:{
              NavigationId:id,
              ProductId: proId
            }
          }, {
            transaction: t
          })
        )
      }
      return Promise.all(promiseArr);
    }).then(() => "success").catch(() => null)
  }
}

exports.getNavigationSimple = async()=>{
  const navigationArr = await Navigation.findAll({
    raw:true,
    order: [['createdAt', 'ASC']]
  })
  return navigationArr.map((ele)=>{
    const { createdAt, updatedAt, UserId, ...arg } = ele
    return arg
  })
}

exports.deleteNavigation = async(id)=>{
  return Navigation.destroy({
    where: {
      id
    },
    raw: true
  }).then((ele) => {
    if(ele>0){
      return ele      
    }
    return null
  }).catch(() => {
    return null
  })


  const navigationArr = await Navigation.findAll({
    raw:true,
    order: [['createdAt', 'ASC']]
  })
  return navigationArr.map((ele)=>{
    const { createdAt, updatedAt, UserId, ...arg } = ele
    return arg
  })
}

exports.setNavigation = async({id,navName})=>{
  return Navigation.update({
    navName
  },{
    where:{
      id
    }
  }).then(([res]) =>{
    if(res>0){
      console.log(res)
      return "success"
    }
    return null
  }).catch(() => null)
}

exports.addNavigation = async({navName})=>{
  console.log(11111111111);
  return Navigation.create({
    navName
  }).then((res) =>{
    return res
  }).catch(() => null)
}