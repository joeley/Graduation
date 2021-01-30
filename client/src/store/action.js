import Vue from 'vue'
export default {
  saveCartCount(context, count){
    context.commit('saveCartCount', count);
  },
  saveJWT(context,jwt){

    localStorage.setItem("token", jwt);
    context.commit('saveJWT', jwt)
    if(!jwt){
      Vue.$cookie.delete("token");
    }
  }

} 