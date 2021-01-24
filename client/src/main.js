import Vue from 'vue'
import store from './store'
import axios from 'axios'
import router from './router/index'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'

import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/message.css'

import App from './App.vue'


Vue.use(VueAxios,axios);

// 图片懒加载模块配置
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
});
Vue.use(VueCookie);

// 挂载element的Message组件，可以直接调用
Vue.prototype.$message = Message;



axios.defaults.baseURL = '/api';  
axios.defaults.timeout = 8000; 
axios.interceptors.response.use(function(response){
  const path = location.pathname; 
  let res = response.data;
  if(res.status == 0){              // 成功
    return res.data;
  }else if(res.status == 10){       // 没权限
    if(path =='/login') return;
    if(path !='/index'){
      window.location.href = "/login";              
    }
    // window.location.href = '/#/login';
    // 这里的this取不到，所以不可以用this.$route.push
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

