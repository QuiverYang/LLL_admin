<template>
<div class="container mt-3">
  <div class="row">
    analysis 2 page
  </div>
  
</div>
  
</template>

<script>

export default {
  props:['exhibitName'],
  data () {
    
    return {
      stores:[],
      timer:'',
      anaExhibitName:'',
    }
  },
  watch: {

  },
  created: function () {
    this.anaExhibitName = this.exhibitName;
    this.fetchData();
    this.timer = setInterval(this.fetchData,1000*10);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    fetchData(){
      let api = "http://34.80.102.113:3000/leadline/store/getQueueInfo2?name="+this.exhibitName
      this.$http
        .get(api, {
          headers: { "x-access-token": localStorage.getItem("token") }
        })
        .then(response => {
          let data = response.data.msg;
          //[{name:name,email:email,inlineNum:inlineNum, totalQueueNum: totalQueueNum},{},{}......]
          this.stores = data;    
          console.log(data);   
          console.log('upadted')
        });
    },
    cancelAutoUpdate: function() { clearInterval(this.timer) },
  }
}
</script>

<style scoped>
.container{
  max-width: 80%;
}
</style>
