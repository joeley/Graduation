// 处理错误的中间件
const getMsg = require("./getSendResult");
module.exports = (err, req, res, next) => {
  if (err) {
    const errMsg = err instanceof Error ? err.message : err;
    //发生了错误
    res.status(500).send(getMsg.getResult(null,500,errMsg));
  } else {
    next();
  }
};
