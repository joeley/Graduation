const express = require("express");
const app = express();


// 映射public目录中的静态资源
const path = require("path");
const staticRoot = path.resolve(__dirname, "../public");
app.use(express.static(staticRoot));

// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));

// 解析 application/json 格式的请求体
app.use(express.json());
app.use(function(req, res,next){
  // console.log(req);
  console.log("a")
  next();
})

// 处理 api 的请求


// 把上面的路由抽离出来
app.use("/api/student", require("./api/student"));
app.use("/api/user", require("./api/user"));
app.use("/api/product", require("./api/product"))
app.use("/api/category", require("./api/category"))

// app.use("/api/book", require("./api/book"));
// app.use("/api/class", require("./api/class"));
// app.use("/api/admin", require("./api/admin"));

// 处理错误的中间件
app.use(require("./routeTool/errorMiddleware"));

const port = 5008;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
