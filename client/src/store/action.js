
export default {
  saveCartCount(context, count){
    context.commit('saveCartCount', count);
  },
  saveJWT(context,jwt){
    context.commit('saveUserInfo', jwt)
  }

} 