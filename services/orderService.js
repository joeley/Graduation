const Product = require("../models/moudules/Product");
const RCart = require("../models/moudules/RCart");
const User = require("../models/moudules/User");
const Order = require("../models/moudules/Order");
const RList = require("../models/moudules/RList");
const Address = require("../models/moudules/Address");

const sequelize = require("../models/db");
const moment = require("moment");
const { pick } = require("../util/propertyHelper");
const { unnest } = require("../util/unnestHelper");
const { sortObj } = require("../util/sortHelper");
const { raw } = require("express");

exports.generateOrder = async (UserId, AddressId)=>{
  if(!AddressId){
    return null
  }
  return sequelize.transaction(async t => { //开启事务
    const cartList = await RCart.findAll({  // 查询购物车里所有已选的商品
      where: {
        UserId,
        selected:true
      }
    })
    if(cartList.length === 0){
      throw new Error("购物车里没放商品")
    }

    const order =  await Order.create({       // 创建订单
      id:moment.utc()+Math.random().toString().slice(-5),  // 18位订单号
      UserId,
      AddressId,
      payType: 0,
      payTypeDesc:"未支付",
      payStatus:0,
      payStatusDesc:"未支付",
    },{ transaction: t })


    const promiseArr = [];
    for (const cart of cartList) {
      promiseArr.push(RList.create(     // 加入到list
        {
          OrderId:order.getDataValue("id"), 
          ProductId:cart.getDataValue("ProductId"),
          quantity:cart.getDataValue("quantity")
        },{ transaction: t }
      ).then(() => {
        return cartPromise = cart.destroy(  // 删除rlist里已经保存的购物车信息
          {
          },{transaction: t}
        );
      }))
    }
    return Promise.all(promiseArr).then(() => {
      return order.getDataValue("id")
    })
  }).then((res)=>{
    return exports.getOrder(res,UserId)
  }).catch(() => null)
}


// 不传OrderId 分页查询订单
// 传OrderId  查单一个订单
exports.getOrder = async (OrderId, UserId, page=1, limit=10) => {
  const orderEntityArr = OrderId ? [ 
    await Order.findOne({
      where: { 
        UserId,
        id: OrderId
      },
      include: [{ model: Product }]
    }) 
  ]  : await Order.findAll({
    where: { 
      UserId
    }, 
    include: [{ model: Product }],
    offset: limit * (page - 1),
    limit,
  })

  const ret = {}
  ret.count = await Order.count();;
  ret.page = page;
  ret.limit = limit;

  ret.orderList = [];
  const promiseArr = [];
 

  for (const orderEntity of orderEntityArr) {
    if(orderEntity === null){  return null  }
    const orderJson =  orderEntity.get()
    const orderReturn  = {}
    orderReturn.id = orderJson.id
    orderReturn.AddressId =  orderJson.AddressId
    orderReturn.payType =  orderJson.payType
    orderReturn.payTypeDesc =  orderJson.payTypeDesc
    orderReturn.payStatus =  orderJson.payStatus
    orderReturn.payStatusDesc =  orderJson.payStatusDesc
    orderReturn.payAt =   orderJson.payAt ? moment( orderJson.payAt).utc() :  orderJson.payAt
    orderReturn.createdAt =  orderJson.createdAt ? moment( orderJson.createdAt).utc() :  orderJson.createdAt
    orderReturn.closeAt =  orderJson.closeAt ? moment(orderJson.closeAt).utc() : orderJson.closeAt
    
    const addressPromise = Address.findOne({
      where: {
        id: orderJson.AddressId
      },
      paranoid: false
    }).then((addressEntity) =>{
      const addressJson = addressEntity.get();
      orderReturn.receiverName = addressJson.receiverName
      orderReturn.receiverMobile = addressJson.receiverMobile
      orderReturn.receiverProvince = addressJson.receiverProvince
      orderReturn.receiverCity = addressJson.receiverCity
      orderReturn.receiverDistrict = addressJson.receiverDistrict
      orderReturn.receiverAddress = addressJson.receiverAddress
      orderReturn.receiverZip = addressJson.receiverZip
      return ;
    })
    promiseArr.push(addressPromise)

    orderReturn.productList = []
    for (const productEntity of orderJson.Products||[]) {
      const productJson = productEntity.get()
      const productReturn = {}
      productReturn.id = productJson.id
      productReturn.productMainImage = productJson.productMainImage
      productReturn.productName = productJson.productName
      productReturn.productPrice = productJson.productPrice
      productReturn.productSubtitle = productJson.productSubtitle

      rlistJson = productJson.RList.get()
      productReturn.quantity = rlistJson.quantity 
      orderReturn.productList.push(productReturn)
    }
    orderReturn.totalPrice = +orderReturn.productList.reduce((total,crrent)=>{
      return total + crrent.quantity * crrent.productPrice
    },0).toFixed(2)
    ret.orderList.push(orderReturn)
  }

  return Promise.all(promiseArr).then(() => OrderId ? ret.orderList[0] : ret )
}


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