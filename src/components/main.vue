<template>
  <div class="main">
    <!-- <div  v-if="false">
      <div class="center">
        <h1>welcome</h1>
      </div>
      <img src="http://34.80.102.113/uploads/lllicon.jpg" alt="server uploads wrong" class="img-thumbnail rounded mx-auto d-block">
      
    </div> -->
    
    <div >
      <router-view :exhibit-name="exhibitName"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props:['exhibitName'],
  data () {
    return {
      mainexhibitName:''
    }
  },
  created(){
    this.mainexhibitName = this.exhibitName;
  }
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  margin:auto;
}
</style>