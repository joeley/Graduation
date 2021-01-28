module.exports = {
  port:5009,
  needTokenApi:[
    { method: "POST", path: "/api/student" },
    { method: "PUT", path: "/api/student/:id" },
    { method: "GET", path: "/api/admin/whoami" },
  ]
}