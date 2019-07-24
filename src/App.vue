<template>
  <div id="app">
    <router-view 
    name = "navbar"
    :toexhibitions="toexhibitions"
    @fromNavBar="clicknavbar"
    @changeExhibition="clickChangeExhibition"></router-view>
    <!-- <HelloWorld/> -->
    <router-view 
      :toexhibitions="toexhibitions"
      :exhibit-name="exhibitName"
      @changeExhibition="clickChangeExhibition">
    </router-view>
  </div>
</template>

<script>
import Main from '@/components/main'

export default {
  name: 'App',
  data(){
    return{
      exhibitName:'',
      toexhibitions:[]
    }
  },
  components: {
    Main
  },
  methods:{
    clicknavbar(event){
      this.exhibitName = event;
    },
    clickChangeExhibition(event){
      console.log('from app remov',event)
      this.toexhibitions = event;
    }
  }
}
</script>


