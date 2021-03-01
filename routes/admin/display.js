
const express = require("express");
const router = express.Router();
const displayService = require("../../services/displayService");
const { asyncHandler } = require("../routeTool/getSendResult");


// localhost:5008/api/student?page=2&sex=1
// router.get(
//   "/main",
//   asyncHandler(async (req, res) => {
//     return await displayService.getDisplay("main");
//   },"查询主推荐成功", "查询主推荐失败")
// );

// 接口统一走这个
router.get(
  "/", 
  asyncHandler(async (req,res) =>{
    if(!req.query.type && !req.query.order) {
      return null;
    }
    return await displayService.getAdminDisplay(req.query.type, req.query.order)
  },"查询展示位成功","查询展示位失败")
)
router.put(
  "/", 
  asyncHandler(async (req,res) =>{
    if(!req.body.type && !req.body.order && !req.body.displaySrc && !req.body.ProductId) {
      return null;
    }
    return await displayService.setAdminDisplay(req.body.type, req.body.order, req.body.displaySrc, req.body.ProductId)
  },"修改展示位成功","修改展示位失败，请检查是否正确传参")
)

module.exports = router;
