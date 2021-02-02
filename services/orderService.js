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
