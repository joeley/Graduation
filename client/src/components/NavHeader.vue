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
          <a href="javascript:;" v-if="userInfo.username">{{userInfo.username}}</a>
          <a href="javascript:;" v-if="userInfo.username" @click="loginOut">退出</a>
          <a href="javascript:;" v-if="userInfo.username" @click="goToCart">我的订单</a>
          <a href="javascript:;" v-if="!userInfo.username" @click="login">登录</a>
          <a href="javascript:;" v-if="!userInfo.username">注册</a>

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
          <div class="item-menu" v-for="(item) of navigationList" :key="item.id">
            <span> {{ item.navName }}</span>
            <div class="children">
              <ul>
                <li 
                  class="product" 
                  v-for="(ele,i) of item.productList" :key="i"
                >
                  <a :href="'/product/'+ele.id" target="_blank">
                    <div class="pro-img">
                      <img
                        v-lazy="ele.productMainImage"
                        :alt="ele.productSubtitle"
                        srcset
                      />
                    </div>
                    <div class="pro-name">{{ele.productName}}</div>
                    <div class="pro-price">{{ele.productPrice|currency}}</div>
                  </a>
                </li>
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
import {mapState,mapActions,mapGetters} from 'vuex'
export default {
  name: "nav-header",
  data(){
    return{
      phoneList:[],
      navigationList:[],
    }
  },
  computed:{
    ...mapState(['jwt','cartCount']),
    ...mapGetters(['userInfo'])

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
      return '￥' + val;
    }
  },
  methods:{
    getNavigation(){
      this.axios.get("/navigation").then((res)=>{
        this.navigationList = res
      })
    },
    ...mapActions(['saveUserName','saveCartCount']),
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
    this.getNavigation();
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