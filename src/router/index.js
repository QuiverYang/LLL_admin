import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '@/components/login'
import Err404 from '@/components/err404'
import Navbar from '@/components/navbar'
import UserInfo from '@/components/users/info'
import User from '@/components/users/users'
import AddUser from '@/components/users/addUser'
import Main from '@/components/main'
import Analysis from '@/components/analysis/analysis'
import Analysis1 from '@/components/analysis/analysis1'
import Analysis2 from '@/components/analysis/analysis2'
import Store from '@/components/stores/stores'
import StoreInfo from '@/components/stores/info'
import AddStore from '@/components/stores/addStore'
import Welcome from '@/components/welcome'


export default new VueRouter ({
    // linkActiveClass:'active',
    // mode:history,
    routes:[
        {
            name:'主畫面',
            path:'/',
            components:{
                default: Welcome,
                navbar: Navbar
            },
        },
        {
            name:'登入',
            path:'/login',
            component: Login
        },
        
        {
            name:'err404',
            path:'/err404',
            component: Err404
        },
        {
            name:'',
            path:'/main',
            components:{
                default: Main,
                navbar: Navbar
                
            },
            children:[
                {
                    name:'店家',
                    path:'stores',
                    component: Store,
                    children:[
                        {
                            name:'店家資訊',
                            path:'storeInfo',
                            component:StoreInfo
                        },
                        {
                            name:'新增店家',
                            path:'addStore',
                            component:AddStore
                        },
                    ]
                },
                {
                    name:'客戶',    //如果children裡面有path:''是預設值的話 裡面的name將取代這裡的name 所以 這裡可以不用寫
                    path:'users',
                    // component: Page,
                    component: User,
                    children:[
                        {
                            name:'客戶資訊',
                            path:'userInfo',
                            component:UserInfo
                        },
                        {
                            name:'新增客戶',
                            path:'addUser',
                            component:AddUser
                        },
                    ]
                },
                {
                    name:'分析',
                    path:'analysis',
                    component: Analysis,
                    children:[
                        {
                            name:'分析一',
                            path:'analysis1',
                            component:Analysis1
                        },
                        {
                            name:'分析二',
                            path:'analysis2',
                            component:Analysis2
                        },
                    ]

                },
                
            ]
        },
        
    ]
});
