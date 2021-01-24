module.exports = {
    devServer:{
      host:'localhost',
      port:8080,
      open:true,
      proxy:{
        '/api':{
          target:'http://mall-pre.springboot.cn',
          changeOrigin:true,
          pathRewrite:{
            '/api':''
          }
        }
      },
      outputDir: path.resolve(__dirname, "../public")
    }
  }