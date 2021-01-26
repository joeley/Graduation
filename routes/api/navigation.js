
const express = require("express");
const router = express.Router();
const navServ = require("../../services/navigationService");
const { asyncHandler } = require("../routeTool/getSendResult");


// localhost:5008/api/student?page=2&sex=1
router.get(
  "/",
  asyncHandler(async (req, res) => {
    return await navServ.getNavigation();
  },"导航获取成功", "导航获取失败")
);


module.exports = router;
