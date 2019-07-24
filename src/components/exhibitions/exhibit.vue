<template>
  <div class="exhibition">
      <div >
        <router-view
          :toexhibitions="toexhibitions"
          @changeExhibition="clickChangeExhibition">
        </router-view>
      </div>
  </div>
</template>

<script>
export default {
  props:['toexhibitions'],
  data () {
    return {

    }
  },
  methods:{
    clickChangeExhibition(event){
      this.$emit('changeExhibition', event);
    }
  }
}
</script>