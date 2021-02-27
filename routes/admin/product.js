
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


router.get(
  "/query",
  asyncHandler(async (req, res) => {
    return await proServ.getProductAllById()
  })
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

module.exports = router;


