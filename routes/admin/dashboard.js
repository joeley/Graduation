const express = require("express");
const router = express.Router();
const orderService = require("../../services/orderService")
const { asyncHandler } = require("../routeTool/getSendResult");
const moment = require("moment");


// 总订单量
router.get(
  "/allcount",
  asyncHandler(async (req, res) => {
    return await orderService.getAllCount()
  },"获取订单总量成功", "获取订单总量失败")
);

// 总成交量
router.get(
  "/payedcount",
  asyncHandler(async (req, res) => {
    return await orderService.getPayedCount()
  },"获取总成交量成功", "获取总成交量失败")
);

// 总成交额
router.get(
  "/turnover",
  asyncHandler(async (req, res) => {
    return await orderService.getTurnover()
  },"获取总成交额成功", "获取总成交额失败")
);

// 建站天数
router.get(
  "/establish",
  asyncHandler(async (req, res) => {
    return moment().utc().diff(moment('2021-01-24'), 'days')
  },"获取总成交额成功", "获取总成交额失败")
);



module.exports = router;
