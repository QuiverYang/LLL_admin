<template>
  <div class="">
    <div class="container-fluid">
      
      <div class="bg-p d-flex justify-content-around vw-mb-2">
        <div :style="styleObject[0]">{{stores[0].name}}</div>
        <div :style="styleObject[1]">{{stores[1].name}}</div>
        <div :style="styleObject[2]">{{stores[2].name}}</div>
      </div>
      <div class="bg-p d-flex justify-content-between vw-mb-2">
        <div :style="styleObject[3]">{{stores[3].name}}</div>
        <div :style="styleObject[4]">{{stores[4].name}}</div>
        <div :style="styleObject[5]">{{stores[5].name}}</div>
        <div :style="styleObject[6]">{{stores[6].name}}</div>
      </div>
      <div class="bg-p d-flex justify-content-around">
        <div :style="styleObject[7]">{{stores[7].name}}</div>
        <div :style="styleObject[8]">{{stores[8].name}}</div>
        <div :style="styleObject[9]">{{stores[9].name}}</div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  props:['exhibitName'],
  data () {
    return {
      DENSITY1:'rgba(99, 233, 92, 0.67)',
      DENSITY2:'rgba(233, 226, 92, 0.67)',
      DENSITY3:'rgba(233, 156, 92, 0.67)',
      DENSITY4:'rgba(233, 92, 99, 0.67)',
      DENSITY5:'rgba(86, 17, 170, 0.85)',
      stores:[],
      timer:'',
      anaExhibitName:'',
      styleObject: [],
    }
  },
  watch: {

  },
  computed:{
    updateBolck2(){
      this.updateBolck();
    }
  },
  created: function () {
    
    this.anaExhibitName = this.exhibitName;
    this.fetchData();
    // this.timer = setInterval(this.fetchData,1000*10);
    
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
          //[{name:name,email:email,inlineNum:inlineNum, boothNo:boothNo,totalQueueNum: totalQueueNum},{},{}......]
          this.stores = data;
          this.updateBolck();
          console.log('upadted')
        });
    },
    cancelAutoUpdate: function() { clearInterval(this.timer) },

    updateBolck(){
      for(let i = 0; i < this.stores.length; i++){
        if(this.stores[i] === undefined){
          this.styleObject.push({backgroundColor : 'white'});
        }else if(this.stores[i]['inlineNum']<1){
          this.styleObject.push({backgroundColor : this.DENSITY1});
        }else if(this.stores[i]['inlineNum'] <3){
          this.styleObject[i].push({backgroundColor : this.DENSITY2});
        }else if(this.stores[i]['inlineNum'] <5){
          this.styleObject[i].push({backgroundColor : this.DENSITY3});
        }else if(this.stores[i]['inlineNum'] <7){
          this.styleObject[i].push({backgroundColor : this.DENSITY4});
        }else{
          this.styleObject.push({backgroundColor : this.DENSITY5});
        }
      }
    }
  }
}
</script>

<style scoped>
.container-fluid {
  width: 90vw;
  /* height: 47vw; */
  text-align: center;
  border-color:green;
  border-width: thick;
  border-style: solid;
  border-radius: 30px;
  padding: 5vw;
  margin-top: 2vw;
  margin-bottom: 2vw;
}
.bg-p div {
  font-size: 2vw;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color:gray;
  border-width: thin;
  border-style: solid;
  border-radius: 10px;
  color:gray;
  width:10vw;
  height:10vw;
}
.vw-mb-2 {
  margin-bottom: 2vw;
}

</style>
