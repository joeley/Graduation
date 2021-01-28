
const express = require("express");
const router = express.Router();
const stuServ = require("../../services/userService");
const { asyncHandler } = require("../routeTool/getSendResult");
const jwt = require("../../util/jwt");

// localhost:5008/api/student?page=2&sex=1
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const {username, password} = req.body
    if(!username && !password){
      return null
    }
    
    const stu = await stuServ.userLogin(req.body.username,req.body.password);
    jwt.publish(res, undefined, { 
      id: stu.id,
      username:stu.username, 
      phone:stu.phone,
      role:stu.role,
      vip:stu.vip,
    });
    return stu
  },"登录成功", "登录失败")
);


module.exports = router;
