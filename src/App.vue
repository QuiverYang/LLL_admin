<template>
  <div id="app">
    <router-view 
    name = "navbar"
    @fromNavBar="test"></router-view>
    <!-- <HelloWorld/> -->
    <router-view :exhibit-name="exhibitName"></router-view>
  </div>
</template>

<script>
import Main from '@/components/main'

export default {
  name: 'App',
  data(){
    return{
      exhibitName:'',
    }
  },
  components: {
    Main
  },
  methods:{
    test(event){
      this.exhibitName = event;
      console.log(this.exhibitName);
    }
  }
}
</script>


