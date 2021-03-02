
const express = require("express");
const router = express.Router();
const navServ = require("../../services/navigationService");
const { asyncHandler } = require("../routeTool/getSendResult");



// 获取navigation下的商品信息
router.get(
  "/:navigationId",
  asyncHandler(async (req, res) => {
    if (req.params.navigationId === undefined ){
      return null
    }
    return await navServ.getNavigationProducts(req.params.navigationId);
  },"获取导航下的商品成功", "查询失败，没有此导航，请检查导航id是否填写正确")
)

// 查询全部navigation的简单信息
router.get(
  "/query/simple",
  asyncHandler(async (req, res) => {
    return await navServ.getNavigationSimple();
  },"获取全部导航的简单信息成功", "查询导航的简单信息失败")
)

// 放在"/:navigationId"路由前面
router.put(
  "/set",
  asyncHandler(async (req, res) => {
    if (!req.body.id || !req.body.navName){
      return null
    }
    return await navServ.setNavigation(req.body);
  },"修改导航成功", "删除失败课，可能没有此导航")
)

// 添加删除导航商品
router.put(
  "/:navigationId",
  asyncHandler(async (req, res) => {
    if (!req.params.navigationId  || !req.body.type ){
      return null
    }
    if(req.body.type !== "add" && req.body.type !== "decrease"){
      return null
    }
    if(req.body.list.length > 6){
      return null
    }
    return await navServ.setNavigationProducts(req.params.navigationId, req.body);

  },"给导航设置商品成功", "设置失败，每个导航添加的商品总个数不能超过6。不可删除导航里不存在的商品。")
)

router.post(
  "/",
  asyncHandler(async (req, res) => {
    if (!req.body.navName){
      return null
    }
    return await navServ.addNavigation(req.body);

  },"添加导航成功", "添加导航失败")
)

router.delete(
  "/:navigationId",
  asyncHandler(async (req, res) => {
    if (!req.params.navigationId){
      return null
    }
    return await navServ.deleteNavigation(req.params.navigationId);
  },"删除导航成功", "删除失败课，可能没有此导航")
)



module.exports = router;