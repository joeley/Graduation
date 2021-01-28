
const express = require("express");
const router = express.Router();
const proServ = require("../../services/productService");
const { asyncHandler } = require("../routeTool/getSendResult");


router.get(
  "/recommend",
  asyncHandler(async (req, res) => {
    return await proServ.getRecommend();
  },"获取推荐商品列表成功", "获取推荐商品列表失败")
);
router.get(
  "/flag/:id",
  asyncHandler(async (req, res) => {
    return await proServ.getFlag(req.params.id);
  },"获取商品展示锁成功", "获取商品展示锁失败")
)
router.get(
  "/detail/:id",
  asyncHandler(async (req, res) => {
    return await proServ.getDetailById(req.params.id);
  },"获取推荐商品列表成功", "获取推荐商品列表失败")
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    return await proServ.getProductInfoById(req.params.id);
  },"获取商品详情成功", "获取商品详情失败")
)

module.exports = router;
