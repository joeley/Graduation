const path =  require('path');

module.exports = {
    devServer:{
      host:'localhost',
      port:8080,
      open:true,
      proxy:{
        '/api':{
          // target:'http://mall-pre.springboot.cn',
          target:'http://localhost:5009',
          changeOrigin:true,
          // pathRewrite:{
          //   '/api':''
          // }
        }
      }
    },
    outputDir: path.resolve(__dirname, "../public/")
  }