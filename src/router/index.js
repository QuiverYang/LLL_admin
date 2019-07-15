import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import StoreInfo from '@/components/stores/info'
import Page from '@/components/pages/page'
import child from '@/components/pages/child'
import child2 from '@/components/pages/child2'
import child3 from '@/components/pages/child3'
import Menu from '@/components/pages/menu'
import Login from '@/components/login'
import Err404 from '@/components/err404'
import Navbar from '@/components/navbar'
import User from '@/components/users'
import Main from '@/components/main'
import Analysis from '@/components/analysis'
import AddStore from '@/components/stores/addStore'
import Store from '@/components/stores/stores'
import Welcome from '@/components/welcome'


export default new VueRouter ({
    // linkActiveClass:'active',
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
                    component: User
                    // children:[
                    //     {
                    //         name:'卡片一',
                    //         path:'',
                    //         component:child
                    //     },
                    //     {
                    //         name:'卡片二',
                    //         path:'child2',
                    //         component:child2
                    //     },
                    //     {
                    //         name:'卡片三',
                    //         path:'child3',
                    //         component:child3
                    //     }
                    // ]
                },
                {
                    name:'分析',
                    path:'analysis',
                    component: Analysis
                },
                
            ]
        },
        
    ]
});
