<template>
  <div class="product" v-if="product.productFlag">
    <product-param :title="product.name">
      <template #buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-param>
    <div class="content">
      <div class="item-bg"
        :style="{
          backgroundImage:'url('+ product.productBg1 +')'
        }"
        v-if="!!product.productBg1"
      >
        <h2>{{product.productName}}</h2>
        <h3>{{product.productSubtitle}}</h3>
        <p>
          <a href="" id="">{{ product.productDescribe1 }}</a>
          <span>|</span>
          <a href="" id="">{{ product.productDescribe2 }}</a>
          <span>|</span>
          <a href="" id="">{{ product.productDescribe3 }}</a>
          <span>|</span>
          <a href="" id="">{{ product.productDescribe4 }}</a>
        </p>
        <div class="price">
          <span>￥<em>{{product.productPrice}}</em></span>
        </div>
      </div>
      <div class="item-bg-2" 
        :style="{
          backgroundImage:'url('+ product.productBg2 +')'
        }"
        v-if="!!product.productBg2"
      >
      </div>
      <div class="item-bg-3"
        :style="{
          backgroundImage:'url('+ product.productBg3 +')'
        }"
        v-if="!!product.productBg3"
      >
      </div>
      <div class="item-bg-4"
        :style="{
          backgroundImage:'url('+ product.productBg4 +')'
        }"
        v-if="!!product.productBg4"
      >
      </div>
      <div class="item-swiper"  v-if="product.galleryFlag">
        <swiper :options="swiperOption">           
            <swiper-slide v-if="!!product.galleryImg1"><img v-lazy="product.galleryImg1" alt=""></swiper-slide>
            <swiper-slide v-if="!!product.galleryImg2"><img v-lazy="product.galleryImg2" alt=""></swiper-slide>
            <swiper-slide v-if="!!product.galleryImg3"><img v-lazy="product.galleryImg3" alt=""></swiper-slide>
            <swiper-slide v-if="!!product.galleryImg4"><img v-lazy="product.galleryImg4" alt=""></swiper-slide>
            <swiper-slide v-if="!!product.galleryImg5"><img v-lazy="product.galleryImg5" alt=""></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <p class="desc">{{product.galleryText}}</p>
      </div>
      <div class="item-video" v-if="product.videoFlag">
        <h2>{{product.videoMainTitleText1}}<br/>{{product.videoMainTitleText2}}</h2>
        <p>{{product.videoSubheadText1}}<br/>{{product.videoSubheadText2}}</p>
        <div class="video-bg" @click="showSlide='slideDown'"
          :style="{
            backgroundImage:'url('+ product.videoCover +')'
          }"
        ></div>
        <div class="video-box" v-show="showSlide">
          <div class="overlay"></div>
          <div class="video" :class="showSlide">
            <span class="icon-close" @click="closeVideo"></span>
            <video :src="product.videoSrc" muted autoplay controls="controls"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import ProductParam from './../components/ProductParam'
  export default{
    name:'product',
    components:{
      swiper,
      swiperSlide,
      ProductParam
    },
    data(){
      return {
        showSlide:'',//控制动画效果
        product:{},//商品信息
        swiperOption:{
          autoplay:true,
          slidesPerView:3,
          spaceBetween: 30,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          }
        }      
      }
    },
    mounted(){
      this.getProductInfo();
      window.scrollTo(0, 0);
    },
    methods:{
      // gotoDetail(flag,id){   //  此函数已经通过路由守卫实现
      //   console.log(flag)
      //   if(!flag){
      //     this.$router.replace("/detail/"+id)
      //   }
      // },
      getProductInfo(){
        let id = this.$route.params.id;
        this.axios.get(`/product/${id}`).then((res)=>{
          this.product = res;
          
          // this.gotoDetail(res.productFlag,id)
        })
      },
      buy(){
        let id = this.$route.params.id;
        this.$router.push(`/detail/${id}`);
      },
      closeVideo(){
        this.showSlide='slideUp';
        setTimeout(()=>{
          this.showSlide='';
        },600)
      }
    }
  }
</script>
<style lang="scss">
@import '../assets/scss/mixin.scss';
  .product{
    .content{
      .item-bg{
        background-repeat:no-repeat;
        background-position:center;
        height:718px;
        text-align:center;
        h2{
          font-size:80px;
          padding-top:55px;
        }
        h3{
          font-size:24px;
          letter-spacing: 10px;
        }
        p{
          margin-top:21px;
          margin-bottom:40px;
          a{
            font-size:16px;
            color:#333333;
          }
          span{
            margin:0 15px;
          }
        }
        .price{
          font-size:30px;
          color:#333333;
          em{
            font-style:normal;
            font-size:38px;
          }
        }
      }
      .item-bg-2{
        background-repeat:no-repeat;
        background-position:center;
        height:718px;
        background-size:cover;
      }
      .item-bg-3{
        background-repeat:no-repeat;
        background-position:center;
        height:718px;
        background-size:cover;
      }
      .item-bg-4{
        background-repeat:no-repeat;
        background-position:center;
        height:718px;
        background-size:cover;
      }
      .item-swiper{
        margin:36px auto 52px;
        .desc{
          font-size:18px;
          color:#333333;
          text-align:center;
        }
        img{
          width:100%;
          height:250px;
          background-size:cover;
        }
      }
      .item-video{
        height:1044px;
        background-color:#070708;
        margin-bottom:76px;
        color:#FFFFFF;
        text-align:center;
        h2{
          font-size:60px;
          padding-top:82px;
          margin-bottom:47px;
        }
        p{
          font-size:24px;
          margin-bottom:58px;
        }
        .video-bg{
          background-repeat:no-repeat;
          background-position:center;
          background-size:cover;
          width:1226px;
          height:540px;
          margin:0 auto 120px;
          cursor:pointer;
        }
        .video-box{
          .overlay{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color:#333333;
            opacity:.4;
            z-index:10; 
          }
          @keyframes slideDown{
            from{
              top:-50%;
              opacity:0;
            }
            to{
              top:50%;
              opacity:1;
            }
          }
          @keyframes slideUp{
            from{
              top:50%;
              opacity:1;
            }
            to{
              top:-50%;
              opacity:0;
            }
          }
          .video{
            position:fixed;
            top:-50%;
            left:50%;
            transform:translate(-50%,-50%);
            z-index:10;
            width:1000px;
            height:536px;
            opacity:1;
            &.slideDown{
              animation:slideDown .6s linear;
              top:50%;
            }
            &.slideUp{
              animation:slideUp .6s linear;
            }
            .icon-close{
              position:absolute;
              top:20px;
              right:20px;
              @include bgImg(20px,20px,'/imgs/icon-close.png');
              cursor:pointer;
              z-index:11;
              &:hover{
                background-color: #333333;
                border-radius: px;
              }
            }
            video{
              width:100%;
              height:100%;
              object-fit:cover;
              outline:none;
            }
          }
        }
      }
    }
    button{
      margin-left:10px;
    }
  }
</style>