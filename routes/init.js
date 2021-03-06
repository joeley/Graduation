const settings = require("../settings");
const express = require("express");
const app = express();

const path = require("path");

// 图片防盗
app.use("/picture", require("./routeTool/imgProtectMid"))

// 映射public目录中的静态资源
const staticRoot = path.resolve(__dirname, "../public");
app.use("/picture",
  express.static(staticRoot, {
    setHeaders(res, path) {
      if (!path.endsWith(".html")) {
        res.header("Cache-Control", `max-age=${3600*24*365}`);
      }
    },
  })
);


// 解析 application/x-www-form-urlencoded 格式的请求体
// app.use(express.urlencoded({ extended: true }));

// 解析 application/json 格式的请求体
app.use(express.json());
app.use(function (req, res, next) {
  console.count();
  next();
});

app.use(require("cookie-parser")());

// 处理 api 的请求
app.use(require("./routeTool/tokenMiddleware"));

// 把上面的路由抽离出来
app.use("/api/user", require("./api/user"));
app.use("/admin/user", require("./admin/user"));

app.use("/api/product", require("./api/product"));
app.use("/admin/product", require("./admin/product"));

app.use("/api/category", require("./api/category"));
app.use("/admin/category", require("./admin/category"));

app.use("/api/display", require("./api/display"));
app.use("/admin/display", require("./admin/display"));

app.use("/api/navigation", require("./api/navigation"));
app.use("/admin/navigation", require("./admin/navigation"));

app.use("/api/cart", require("./api/cart"));
app.use("/api/address", require("./api/address"));
app.use("/api/order", require("./api/order"));
// app.use(function (req, res, next){
//   if (req.url === '/api/pay/alipay/notify') {
//     req.headers['content-type'] = 'application/x-www-form-urlencoded';
//   }
//   next();
// });
app.use("/api/pay", require("./api/pay"));

app.use("/admin/upload", require("./admin/upload"))
app.use("/admin/dashboard", require("./admin/dashboard"))

// 处理错误的中间件
app.use(require("./routeTool/errorMiddleware"));

app.listen(settings.port, () => {
  console.log(`服务器启动\n开始监听 ${settings.port}`);
});
