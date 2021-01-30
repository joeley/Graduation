import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken';
import mutations from './mutations'
import actions from './action'


Vue.use(Vuex)

const state = {
  jwt:localStorage.getItem('token')||'',
  cartCount: 0, 
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters: {   
    userInfo (state) {   // "{"id":5,"username":"joe","phone":"15318118513","role":"admin","vip":6,"iat":1611832735,"exp":1611919135}"
      return jwt.decode(state.jwt)? jwt.decode(state.jwt):{}
    }
  }
})

