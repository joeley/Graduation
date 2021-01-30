import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'

export default function(){
  const token = store.state.jwt;
  // axios.defaults.baseURL = '/api';  
  axios.defaults.timeout = 8000; 

  const service = axios.create({
    baseURL:"/api",
    timeout:8000,
    headers: {
      token: token?"bearer " + token:"",
    }
  })

  service.interceptors.response.use((response)=>{
    if (response.headers.token) {
      store.dispatch("saveJWT", response.headers.token)
    }
    const res = response.data;
    const path = location.pathname; 

    if(res.code == 0){              // 成功
      return res.data;
    }else if(res.code == 2){       //  没权限 403 放过来了 
      if(path =='/login') return;
      if(path !='/login'){
        Message.warning({
          message:res.msg,
          center:true
        });
        router.push("/login?redirect=" + path);
        // 这玩意跳转太慢了，还要刷新界面
        // window.location.href = "/login?redirect=" + path;             
      }
      return Promise.reject(res);
    }else{
      Message.warning({
        message:res.msg,
        center:true
      });
      return Promise.reject(res);
    }
  },(err) => {
    const res = err.response
    if(res.status === 403){
      // 这里用不上了
      // const path = location.pathname; 
      // if(path =='/login') return;
      // if(path !='/login'){
      //   Message.warning({
      //     message:res.data.msg,
      //     center:true
      //   });
      //   router.push("/login?redirect=" + path);
      //   // 这玩意跳转太慢了，还要刷新界面
      //   // window.location.href = "/login?redirect=" + path; 
      //   return Promise.reject(res);             
      // }     
    }else{
      let msg = res.data.msg||err.message;
      Message.error(msg);
      return Promise.reject(err);
    }
  })

  return service
}