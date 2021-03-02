const url = require("url");
const path = require("path");
module.exports = (req, res, next) => {
  const host = req.headers.host;  //获取本网站的主机名（包括端口号）
  let referer = req.headers.referer;
  console.log(referer);
  // 只处理图片
  const extname = path.extname(req.path);
  const whitelist = [".jpg", ".gif", ".png", ".jpeg", ".webp",".mp4"];
  if (!whitelist.includes(extname)) {
    next();
    return;
  }
  if (referer) {
    referer = url.parse(referer).host;
  }
  console.log(referer);
  if (referer && host !== referer) {
    res.status(404).end();
    // req.url = "/img/404/404.jpg"; // url rewrite
  }
  next();
};