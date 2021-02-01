
const express = require("express");
const router = express.Router();
const cartService = require("../../services/cartService");
const addressService = require("../../services/addressService");
const { asyncHandler } = require("../routeTool/getSendResult");


router.post(
  "/",
  asyncHandler(async (req, res)=>{
    return await addressService.addAddress(req.userId, req.body)
  },"成功添加地址","添加地址失败，请检查条件是否填全")
)

router.get(
  "/",
  asyncHandler(async (req, res) => {
    return await addressService.getAddress(req.userId);
  },"成功获取地址", "获取地址失败")
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    return await addressService.updateAddress(req.userId, req.params.id, req.body)
  },"更新地址成功","更新地址失败")
)

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    return await addressService.deleteAddress(req.userId, req.params.id)
  },"删除地址成功","删除失败")
)


module.exports = router;
