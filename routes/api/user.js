const express = require("express");
const router = express.Router();
const stuServ = require("../../services/userService");
const { asyncHandler } = require("../routeTool/getSendResult");
const jwt = require("../../util/jwt");

// localhost:5008/api/student?page=2&sex=1
router.post(
  "/login",
  asyncHandler(
    async (req, res) => {
      const { username, password } = req.body;
      if (username === undefined || password === undefined) {
        return null;
      }
      const stu = await stuServ.userLogin(req.body.username, req.body.password);
      if (stu === null) {
        return null;
      }
      jwt.publish(res, undefined, {
        id: stu.id,
        username: stu.username,
        phone: stu.phone,
        role: stu.role,
        vip: stu.vip,
      });
      return stu;
    },
    "登录成功",
    "登录失败,请确定有此账号"
  )
);

router.post(
  "/register",
  asyncHandler(
    async (req, res) => {
      const { username, password, phone} = req.body;
      if (username === undefined || password === undefined) {
        return null;
      }
      const stu = await stuServ.userRegister(username, password, phone||"");
      if (stu === null) {
        return null;
      }
      jwt.publish(res, undefined, {
        id: stu.id,
        username: stu.username,
        phone: stu.phone,
        role: stu.role,
        vip: stu.vip,
      });
      return stu;
    },
    "注册成功",
    "注册失败,请填写完整信息，也可能用户名已被占用"
  )
);

router.get(
  "/query",
  asyncHandler(
    async (req, res) => {
      return req.userId;
    },
    "成功",
    "失败"
  )
);

module.exports = router;
