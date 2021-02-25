const jwt = require("jsonwebtoken");
const settings = require("../settings");

//颁发jwt
exports.publish = function (res, maxAge = 3600 * 24, info = {}) {
  const token = jwt.sign(info, settings.tokenSecrect, {
    expiresIn: maxAge,
  });
  //添加到cookie 只适用于浏览器
  res.cookie(settings.authorizationKey, token, {
    maxAge: maxAge * 1000,
    path: "/",
  });
  //添加其他传输 适用其他设备
  res.header(settings.authorizationKey, token);
};

exports.verify = function (req) {
  let token;
  token = req.cookies[settings.authorizationKey]; //cookie中没有
  if (!token) {
    //尝试中header中
    token = req.headers[settings.authorizationKey];
    if (!!token) {
      token = token.split(" ");
      token = token.length === 1 ? token[0] : token[1];
    }
    // authorization: bearer token
    if (!token || token == "null") {
      return { msg: "无权限访问，请登录" };
    }
  }
  try {
    const result = jwt.verify(token, settings.tokenSecrect);

    console.log(result);
    return result;
  } catch (err) {
    return { msg: "登录失效，请重新登录" };
  }
};
