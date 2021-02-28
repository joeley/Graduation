const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({                            // 路径
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../public/upload"));   
  },
  filename: function (req, file, cb) {                          // 文件名
    // 时间戳-6位随机字符.文件后缀
    const timeStamp = Date.now();
    const ramdomStr = Math.random().toString(36).slice(-6);
    const ext = path.extname(file.originalname);
    const filename = `${timeStamp}-${ramdomStr}${ext}`;
    cb(null, filename);
  },
});


const upload = multer({
  storage,                                                  // 配置硬盘地址
  limits: {                                                 // 配置文件大小限制
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {                               // 过滤不符合条件的文件
    //验证文件后缀名
    const extname = path.extname(file.originalname);
    const whitelist = [".jpg", ".gif", ".png", ".jpeg", ".webp",".mp4"];
    if (whitelist.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error(`your ext name of ${extname} is not support`)); // 抛出错误
    }
  },
});


router.post("/", upload.single("img"), (req, res) => {    // 放入路由
  const url = `/upload/${req.file.filename}`;
  res.send({
    code: 0,
    msg: "",
    data: url,
  });
});

// router.post("/multi", upload.single("img"), (req, res) => {    // 放入路由
//   const url = `/upload/${req.file.filename}`;
//   res.send({
//     code: 0,
//     msg: "",
//     data: url,
//   });
// });

module.exports = router;  