<template>
  <div class="main">
    <!-- <div  v-if="false">
      <div class="center">
        <h1>welcome</h1>
      </div>
      <img src="http://34.80.102.113/uploads/lllicon.jpg" alt="server uploads wrong" class="img-thumbnail rounded mx-auto d-block">
      
    </div> -->
    
    <div >
      <router-view 
      :toexhibitions="toexhibitions"
      :exhibit-name="exhibitName"
      @changeExhibition="clickChangeExhibition">
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  props:['exhibitName','toexhibitions'],
  data () {
    return {
      mainexhibitName:''
    }
  },
  created(){
    this.mainexhibitName = this.exhibitName;
  },
  methods:{
    clickChangeExhibition(event){
      this.$emit('changeExhibition', event);
    }
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