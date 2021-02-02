import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Index from "@/page/index"
import axios from '@/permission'
import store from "@/store"

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 异步组件
const Product = () => import('@/page/product')
const Detail = () => import('@/page/detail')
const Order = () => import('@/page/order')
const OrderConfirm = () => import('@/page/orderConfirm')
const OrderList = () => import('@/page/orderList')
const OrderPay = () => import('@/page/orderPay')
const Cart = () => import('@/page/cart')
const Alipay = () => import('@/page/alipay')
const Login = () => import('@/page/login')

Vue.use(Router);

const router = new Router({
    mode:"history",
    routes:[
        {
            path:'/',
            name:'home',
            component:Home,
            redirect:'/index',
            children:[
                {
                    path:'index',
                    name:'index',
                    component:Index

                },
                {
                    path:'product/:id',
                    name:'product',
                    component:Product,
                    beforeEnter:(to,from,next)=>{
                        axios().get("/product/flag/" + to.params.id).then(res=>{
                            if(res){
                                next()
                            }else{
                                next("/detail/" + to.params.id)
                            }
                        })
                    }
                },
                {
                    path:'detail/:id',
                    name:'detail',
                    component:Detail
                }
            ]
        },
        {
            path:'/order',
            name:'order',
            component:Order,
            redirect:{name:'order-list'},
            children:[
                {
                  path:'list',
                  name:'order-list',
                  component:OrderList  
                },
                {
                    path:'confirm',
                    name:'order-confirm',
                    component:OrderConfirm  
                },
                {
                    path:'pay',
                    name:'order-pay',
                    component:OrderPay  
                },
                {
                    path:'alipay',
                    name:'alipay',
                    component:Alipay
                }
            ]
        },
        {
            path:'/cart',
            name:'cart',
            component:Cart
        },
        {
            path:'/login',
            name:'login',
            component:Login
        }
    ]
})


NProgress.configure({
    showSpinner: false
})

router.beforeEach((to,from,next)=>{
    NProgress.start()
    if(store.state.cartCount === ""){
        axios().get("/cart/cartNum").then((res)=>{
            store.dispatch("saveCartCount", res)
        })
    }
    next()
})
router.afterEach(() => {
    NProgress.done()    
})
  
export default  router