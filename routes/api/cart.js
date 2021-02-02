
const express = require("express");
const router = express.Router();
const cartService = require("../../services/cartService");
const { asyncHandler } = require("../routeTool/getSendResult");


router.get(
  "/",
  asyncHandler(async (req, res) => {
    return await cartService.getCart(req.userId);
  },"成功获取购物车", "获取购物车失败")
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const {ProductId, selected} = req.body
    if(ProductId === undefined){
      return null
    }
    return await cartService.addProduct(req.userId,ProductId,selected);
  },"成功添加到购物车", "添加到购物车失败")  
)

router.delete(
 "/:id",
 asyncHandler(async (req, res) => {
   if(req.params.id === undefined){
     return null
   }
  return await cartService.deleteProduct(req.userId, req.params.id);
 },"商品已从购物车里删除","购物车里没有该商品") 
)
router.put(
  "/selectAll",
  asyncHandler(async (req, res) => {
    return await cartService.selectedAll(req.userId)
  },"已进行 全选/全不选 操作","操作失败")
)
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const {quantity, selected} = req.body
    if(quantity <= 0 || parseFloat(quantity).toString() === "NaN"){
      return null
    }
    return await cartService.updateNum(req.userId, req.params.id, quantity, selected)
  },"修改购物车商品数量成功","至少保留一件商品")
) 

router.get(
  '/cartNum',
  asyncHandler(async (req, res) => {
    return await cartService.getCartNum(req.userId)
  }, "查询购物车商品数量成功", "查询购物车商品数量失败")
)

module.exports = router;
