<template>
  <div class="login">
    <div class="login-header">
      <div class="container">
        <router-link to="/index">
          <img src="/imgs/login-logo.png" alt="">
        </router-link>
      </div>
    </div>
    <div class="login-body">
      <div class="container">
        <div class="login-form">
          <h3>
            <span :class="{checked:type}" @click="toggleLogin">帐号登录</span><span class="sep-line">|</span><span :class="{checked:!type}" @click="toggleRegister">快捷注册</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="input" v-show="!type">
            <input type="text" placeholder="请输入手机号" v-model="phone">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="submit">{{type ? "登录" : "注册"}}</a>
          </div>
          <div class="tips">
            <div class="sms" @click="noDone">手机短信登录/注册</div>
            <div class="reg"><span @click="noDone">扫码登录</span><span>|</span><span @click="noDone">忘记密码？</span></div>
          </div>
          <div class="info">
            <div>账号可自行注册</div>
            <div class="account">测试账号:guest 密码:123</div>
          </div>
        </div>
      </div>
    </div>
    
    <login-footer footerType='2'></login-footer>

  </div>
  
</template>
<script>
import { mapActions } from 'vuex';
import LoginFooter from '../components/NavFooter'
export default {
  name: 'login',
  data(){
    return {
      username:'',
      password:'',
      phone:'',
      userId:'',
      redirect:"",
      type:true, // true:login false register
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods:{
    submit(){
      this.type ? this.login() : this.register()
    },
    login(){
      let { username,password } = this;
      this.axios.post('/user/login',{
        username,
        password
      }).then(()=>{
        // this.saveUserName(res.username);

        // console.log("拉取product数量")
        this.axios.get('/cart/cartNum').then((res)=>{
          this.$store.dispatch('saveCartCount', res)
        });
        // this.axios.get('/carts/products/sum').then((res)=>{
        //   this.$store.dispatch('saveCartCount', res)
        // });
        this.$router.push({ path: this.redirect || "/" });
        // console.log(window.location.search.replace("?redirect="))
        // this.$router.push({ path: window.location.search.replace("?redirect=","") || "/" });
      })
    },
    ...mapActions(['saveCartCount']),
    register(){
      let { username,password, phone } = this;
      this.axios.post('/user/register',{
        username,
        password,
        phone
      }).then(()=>{
        // this.saveUserName(res.username);
        this.$message.success("注册成功，已为你登录")
        // console.log("拉取product数量")
        this.axios.get('/cart/cartNum').then((res)=>{
          this.$store.dispatch('saveCartCount', res)
        });
        // this.axios.get('/carts/products/sum').then((res)=>{
        //   this.$store.dispatch('saveCartCount', res)
        // });
        this.$router.push({ path: this.redirect || "/" });
        // console.log(window.location.search.replace("?redirect="))
        // this.$router.push({ path: window.location.search.replace("?redirect=","") || "/" });
      })
    },
    noDone(){
      this.$message.error('这个功能没做，以后有空再说吧，你可以注册登录')
    },
    toggleRegister(){
      this.type = false
    },
    toggleLogin(){
      this.type = true
    }

  },
  components: {
    LoginFooter
  },
}
</script>
<style lang="scss" scoped>

.login{
  .login-header{
    .container{
      margin: 0 auto;
      width: 1130px;
      a{
        display: inline-block;
      }
      img{
        width:auto;
        height:100%;
      }
    }
  }
  .login-body{
    background:url('/imgs/login-bg.jpg') no-repeat center;
    background-size: cover;
    .container{
      height:576px;
      width: 1130px;
      margin: 0 auto;
      position: relative;
      .login-form{
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width:410px;
        height:510px;
        background-color:#ffffff;
        position:absolute;
        bottom:29px;
        right:0;
        h3{
          line-height:24px;
          font-size:24px;
          text-align:center;
          margin:40px auto 49px;
          font-weight:normal;
          .checked{
            color:#FF6600;
          }
          .sep-line{
            margin:0 32px;
          }
        }
        .input{
          display:inline-block;
          width:348px;
          height:50px;
          border:1px solid #E5E5E5;
          margin-bottom:20px;
          input{
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
            box-sizing: border-box;
            font-size: 14px;
          }
        }
        .btn{
          width:100%;
          line-height:50px;
          margin-top:10px;
          font-size:16px;
        }
        .tips{
          margin-top:14px;
          display:flex;
          justify-content:space-between;
          font-size:14px;
          cursor:pointer;
          .sms{
            color:#FF6600;
          }
          .reg{
            color:#999999;
            span{
              margin:0 7px;
            }
          }
        }
        .info{
          text-align: center; 
          position:absolute;
          bottom:0px;
          left:0px;
          right: 0px;
          .account{
            color:darkslateblue
          }
        }
      }
    }
  }
}
</style>