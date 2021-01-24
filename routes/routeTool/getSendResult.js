// 中间件报错捕捉
exports.getErr = function (err = "server internal error", errCode = 500) {
  return {
    code: errCode,
    msg: err,
  };
};

// 暂时无用
exports.getResult = function (data,msg = "成功") {
  if(data === null){
    return {
      code: 1,
      msg
    }
  }
  return {
    code: 0,
    data
  };
};

exports.asyncHandler = (handler,succeedMsg,failMsg) => {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      if(!result){
        res.send({
          code: 1,
          msg:failMsg
        })
      }else{
        res.send({
          code: 0,
          data:result
        })
      }

    } catch (err) {
      next(err);
    }
  };
};
