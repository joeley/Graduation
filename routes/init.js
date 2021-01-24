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


// 处理 api 的请求

// // 使用路由
// // 当访问基地址api/student后，对应操作
// const studentRouter = express.Router();
// studentRouter.get('/',(req, res)=>{
//   console.log("获取学生")
// })
// studentRouter.post("/",(req, res)=>{
//   console.log("添加学生")
// })
// studentRouter.put('/',(req, res)=>{
//   console.log("修改学生")
// })
// studentRouter.delete("/",(req, res)=>{
//   console.log("删除学生")
// })
// app.use("/api/student",studentRouter)


// 把上面的路由抽离出来
app.use("/api/student", require("./api/student"));
// app.use("/api/book", require("./api/book"));
// app.use("/api/class", require("./api/class"));
// app.use("/api/admin", require("./api/admin"));

// 处理错误的中间件
app.use(require("./errorMiddleware"));

const port = 5008;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
