// 中间件报错捕捉
// 报错时直接调用
exports.getResult = function (data=null, code=1, msg = "服务器发生错误") {
  if(data === null){
    return {
      code,
      msg
    }
  }
  return {
    code,
    msg,
    data
  };
};

exports.asyncHandler = (handler,succeedMsg,failMsg) => {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      if(result === null){
        res.send({
          code: 1,
          msg:failMsg
        })
      }else{
        res.send({
          code: 0,
          msg:succeedMsg,
          data:result
        })
      }

    } catch (err) {
      next(err);
    }
  };
};
