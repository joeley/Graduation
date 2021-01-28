import axios from 'axios'
import { Message } from 'element-ui'
import jwt from 'jsonwebtoken';

export default function(){
  const token = localStorage.getItem("token");
  // axios.defaults.baseURL = '/api';  
  axios.defaults.timeout = 8000; 

  const service = axios.create({
    baseURL:"/api",
    timeout:8000,
    headers: {
      authorization: "bearer " + token,
    }
  })

  // service.interceptors.request.use(config => {
  //   if (getAccessToken()) {
  //     config.headers['Authorization'] = 'Bearer ' + getAccessToken()
  //   }
  //   return config
  // }, error => {
  //   Promise.reject(error)
  // })

  service.interceptors.response.use(function(response){
    const path = location.pathname; 
    if (response.headers.authorization) {
      localStorage.setItem("token", response.headers.authorization);
      const str = jwt.decode(response.headers.authorization)
      console.log(str)
    }
    let res = response.data;

    if(res.code == 0){              // 成功
      return res.data;
    }else if(res.code == 2){       // 没权限
      if(path =='/login') return;
      if(path !='/login'){
        Message.warning({
          message:"此操作需要登录",
          center:true
        });
        window.location.href = "/login?redirect=" + path;              
      }
      return Promise.reject(res);
    }else{
      Message.warning({
        message:res.msg,
        center:true
      });
      return Promise.reject(res);
    }
  },(error) => {
    let res = error.response;
    Message.error(res.data.message);
    return Promise.reject(error);
  })

  return service
}