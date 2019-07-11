// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios'  //主要的AJAX套件
import VueAxios from 'vue-axios' //將它喘為ＶＵＥ的套件
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.use(VueAxios, axios);
Vue.config.productionTip = false

router.beforeEach((to, from, next)=>{
  // console.log('token: '+localStorage.getItem('token'));
  axios.post('http://34.80.102.113:3000/leadline/auth/checkTokenForAdmin',{},{
    headers:{'x-access-token':localStorage.getItem('token')}
  }).then((response)=>{
    console.log(response.data); 
    let data = response.data;
    if(data.status == 200){
      console.log('token is valid, already login examined by main.js');
      next()
    }else{
      console.log('token invalid examined by main.js')
      if( to.path !== '/login')
        next('/login');
      else
        next();
    }
  })
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router //把import進來的router放在components
})
