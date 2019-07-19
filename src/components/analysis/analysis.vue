<template>
  <div class="analysis">
    <div class="text-center mt-3 mb-3">
      <router-link class="" to="/main/analysis/analysis1">店家分析</router-link> / 
      <router-link class="" to="/main/analysis/analysis2">分析二</router-link>
    </div>
      <div >
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>