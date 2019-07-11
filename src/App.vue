<template>
  <div id="app">
    <router-view name = "navbar"></router-view>
    <!-- <HelloWorld/> -->
    

    <router-view></router-view>
  </div>
</template>

<script>
import Main from '@/components/main'

export default {
  name: 'App',
  components: {
    Main
  },
  methods:{
    
  }
}
</script>


