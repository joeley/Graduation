const url = require("url");
const path = require("path");
const settings = require("../../settings");

module.exports = (req, res, next) => {
  const host = req.headers.host;  //获取本网站的主机名（包括端口号）
  let referer = req.headers.referer;
  // console.log("1referer "+ referer);// http://admin.joeley.cn/index
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
  // console.log("2referer " + referer); // admin.joeley.cn
  // console.log("host " + host)  // 127.0.0.1:5009
  // console.log(url.parse(settings.domain).host)
  if (referer && host !== referer && !referer.includes(url.parse(settings.domain).host)) {
    // console.log("没通过")
    res.status(404).end();
    // req.url = "/img/404/404.jpg"; // url rewrite
  }
  // console.log("通过了")
  next();
};