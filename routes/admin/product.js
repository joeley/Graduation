
const express = require("express");
const router = express.Router();
const proServ = require("../../services/productService");
const { asyncHandler } = require("../routeTool/getSendResult");

// router.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     return await proServ.getProductInfoById(req.params.id);
//   },"获取商品详情成功", "获取商品详情失败")
// )

// 查询全部 将产品页折叠起来
router.get(
  "/query",
  asyncHandler(async (req, res) => {
    return await proServ.getProductAll()
  },"查询全部商品详细参数成功","查询全部商品详细参数失败")
)
router.delete(
  "/:id",
  asyncHandler(
    async (req, res) => {
      return await proServ.deleteProcuct(req.params.id);
    },
    "成功",
    "删除商品失败"
  )
);
router.post(
  "/",
  asyncHandler(
    async (req, res) => {
      return await proServ.addProcuct(req.body);
    },
    "恭喜你，商品已经上架",
    "添加商品失败，请检查字段是否填写完整"
  )
);

// 简略查询 只要id和商品名
router.get(
  "/query/simple",
  asyncHandler(async (req, res) => {
    return await proServ.getProductSimple()
  },"查询全部商品简略参数成功","查询全部商品简略参数失败")
)


module.exports = router;


