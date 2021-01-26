const Navigation = require("../models/moudules/Navigation");
const RMenu = require("../models/moudules/RMenu");
const Product = require("../models/moudules/Product");

const { Op } = require("sequelize");
const validate = require("validate.js");
const { pick } = require("../util/propertyHelper");
const { unnest } = require("../util/unnestHelper");
const { sortObj } = require("../util/sortHelper");
const { query } = require("../models/db");


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
            NavigationId:item.id
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
                  id:ele.ProductId
                }
              })
              .then((prod) => {
                prod.order = ele.order
                productList.push(pick(prod.dataValues, "productMainImage", "id", "productName", "order", "productPrice"))
              })
            )
          }
          return Promise.all(promiseArr).then(() => {
            return productList
          })
        }).then((res) => {
          item.productList = sortObj(res)
          navList.push(pick(item,"id","navName","order","productList"))
        }) 
      )
    }
    return Promise.all(promiseArr).then(() => {
      return  sortObj(navList)
    })
  }
} 
