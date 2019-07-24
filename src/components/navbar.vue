<template>
  <div id="">
    {{update}}
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="">
      <a class="navbar-brand" href="#/main">LeadLL</a>
      <!-- <button class="navbar-toggler first-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <div class="animated-icon1"><span></span><span></span><span></span></div>
      </button> -->
      <burger-button class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent">
      </burger-button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/main/exhibitions/exhibitionInfo">活動資訊</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/main/stores/storeInfo">店家資訊</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/main/users/userInfo">使用者資訊</router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              動線分析
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a v-for="(ex,index) in exhibitions" :key="index" class="dropdown-item" href="#" @click="linkto(index)">{{ex}}</a>
            </div>
          </li>

        </ul>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="clearToken">登入/登出</a>
            </li>
        </ul>
      </div>
      
      
    </nav>

  </div>
</template>

<script>

import BurgerButton from '@/components/BurgerButton';

export default {

  props:['toexhibitions'],
  components: {
    BurgerButton
  },
  data () {
    return {
      exhibitions:[],
      
      exhibitName:'',
    }
  },
  methods: {
      clearToken(){
          localStorage.removeItem('token');
          console.log('removed token');
          this.$router.push('/login')
      },
      linkto(index){
        this.exhibitName = this.exhibitions[index];
        this.$emit('fromNavBar', this.exhibitName);
        this.$router.push('/main/analysis');
      }
  },
  created(){
    this.$http
    .get("http://34.80.102.113:3000/leadline/exhibition/getAllExhibitName", {
      headers: { "x-access-token": localStorage.getItem("token") }
    })
    .then(response => {
      //拿到所有展的展名
      this.exhibitions = response.data.msg;
      this.$emit('changeExhibition', response.data.msg);
    });
    
  },
  computed:{
    update(){
      this.exhibitions = this.toexhibitions;
    }
  }
}
</script>

<style scoped>
  /* Icon 1 */

.animated-icon1, .animated-icon2, .animated-icon3 {
width: 30px;
height: 20px;
position: relative;
margin: 0px;
-webkit-transform: rotate(0deg);
-moz-transform: rotate(0deg);
-o-transform: rotate(0deg);
transform: rotate(0deg);
-webkit-transition: .5s ease-in-out;
-moz-transition: .5s ease-in-out;
-o-transition: .5s ease-in-out;
transition: .5s ease-in-out;
cursor: pointer;
}

.animated-icon1 span, .animated-icon2 span, .animated-icon3 span {
display: block;
position: absolute;
height: 3px;
width: 100%;
border-radius: 9px;
opacity: 1;
left: 0;
-webkit-transform: rotate(0deg);
-moz-transform: rotate(0deg);
-o-transform: rotate(0deg);
transform: rotate(0deg);
-webkit-transition: .25s ease-in-out;
-moz-transition: .25s ease-in-out;
-o-transition: .25s ease-in-out;
transition: .25s ease-in-out;
}

.animated-icon1 span {
background: #e65100;
}

.animated-icon1 span:nth-child(1) {
top: 0px;
}

.animated-icon1 span:nth-child(2) {
top: 10px;
}

.animated-icon1 span:nth-child(3) {
top: 20px;
}

.animated-icon1.open span:nth-child(1) {
top: 11px;
-webkit-transform: rotate(135deg);
-moz-transform: rotate(135deg);
-o-transform: rotate(135deg);
transform: rotate(135deg);
}

.animated-icon1.open span:nth-child(2) {
opacity: 0;
left: -60px;
}

.animated-icon1.open span:nth-child(3) {
top: 11px;
-webkit-transform: rotate(-135deg);
-moz-transform: rotate(-135deg);
-o-transform: rotate(-135deg);
transform: rotate(-135deg);
}

</style>

