<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MiUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="username" @click="loginOut">退出</a>
          <a href="javascript:;" v-if="username" @click="goToCart">我的订单</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="!username">注册</a>

          <a href="javascript:;" class="my-cart">
            <span class="icon-cart"></span>
            购物车{{cartCount?'('+cartCount+')':''}}
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li 
                  class="product" 
                  v-for="(item) of phoneList"
                  :key="item.id"
                >
                  <a :href="'/product/'+item.id" target="_blank">
                    <div class="pro-img">
                      <img
                        v-lazy="item.mainImage"
                        :alt="item.subtitle"
                        srcset
                      />
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price|currency}}</div>

                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
              </ul>
            
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword" id />
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  name: "nav-header",
  data(){
    return{
      phoneList:[]
    }
  },
  computed:{
    ...mapState(['username','cartCount']),
    // username(){
    //   return this.$store.state.username;
    // },
    // cartCount(){
    //   return this.$store.state.cartCount;
    // }
  },
  filters:{
    currency(val){
      if(!val)return '￥0.00';
      return '￥' + val.toFixed(2);
    }
  },
  methods:{
    ...mapActions(['saveUserName','saveCartCount']),
    getProductList(){
      this.axios.get('/products',{
        params:{
          categoryId:'100012', //手机类的编号
          // pageSize:6
        }
      }).then((res)=>{
          res.list.sort(()=>(Math.random()-0.5));
          if(res.list.length>6){  
            this.phoneList = res.list.slice(0,6);
          }
      })
    },
    goToCart(){
      this.$router.push("/cart");
    },
    login(){
      this.$router.push("/login");
    },
    loginOut(){
      this.axios.post('/user/logout').then(()=>{
        this.$message.success({
          message:'退出成功',
          center:true
        });
        this.$cookie.set("userId",'',{expires:'-1'});
        //this.$store.dispatch('saveUserName',res.username);
        this.saveUserName('');
        this.saveCartCount('');
      });
    }
  },
  mounted(){
    this.getProductList();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";

.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: hsl(0, 0%, 20%);
    color: #b0b0b0;
    a:hover {
      color: #ffffff !important;
    }
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        color: #fff;
        background-color: #ff6600;
        text-align: center;
        margin-right: 0;
        .icon-cart {
          @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png", contain);
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      height: 112px;
      position: relative;
      @include flex();
      .header-logo {
        display: inline-block;
        width: 55px;
        height: 55px;
        background-color: #ff6600;
        a {
          display: inline-block;
          width: 110px;
          height: 55px;
          &::before {
            content: "";
            @include bgImg(55px, 55px, "/imgs/mi-logo.png");
            transition: margin 0.2s;
          }
          &::after {
            content: "";
            @include bgImg(55px, 55px, "/imgs/mi-home.png");
            background-size: 55px;
          }
          &:hover::before {
            margin-left: -55px;
          }
        }
      }
      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          color: #333333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover{
            color: $colorA;
            .children {
              opacity: 1;
              height: 220px;
              border-top: 1px solid #e5e5e5;
            }
          }

          .children {
            opacity: 0;
            position: absolute;
            height: 0px;
            top: 112px;
            left: 0;
            width: 1226px;
            box-shadow: 0px 7px 6px 0px #0000001c;
            background-color: #ffffff;
            z-index: 10;
            overflow: hidden;
            transition: all .5s ease;
            .product {
              float: left;
              width: 16.6%;
              font-size: 12px;
              text-align: center;
              line-height: 12px;
              position: relative;
              a {
                display: inline-block;
                .pro-img {
                  height: 137px;
                  
                  img {
                    height: 111px;
                    margin-top: 26px;
                    width: auto;
                  }
                  
                }
                .pro-name {
                  font-weight: bold;
                  margin-top: 19px;
                  margin-bottom: 8px;
                  color: $colorB;
                }
                .pro-price {
                  color: $colorA;
                }
              }
              &::before {
                content: "";
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }              
              &:last-child::before{
                display: none;
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          @include flex();
          input {
            border: none;
            border-right: 1px solid #e0e0e0;
            box-sizing: border-box;
            width: 264px;

            height: 50px;
            padding: 0 14px;
          }
          a {
            @include bgImg(18px, 18px, "/imgs/icon-search.png");
            margin: 0 auto;
          }
        }
      }
    }
  }
}
</style>