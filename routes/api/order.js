
const express = require("express");
const router = express.Router();
const orderService = require("../../services/orderService");

const { asyncHandler } = require("../routeTool/getSendResult");

router.post(
  "/",
  asyncHandler(async (req, res) => {
    return await orderService.generateOrder(req.userId, req.body.AddressId)
  },"成功生成订单","订单生成失败，购物车里可能没有商品")
)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    if(req.query.page && req.query.limit){
      return await orderService.getOrder(undefined, req.userId, Number(req.query.page), Number(req.query.limit));
    }else{
      return await orderService.getOrder(undefined, req.userId);
    }
  },"查到订单","查询订单失败，可能没有此订单")
)

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    if (!req.params.id){
      return null
    }
    return await orderService.getOrder(req.params.id, req.userId);
  },"查到订单","查询订单失败")
)

module.exports = router;
