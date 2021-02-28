const { getResult } = require("./getSendResult");
const { pathToRegexp } = require("path-to-regexp");
const jwt = require("../../util/jwt");
const settings = require("../../settings");

module.exports = (req, res, next) => {
  const apis = settings.needTokenApi.filter((api) => {
    const reg = pathToRegexp(api.path);
    return api.method === req.method && reg.test(req.path);
  });

  // 开放管理员的登录api接口 
  if ((apis.length === 0 && !req.path.startsWith("/admin")) || req.path === "/admin/user/login") {
    next();
    return;
  }

  // 处理【非管理员登录api】的处理

  const result = jwt.verify(req);
  // 所有api必须通过认证
  if (!result.msg) {
    req.userId = result.id;

    // 验证是不是管理员的请求
    if (req.path.startsWith("/admin")) {
    // 是管理员
      // 验证admin身份
      if (result.role == "admin") {
      // 是admin
        // 放行
        next();
        return;
      } else {
      // 不是admin
        // 不放行
        res.send(getResult(null, 2, "无权限访问，请使用管理员账户登录"));
        return;
      }
    }else{
    // 不是管理员
      // 放行
      next();
    }

  } else {
  //认证失败
    // 不通过
    res.send(getResult(null, 2, result.msg));
    return;
  }
};
