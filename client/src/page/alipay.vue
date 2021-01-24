<template>
  <div class="ali-pay">
    <loading></loading>
    <div class="form" v-html="content"></div>
  </div>
</template>
<script>
  import Loading from './../components/Loading'
  export default{
    name:'alipay',
    components:{
      Loading
    },
    data(){
      return {
        orderId:this.$route.query.orderId,
        content:'',
      }
    },
    mounted(){
      this.paySubmit();
    },
    methods:{
      paySubmit(){
        this.axios.post('/pay',{
          orderId:this.orderId,
          orderName:'这里是可以扫码下单的',
          amount:0.01,  //单位元
          payType:1     //1支付宝，2微信
        }).then((res)=>{
          this.content = res.content;
          setTimeout(()=>{    // 等待元素加载到html中再触发
            document.forms[0].submit();
          },100)
        })
      }
    }
  }
</script>