const express = require("express");
const router = express.Router();
const stuServ = require("../../services/userService");
const { asyncHandler } = require("../routeTool/getSendResult");
const jwt = require("../../util/jwt");

router.post(
  "/login",
  asyncHandler(
    async (req, res) => {
      const { username, password } = req.body;
      if (username === undefined || password === undefined) {
        return null;
      }
      const stu = await stuServ.adminLogin(
        req.body.username,
        req.body.password
      );

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
    "无该账号，或者账号权限不够"
  )
);

router.get(
  "/query",
  asyncHandler(
    async (req, res) => {
      return await stuServ.query(1000000, 1);
    },
    "成功",
    "查询成功"
  )
);

router.delete(
  "/:id",
  asyncHandler(
    async (req, res) => {
      return await stuServ.delete(req.params.id);
    },
    "成功",
    "不能删除admin权限用户，或者检查自己是否是admin用户"
  )
);

module.exports = router;
