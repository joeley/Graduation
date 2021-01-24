import axios from 'axios'
import request from '@/utils/request'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'


import {
  getAccessToken,
  getRefreshToken
} from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
  timeout: 10000
})
//拦截器 发送请求之前执行
service.interceptors.request.use(config => {
  if (getAccessToken()) {
    config.headers['Authorization'] = 'Bearer ' + getAccessToken()
  }
  return config
}, error => {
  Promise.reject(error)
})

//拦截器 响应请求之前执行
service.interceptors.response.use(res => 
  {
    const code = res.data.code || 200;
    const msg = res.data.message || '未知错误'
    if(code !== 200) {
      Notification.error({
        title: msg
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    if(error.response.status === 401){
      if (getRefreshToken() != '' && getAccessToken() != '') {
        return store.dispatch('RefreshToken')
        .then(() => {
          const newUrl = error.config.url.replace(error.config.baseURL, '');
          return request({
            url: newUrl,
            method: error.config.method,
            params: error.config.params,
            data: error.config.data
          })
        })
        .catch(()=>{
          return store.dispatch('LogOut').then(()=>{
            router.push({ path:'/login'})
          })
        })
      }else{
        Notification.error({
          title: msg
        })
        return Promise.reject('error')
      }
    }
    let {
      message
    } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
