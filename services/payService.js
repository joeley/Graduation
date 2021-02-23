const settings = require('../settings')
const orderService = require("./orderService")
const sequelize = require("../models/db");
const Order = require("../models/moudules/Order");

const moment = require("moment");
const { pick } = require("../util/propertyHelper");
const { unnest } = require("../util/unnestHelper");
const { sortObj } = require("../util/sortHelper");
const User = require("../models/moudules/User");
const fs = require("fs");
const path = require("path");
const AliPaySDK = require("alipay-sdk").default;
const AliPayFormData = require("alipay-sdk/lib/form").default;

const alipaySdk = new AliPaySDK({
  gateway: "https://openapi.alipaydev.com/gateway.do",
  appId: "2021000117607776",
  privateKey: fs.readFileSync(path.resolve(__dirname, "../private-key.pem"), "ascii"),
  alipayPublicKey: fs.readFileSync(path.resolve(__dirname, "../public-key.pem"), "ascii"),
  timeout: 5000,
  signType:'RSA2',	
  charset:'utf-8'
});





exports.alipay = async (UserId, OrderId) => {
  const orderJson = await orderService.getOrder(OrderId, UserId)
  if (orderJson === null) {
    return null;
  }
  const user =  await User.findOne({
    where:{
      id:UserId
    },
    raw: true
  })

  const totalPrice = orderJson.totalPrice
  const formData = new AliPayFormData();
  formData.addField("notifyUrl", "joeley.cn/api/pay/alipay/notify");  // 通知地址
  formData.addField("returnUrl", settings.domain + "/order/list");  // 同步通知地址 
  formData.addField("bizContent", {
    productCode: "FAST_INSTANT_TRADE_PAY",  // 网页方式
    subject: user.username + " " + moment.utc().format("  YYYY.MM.DD HH:mm:ss") + "的订单" ,                    // 订单名
    totalAmount: totalPrice,                // 订单金额
    outTradeNo: OrderId                   // 订单号
  });
  let result = "";
  try {
    result = await alipaySdk.exec(
      "alipay.trade.page.pay",
      {},
      {
        formData
      }
    );
  } catch (err) {
    console.log(err);
  }
  return result;
}

exports.alipayNotify = async (params) => {
  const verify = alipaySdk.checkNotifySign(params);
  if(verify !== true){
    return "fail"
  }
  let upInfo = {};
  if(params.trade_status === "TRADE_SUCCESS"|| params.trade_status === "TRADE_FINISHED"){
    upInfo = {
      payStatus:1,
      payStatusDesc:"已支付",
      payAt:params.gmt_payment
    }
  }else if(params.trade_status === "TRADE_CLOSED"){
    upInfo = {
      payStatus:2,
      payStatusDesc:"交易关闭",
      closeAt:params.gmt_close || params.gmt_refund
    }
  }  
  return Order.update(upInfo,{
    where:{
      id:params.out_trade_no
    }
  }).then((res) =>{
    return "success"
  })
 
}

// exports.alipayQuery =  async() => {
//   const formData = new AliPayFormData();
//   // formData.addField("charset","utf-8");
//   formData.addField("bizContent",{
//     out_trade_no:"161406280232348643"
//   })
//    return alipaySdk.exec("alipay.trade.query",
//     {},
//     {formData}
//     ).then((res)=>{
//     console.log("我在查询")
//     return res
//   })

// }