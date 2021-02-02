const Product = require("../models/moudules/Product");
const RCart = require("../models/moudules/RCart");
const User = require("../models/moudules/User");
const sequelize = require("../models/db");
const moment = require("moment");
const { pick } = require("../util/propertyHelper");
const { unnest } = require("../util/unnestHelper");
const { sortObj } = require("../util/sortHelper");

// exports.addProduct1 = async function (UserId, ProductId, selected) {
//   const exist = await RCart.findOne({
//     where: {
//       UserId: UserId,
//       ProductId: ProductId
//     }
//   })
//   if (exist === null) {
//     const newCart = await RCart.create({
//       UserId: UserId,
//       ProductId: ProductId,
//       selected: selected,
//       quantity: 0
//     })
//     return newCart
//   } else {
//     const oldCart = await RCart.update(
//       {
//         quantity: exist.dataValues.quantity + 1,
//         selected: selected
//       }, {
//         where: {
//           UserId: UserId,
//           ProductId: ProductId
//         },
//       }
//     );
//     return oldCart
//   }

// }
exports.getCart = async function(UserId){
  const res =  await User.findOne({
    where: { 
      id: UserId  
    }, 
    include: [{ 
      model: Product
    }],
    
  })
  const cart = {}
  cart.productList = []
  for (const ele of res.get().Products||[]){
    const pro = ele.get()
    const rcart = pro.RCart.get()
    const product = {}
    product.id = pro.id
    product.productMainImage = pro.productMainImage
    product.productName = pro.productName
    product.productSubtitle = pro.productSubtitle
    product.productPrice = pro.productPrice
    product.productStock = pro.productStock
    product.quantity = rcart.quantity
    product.selected = rcart.selected
    // product.t = rcarres.createdAt
    product.timestamp = +moment.utc(rcart.createdAt)
    product.totalPrice = +(pro.productPrice * rcart.quantity).toFixed(2)
    cart.productList.push(product)
  }
  cart.productList.sort((crr,next) => next.timestamp - crr.timestamp)
  cart.selectedAll = cart.productList.every((ele)=>ele.selected===true) //可以用selectedNum、unSelectedNum化简
  cart.totalPrice = +cart.productList.reduce((total,crrent)=>{
    if(crrent.selected === true){
      return total + crrent.totalPrice
    }
    return total
  },0).toFixed(2)
  cart.totalNum = 0
  cart.selectedNum = 0 
  // cart.unSelectedNum = 0
  cart.productList.map((ele)=>{
    if(ele.selected === true){
      cart.selectedNum ++
    }
    cart.totalNum++
  }) 

  return cart
}

exports.addProduct = async function (UserId, ProductId, selected){
  const exist =  await RCart.findOrCreate({
    where: {
      UserId,
      ProductId
    },defaults:{
      UserId,
      ProductId,
      selected: selected||true,
      quantity: 1
    }
  })
  let [instance, res] = exist 
  if (!res){
    instance = selected ? await instance.update({
      "quantity":instance.getDataValue("quantity") + 1,
      selected: selected||true
    }) : await instance.update({
      "quantity":instance.getDataValue("quantity") + 1,
    })
  }
  // return instance.get()
  return exports.getCart(UserId)
}

exports.deleteProduct = async function(UserId,ProductId){
  const num  =  await RCart.destroy({
    where: {
      UserId,
      ProductId
    }
  })
  if(num > 0){
    return exports.getCart(UserId)
  }else{
    return null
  }
}
// 事务
exports.selectedAll = async function(UserId){
  const cart = await exports.getCart(UserId)

  const selected = !cart.selectedAll
  const res = await RCart.findAll({
    where: {
      UserId
    }
  })
  return sequelize.transaction(t => {
    const promiseArr = [];
    for (const ele of res) {  
      promiseArr.push(ele.update({ 
        selected:selected
      },{
        transaction: t
      }))
    }
    return Promise.all(promiseArr);
  }).then(() => exports.getCart(UserId)).catch(() => null)
}

exports.updateNum = async function(UserId,ProductId,quantity, selected=true) {
  return RCart.findOne({
    where: {
      UserId,
      ProductId
    }
  }).then((res) =>{
    return res.update({
      quantity, 
      selected
    })
  }).then(() => exports.getCart(UserId)).catch(() => null);
}

exports.getCartNum = async (UserId)=>{
  return RCart.count({
    where:{
      UserId,
    }
  });
}