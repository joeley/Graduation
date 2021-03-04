//setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//     app.use('/api',    // 指定需要转发的请求
//         createProxyMiddleware({
//             target: "https://www.baidu.com",   //指定转发的目标地址
//             changeOrigin: true,
//             pathRewrite: {
//                 "^/api": ""   // 字面意思是路径重写，其实就是把url地址中指定片段替换掉
//             }
//         }));
// }

module.exports = function (app) {
    app.use(
        '/admin', // 指定需要转发的请求
        createProxyMiddleware({
            target: 'http://localhost:5009',
            changeOrigin: 'true',
        })
    );
    app.use(
      '/picture', // 指定需要转发的请求
      createProxyMiddleware({
          target: 'http://localhost:5009',
          changeOrigin: 'true',
      })
  );
};
