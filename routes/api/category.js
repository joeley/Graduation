
const express = require("express");
const router = express.Router();
const cateServ = require("../../services/categoryService");
const { asyncHandler } = require("../routeTool/getSendResult");


router.get(
  "/",
  asyncHandler(async (req, res) => {
    return await cateServ.getCategory()
  },"获取商品分类成功", "获取商品分类失败")
);


module.exports = router;
