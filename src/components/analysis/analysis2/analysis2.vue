<template>
  <div class="analysis2 text-center">
      
      <div class="text-dark d-flex justify-content-center ">
        <p class="ml-3 mb-0 align-self-stretch"> 目前排隊密度: </p>
        <div class="density ml-3"></div>
      </div>
    <ex-game v-if="exhibitName==='電玩展'" :exhibit-name="exhibitName"></ex-game>
    <ex-project v-if="exhibitName==='期末專題展'" :exhibit-name="exhibitName"></ex-project>
  </div>
</template>

<script>
import ExGame from './exGame'
import ExProject from './exProject'
export default {
  props:['exhibitName'],
  components:{
    ExGame,
    ExProject
  },
  data () {
    return {

    }
  }
}
</script>
<style scoped>
.density {
  background-image: linear-gradient(to right,
   rgba(99, 233, 92, 0.67),
  rgba(233, 226, 92, 0.67),
  rgba(231, 58, 52, 0.67),
  rgba(86, 17, 170, 0.85)
  );
  width:10vw;
}
</style>
