import Vue from 'vue'
import store from './store'
import axios from './permission'
import router from './router/index'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'

import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/message.css'
import "./permission"

import App from './App.vue'

Vue.prototype.axios  = axios()

// Vue.use(VueAxios,axios);

// 图片懒加载模块配置
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
});
Vue.use(VueCookie);

// 挂载element的Message组件，可以直接调用
Vue.prototype.$message = Message;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

