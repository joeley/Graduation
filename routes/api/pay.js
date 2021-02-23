
const express = require("express");
const router = express.Router();
const payService = require("../../services/payService")

const { asyncHandler } = require("../routeTool/getSendResult");

router.post(
  "/alipay",
  asyncHandler(async (req, res) => {
    if(!req.body.orderId){
      return null;
    }
    return  await payService.alipay(req.userId, req.body.orderId)
    // res.setHeader('Content-type','text/plain;charset=utf-8')
    // res.send(re)

  },"调取阿里支付系统成功","调取阿里支付系统失败，可能是订单不存在")
)

router.post(
  "/alipay/notify",
  async (req, res) => {
    const verify = await await payService.alipayNotify(req.body)
    res.send(verify)
  }
  // asyncHandler(async (req, res)=>{
  //   return await payService.alipayNotify(req.body)
  // })
)

router.post(
  "/test", async (req, res) =>{
    res.send(await payService.alipayQuery())
  }
)
// router.get(
//   "/",
//   asyncHandler(async (req, res) => {
//     return await orderService.getOrder(undefined, req.userId);
//   },"查到订单","查询订单失败")
// )

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     if (!req.params.id){
//       return null
//     }
//     return await orderService.getOrder(req.params.id, req.userId);
//   },"查到订单","查询订单失败")
// )

// router.xxx(
//   "/",
//   asyncHandler(async (req, res) => {
//     return await orderService.xxx()
//   },"xxx","xxx")
// )

module.exports = router;
