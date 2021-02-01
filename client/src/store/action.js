export default {
  saveCartCount(context, count){
    context.commit('saveCartCount', count);
  },
  saveJWT(context,jwt){
    localStorage.setItem("token", jwt);
    context.commit('saveJWT', jwt)
    if(!jwt){
      document.cookie = `token=token;path=/;max-age=-1`;
    }
  }

} 