<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1"><span class="checkbox" v-bind:class="{'checked':selectedAll}" @click="toggleAll"></span>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item,index) in productList" v-bind:key="index">
              <div class="item-check">
                <span class="checkbox" :class="{'checked':item.selected}"  @click="updateCart(item)"></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt="">
                <span>{{item.productName + ' , ' + item.productSubtitle}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                  <!--<span>{{item.quantity}}</span>-->
                  <input type="number" v-model="item.quantity" :max="item.productStock" :min="1" @input="numChange(item)" onkeyup="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')">
                  <a href="javascript:;"  @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.totalPrice}}</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/index">继续购物</a>
            共<span>{{productList.length}}</span>件商品，已选择<span>{{selectedNum}}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{totalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import OrderHeader from './../components/OrderHeader'
  import ServiceBar from './../components/ServiceBar'
  import NavFooter from './../components/NavFooter'
  export default{
    name:'index',
    components:{
      OrderHeader,
      ServiceBar,
      NavFooter
    },
    data(){
      return {
        // list:[],//商品列表
        productList : [],
        selectedAll:false,//是否全选
        totalPrice:0,//商品总金额
        selectedNum:0,//选中商品数量
        quantity:1,
        timer:null,
      }
    },
    mounted(){
      this.getCartList();
    },
    methods:{
      // 获取购物车列表
      getCartList(){
        this.axios.get('/cart').then((res)=>{
          this.renderData(res);
        })
      },
      // 更新购物车数量和购物车单选状态
      updateCart(item,type){
        let quantity = item.quantity,
            selected = item.selected;
        if(type == '-'){
          if(quantity == 1){
            this.$message.warning({
              message:'商品至少保留一件',
              center:true
            });
            return;
          }
          --quantity;
        }else if(type == '+'){
          if(quantity >= item.productStock){
            this.$message.warning({
              message:'购买数量不能超过库存数量',
              center:true
            });
            return;
          }
          ++quantity;
        }else{
          selected = !item.selected;
        }
        this.axios.put(`/cart/${item.id}`,{
          quantity,
          selected
        }).then((res)=>{
          this.renderData(res);
        })
      },
      // 删除购物车商品
      delProduct(item){
        this.axios.delete(`/cart/${item.id}`).then((res)=>{
          console.log(res)
          this.$store.dispatch("saveCartCount", res.totalNum)
          this.$message.success({
            message:'删除成功',
            center:true
          });
          this.renderData(res);
        });
      },
      // 控制全选功能
      toggleAll(){
        this.axios.put("/cart/selectAll").then((res)=>{
          this.renderData(res);
        })
      },
      // 公共赋值
      renderData(res){
        this.productList =  res.productList || [];
        this.selectedAll = res.selectedAll;
        this.totalPrice = res.totalPrice;
        this.selectedNum = res.selectedNum;        
      },
      numChange(item){ 
        clearTimeout(this.timer);
        item.quantity = item.quantity ? parseInt(item.quantity):1
        let msg
        if(item.quantity > item.productStock){
          item.quantity = item.productStock
          msg = "购买数量不能超过库存数量"
        }else if(item.quantity< 1){
          item.quantity = 1
          msg = "商品至少保留一件"
        }else{
          this.timer = setTimeout(()=>{
            this.axios.put("/cart/" + item.id,{
              quantity:item.quantity,
              selected:item.selected
            }).then((res)=>{
              return this.renderData(res)
            })
          },1000)
          return 
        }
        this.$message.warning({
          message:msg,
          center:true
        });
      },
      // 购物车下单
      order(){
        //let isCheck = this.list.every(item=>!item.selected);
        let isCheck = this.productList.some(item=>item.selected);
        if(isCheck){
          this.$router.push('/order/confirm');
        }else{
          this.$message.warning({
              message:'请选择一件商品',
              center:true
            });
        }
      }
    }
  }
</script>
<style lang="scss">
  .cart{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:114px;
      .cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;
        .checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
          &.checked{
            background:url('/imgs/icon-gou.png') #FF6600 no-repeat center;
            background-size:16px 12px;
            background-size: contain;
            border:none;
          }
        }
        .cart-item-head{
          display:flex;
          height: 79px;
          line-height: 79px;
          .col-1{
            flex:1;
          }
          .col-2{
            flex:2;
          }
          .col-3{
            flex:3;
          }
        }
        .cart-item-list{
          .cart-item{
            display:flex;
            align-items:center;
            height:125px;
            border-top:1px solid #E5E5E5;
            font-size:16px;
            .item-check{
              flex:1;
            }
            .item-name{
              flex:3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;
              img{
                width:80px;
                height:80px;
                vertical-align:middle;
              }
              span{
                margin-left: 30px;
              }
            }
            .item-price{
              flex:1;
              color:#333333;
            }
            .item-num{
              flex:2;
              .num-box{
                display:inline-block;
                width:150px;
                height:40px;
                line-height:40px;
                border:1px solid #E5E5E5;
                font-size:14px;
                a{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
                span{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
                input{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                  background:none;
                  outline:none;  
                  border:none;
                  text-align: center;
                  -moz-appearance:textfield;
                }
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  appearance: none;
                  margin: 0;
                }
                
              }
            }
            .item-total{
              flex:1;
              color:#FF6600;
            }
            .item-del{
              flex:1;
              width:14px;
              height:12px;
              background:url('/imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
          }
        }
      }
      .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        .cart-tip{
          margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#FF6600;
            margin:0 5px;
          }
        }
        .total{
          font-size:14px;
          color:#FF6600;
          span{
            font-size:24px;
          }
          a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      }
    }
  }
</style>