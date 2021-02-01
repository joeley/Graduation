const settings = require('../settings')
const orderService = require("./orderService")
const sequelize = require("../models/db");
const moment = require("moment");
const { pick } = require("../util/propertyHelper");
const { unnest } = require("../util/unnestHelper");
const { sortObj } = require("../util/sortHelper");
const fs = require("fs");
const path = require("path");
const AliPaySDK = require("alipay-sdk").default;
const AliPayFormData = require("alipay-sdk/lib/form").default;


exports.alipay = async (UserId, OrderId) => {
  const orderJson = await orderService.getOrder(OrderId, UserId)
  if (orderJson === null) {
    return null;
  }
  const totalPrice = orderJson.totalPrice

  const alipaySdk = new AliPaySDK({
    gateway: "https://openapi.alipaydev.com/gateway.do",
    appId: "2021000117607776",
    privateKey: fs.readFileSync(path.resolve(__dirname, "../private-key.pem"), "ascii"),
    // alipayPublicKey:"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnyi0pgZtboMxWFEwF5JYBxAoWQ5UD0eqxKf0GO+EbyyZSaViMShoWwN4JBTEXL0UtpiMorHgMuZEfKx6mxpw7hJ8Tiihhugw7qx2dLBH6Qf//nA9fPK3TZYNRW/SDD7X/+MLudzni7EivseXs3qJzUEKqsEkzpFnquNT615H3XLy2f5yDg8SywlIPlCTVzM5JWAN51bFg+9aw10OAjRhs8PRsCmN3feZLEl4bhK58o8t+wA7MGZh1sJxjiDnMReYQFeq0fFxqnTFiwAbCXw2sKWI5HuMpfT0ewTZHe8Xv9t6/KrO9Nb+v1/3AIN2ilGeLd/SLwcKhPXHA5xlDgPrSwIDAQAB"
  });

  const formData = new AliPayFormData();
  formData.addField("notifyUrl", "joeley.cn");  // 通知地址
  formData.addField("returnUrl", settings.domain + "/order/list");  // 同步通知地址 
  formData.addField("bizContent", {
    productCode: "FAST_INSTANT_TRADE_PAY",  // 网页方式
    subject: "小米伪订单",                    // 订单名
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
