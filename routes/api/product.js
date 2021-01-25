
const express = require("express");
const router = express.Router();
const proServ = require("../../services/productService");
const { asyncHandler } = require("../routeTool/getSendResult");


router.get(
  "/recommend",
  asyncHandler(async (req, res) => {
    return await proServ.recommend();
  },"获取推荐商品列表成功", "获取推荐商品列表失败")
);


module.exports = router;
