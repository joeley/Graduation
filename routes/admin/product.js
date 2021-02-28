
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


module.exports = router;


