
const express = require("express");
const router = express.Router();
const displayService = require("../../services/displayService");
const { asyncHandler } = require("../routeTool/getSendResult");


// localhost:5008/api/student?page=2&sex=1
router.get(
  "/main",
  asyncHandler(async (req, res) => {
    return await displayService.getDisplay("main");
  },"查询主推荐成功", "查询主推荐失败")
);
router.get(
  "/new",
  asyncHandler(async (req, res) => {
    return await displayService.getDisplay("new");
  },"查询新品成功", "查询新品失败")
);
router.get(
  "/swiper",
  asyncHandler(async (req, res) => {
    return await displayService.getDisplay("swiper");
  },"查询新品成功", "查询新品失败")
);
router.get(
  "/ads",
  asyncHandler(async (req, res) => {
    return await displayService.getDisplay("ads");
  },"查询广告推荐成功", "查询广告推荐失败")
);


module.exports = router;
