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
                    // beforeEnter:(to,from,next)=>{
                    //     axios().get("/product/flag/" + to.params.id).then(res=>{
                    //         if(res){
                    //             next()
                    //         }else{
                    //             next({
                    //                 path:"/detail/" +to.params.id
                    //             })
                    //         }
                    //     })
                    // }
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
const whiteList =  ["/login","/index","/product","/detail"]


router.beforeEach((to,from,next)=>{
    NProgress.start()
    const flag = whiteList.some((ele)=>{
        return to.fullPath.startsWith(ele)
    })
    if(store.state.jwt === "" && !flag){     // 没登录就想去权限页面拦截
        next('/login?redirect=' + location.pathname)
    }else if(store.state.cartCount !== "" && store.state.jwt !==''){
        axios().get("/cart/cartNum").then((res)=>{
            store.dispatch("saveCartCount", res)
        }).catch((res)=>{
            return res
        })
    }
    next()
})
router.afterEach(() => {
    NProgress.done()    
})
  
export default  router