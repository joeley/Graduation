<template>
  <div class="footer" :class="[footerType == '2'?'login-footer':'']">
    <div 
      class="footer-logo"
      v-if="footerType == '1'"  
    >
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>             
    <div class="footer-link">
      <a href="https://www.notion.so/joeley/Joe-s-show-note-b9e27894bb424f008e4665b3066eead6" target="_blank">李哲前端绘制</a><span>|</span>
      <a href="http://yangzan.top/" target="_blank">杨赞后端支持</a><span>|</span>
      <a href="" target="_blank">广告位1招商</a><span>|</span>
      <a href="" target="_blank">广告位2招商</a>
    </div>
    <div class="copyright">Copyright ©2020 <span class="domain">joeley.cn</span> All Rights Reserved.</div>
  </div>
</template>
<script>
  export default{
    name:'nav-footer',
    props:{
      footerType:{
        type:String,
        default:'1'
      }
    }
  }
</script>
<style lang="scss" scoped>
  .footer{
    // height:234px;
    border-top:4px solid #FF6600;
    background-color:#333333;
    color:#999999;
    font-size:16px;
    text-align:center;
    padding-top: 30px;
    padding-bottom: 10px;
    a:hover{
        color: #FF6600;
    }
    .footer-logo{
      margin-top:0px;
      margin-bottom:31px;
      img{
        width:53px;
        height:36px;
        margin-bottom:13px;
      }
    }
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
        
      }
      a:hover{
        color: #FF6600;

      }
      span{
        margin:0 10px;
      }
      margin-bottom:13px;
    }
    .copyright:hover{
      .domain{
        color:#FF6600;
      }
    }
  }
  .login-footer{
    border-top:none;
    background-color: #ffffff;
  }
</style>