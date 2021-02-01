module.exports = {
  port:5009,
  authorizationKey:"token",
  tokenSecrect:"joeley",
  domain:"http://localhost:8080",
  needTokenApi:[
    { method: "POST", path: "/api/student" },
    { method: "PUT", path: "/api/student/:id" },
    { method: "GET", path: "/api/admin/whoami" },
    { method: "GET", path: "/api/cart"}, // 不要写成"/api/cart/"
    { method: "POST", path: "/api/cart"}, 
    { method: "DELETE", path: "/api/cart/:id"}, 
    { method: "PUT", path: "/api/cart/selectAll"},
    { method: "PUT", path: "/api/cart/:id"},  
    { method: "POST", path: "/api/address"}, 
    { method: "GET", path: "/api/address"},  
    { method: "PUT", path: "/api/address/:id"},
    { method: "DELETE", path: "/api/address/:id"},
    { method: "POST", path: "/api/order"},
    { method: "GET", path: "/api/order"},
    { method: "GET", path: "/api/order/:id"},
    { method: "POST", path: "/api/pay/alipay"}
  ]
}