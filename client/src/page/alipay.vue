<template>
  <div class="ali-pay">
    <loading v-if="loading"></loading>
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
        orderId:this.$route.query.id,
        content:'',
        loading:true
      }
    },
    mounted(){
      this.paySubmit();
    },
    methods:{
      paySubmit(){
        this.axios.post("/pay/alipay",{
          orderId: this.orderId
        }).then((res) => {
          // const div = document.createElement('div');
          // div.innerHTML = res; 
          // document.body.appendChild(div);
          this.content = res
          const submitName = /(?<=name=")\w*/.exec(res)[0]
          // document.forms[submitName].setAttribute('target', '_blank');
          setTimeout(()=>{
            document.forms[submitName].submit();
          },100)
        })
      }
    }
  }
</script>