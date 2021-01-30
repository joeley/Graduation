module.exports = {
  port:5009,
  authorizationKey:"token",
  tokenSecrect:"joeley",
  needTokenApi:[
    { method: "POST", path: "/api/student" },
    { method: "PUT", path: "/api/student/:id" },
    { method: "GET", path: "/api/admin/whoami" },
    { method: "GET", path: "/api/cart"}, // 不要写成"/api/cart/"
    { method: "POST", path: "/api/cart"}, 
    { method: "DELETE", path: "/api/cart/:id"}, 
    { method: "PUT", path: "/api/cart/selectAll"},
    { method: "PUT", path: "/api/cart/:id"},  
  ]
}