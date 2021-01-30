const { getResult } = require("./getSendResult");
const { pathToRegexp } = require("path-to-regexp");
const jwt = require("../../util/jwt");
const settings = require("../../settings");



module.exports = (req, res, next) => {
  // /api/student/:id 和  /api/student/1771
  const apis = settings.needTokenApi.filter((api) => {
    const reg = pathToRegexp(api.path);
    return api.method === req.method && reg.test(req.path);
  });
  if (apis.length === 0) {
    next();
    return;
  }
  
  const result = jwt.verify(req);
  if (!result.msg) {
    //认证通过
    req.userId = result.id;
    next();
  } else {
    //认证失败
    res.send(getResult(null,2,result.msg))
  }
};