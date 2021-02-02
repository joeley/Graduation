<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item" v-for="(item,i) in categoryList" :key=i>
              <a href="javascript:;">{{item.describe}}</a>
              <div class="children">
                <div v-for="(ele,j) in item.productList" :key="j">
                  <a :href="'/product/'+ele.id">
                    <img v-lazy="ele.productMainImage" alt />
                    {{ele.productName}}
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <swiper v-bind:options="swiperOption" v-if="swiperList[0]!=undefined">
          <swiper-slide v-for="(item, index) in swiperList" :key="index">
            <a :href="'/product/'+item.ProductId">
              <!-- 边界图处理 -->
              <img :src="item.displaySrc"  v-show="index == 0 || index == swiperList.length-1"/>  
              <img v-lazy="item.displaySrc" alt="" v-show="index !== 0 && index !== swiperList.length-1">
            </a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>

      <div class="ads-box">
        <a :href="'/product/'+item.ProductId" v-for="(item,index) in adsList" :key="index">
          <img v-lazy="item.displaySrc" alt />
        </a>
      </div>

      <div class="banner">
        <a :href="'/product/' + newRecommend[0].ProductId"  v-if="!!newRecommend[0] && !! newRecommend[0].ProductId">
          <img v-lazy="newRecommend[0].displaySrc" alt />
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>推荐</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a :href="'/product/' + mainRecommend[0].ProductId" v-if="!!mainRecommend[0] && mainRecommend[0].ProductId">
              <img v-lazy="mainRecommend[0].displaySrc" alt />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr,i) in recommendList" :key="i" >
              <div class="item" v-for="(item,j) in arr" v-bind:key="j" @click="goProduct(item.id)">
                <span  :style="{
                  backgroundColor:item.tagColor
                }">{{ item.tag }}</span>
                <div class="item-img">
                  <img v-lazy="item.productMainImage" alt />
                </div> 
                <div class="item-info">
                  <h3>{{item.productName}}</h3>
                  <p>{{item.productSubtitle}}</p>
                  <p class="price" @click.stop="addCart(item.id)">{{item.productPrice}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal 
      :showModal="showModal" 
      title="测试" 
      sureText="查看购物车" 
      btnType="3" 
      modalType="middle"
      @modalSubmit="goToCart"
      @cancelModalSubmit="closeModal"
      @closeModal="closeModal"
     >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>

    <service-bar></service-bar>
  </div>
</template>
<script>
import ServiceBar from "../components/ServiceBar";
import Modal from "../components/Modal";

import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

export default {
  name: "index",
  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: "cube",
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      categoryList:[],
      swiperList:[],
      adsList: [],
      recommendList: [],
      mainRecommend:[],
      newRecommend:[],
      showModal: false,
    };
  },
  components: {
    ServiceBar,
    swiper,
    swiperSlide,
    Modal,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getSwiper();
      this.getCategory();
      this.getRecommend();
      this.getAds();
      this.getMainRecommend();
      this.getNewRecommend();
    },
    getAds(){
      this.axios.get("/display/ads").then((res)=>{
        this.adsList = res
      })
    },
    getSwiper(){
      this.axios.get("/display/swiper").then((res)=>{
        this.swiperList = res
      })
    },
    getMainRecommend(){
      this.axios.get("/display/main").then((res)=>{
        this.mainRecommend = res;
      })
    },
    getNewRecommend(){
      this.axios.get("/display/new").then((res)=>{
        this.newRecommend = res;
      })
    },
    getRecommend(){
      this.axios.get("/product/recommend").then((res) => {
          this.recommendList = [res.slice(0,4), res.slice(4, 8)];
      })
    },
    getCategory(){
      this.axios.get("/category/").then((res) => {
        this.categoryList = res
      })
    },
    goToCart() {
      this.$router.push("/cart");
    },
    closeModal(){
      this.showModal=false;
    },
    addCart(id) {
      // this.showModal = true;
      // this.$store.dispatch("saveCartCount", ++this.$store.state.cartCount)
      this.axios
        .post("/cart", {
          ProductId: id, 
          selected: true
        })
        .then((res) => {
          this.showModal = true;
          this.$store.dispatch("saveCartCount", res.totalNum)
          
        })
        .catch((res) => {
          // this.showModal = true;
          console.log(res);
          console.log(id)
        });
    },
    goProduct(id){
      this.$router.push('/product/' + id)
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/base.scss";
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.index {
  .swiper-box {
    height:451px;
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      background-color: #55585a7a;
      box-sizing: border-box;
      .menu-wrap {
        .menu-item {
          // 这里用opacity 字体也会透明，所以不要用
          // 用背景色，自己在Chrome调试
          height: 50px;
          line-height: 50px;
          // text-align: center;
          > a {
            font-size: 16px;
            color: #ffffff;
            padding-left: 40px;
            position: relative;
            display: block;
            &::after {
              content: "";
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
              position: absolute;
              right: 30px;
              top: 17.5px;
            }
            &:hover {
              background-color: $colorA;
            }
          }
          &:hover {
            .children {
              display: flex;
            }
          }
          .children {
            display: none;
            width: 962px;
            height: 451px;
            background-color: $colorG;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid $colorH;
            flex-wrap:wrap;
            justify-content: flex-start;
            align-items:flex-start;
            align-content:flex-start;
            div{
              height: 75px;
              line-height: 75px;
              width:205px;
              flex: 1;
              padding-left: 35px;
              flex:0 1 auto;
              a {
                color: $colorB;
                font-size: 14px;
                display: inline-block;
                img {
                  width: 42px;
                  height: 35px;
                  vertical-align: middle;
                  margin-right: 15px;
                }
              }
            }
          }
        }
      }
    }
    .swiper-container {
      height: 451px;
      img {
        width: 100%;
        height: 100%;
      }
      .swiper-button-prev {
        left: 274px;
      }
    }
  }
  .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      width: 296px;
      height: 167px;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  .banner {
    margin-bottom: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px;
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }
    .wrapper {
      display: flex;
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            width: 236px;
            height: 302px;
            background-color: $colorG;
            text-align: center;
            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              color: $colorG;
              &.new-pro {
                background-color: #7ecf68;
              }
              &.kill-pro {
                background-color: #e82626;
              }
            }
            .item-img {
              img {
                width: 100%;
                height: 195px;
              }
            }
            .item-info {
              h3 {
                font-size: $fontJ;
                color: $colorB;
                line-height: $fontJ;
                font-weight: bold;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px auto 13px;
              }
              .price {
                color: #f20a0a;
                font-size: $fontJ;
                font-weight: bold;
                cursor: pointer;
                &:after {
                  @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
                  content: " ";
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

