<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
    }
  },
  computed:{

  },

  components: {
    
  },
  mounted(){
    this.getUserInfo();
    this.getCartCount();
  },
  methods:{
    getUserInfo(){
      this.axios.get('/user').then((res)=>{
        this.$store.dispatch("saveUserName", res.username)
      })
    },
    getCartCount(){
      this.axios.get('/carts/products/sum').then((res)=>{
        this.$store.dispatch('saveCartCount', res)
      })
    }
  }
}
</script>

<style>
@import url('./assets/scss/reset.scss');
</style>
