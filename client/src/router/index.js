import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Index from "@/page/index"
import Product from '@/page/product'
import Detail from '@/page/detail'
import Order from '@/page/order'
import OrderConfirm from '@/page/orderConfirm'
import OrderList from '@/page/orderList'
import OrderPay from '@/page/orderPay'
import Cart from '@/page/cart'
import Alipay from '@/page/alipay'
import Login from '@/page/login'


Vue.use(Router);

export default new Router({
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
                    component:Product
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