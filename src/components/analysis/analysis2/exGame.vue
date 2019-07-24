<template>
  <div>
    <div class="container-fluid ">
      <div class="text-dark text-center">
        <!-- <img src="  http://sgs.tca.org.tw/images/header_logo.png" alt=""> -->
      </div>
      {{updateBolck2}}
      <div class="bg-p">
        <div v-for="(sty,index) in styleObject" :key="index" :style="styleObject[index]">{{'p'+index}}</div>
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
      styleObject: [
        {//0
          width:'18.2vw',
          height:'26vw',
          top:'2.1vw',
          left:'33.5vw',
          clipPath: 'polygon(50% 0%, 100% 0, 100% 44%, 78% 44%, 78% 100%, 36% 100%, 0 68%, 0 30%, 31% 9%, 31% 0)',
        },
        {//1
          width:'3.3vw',
          height:'13vw',
          top:'2.1vw',
          left:'53.5vw',
        },

        {//2
          width:'3.3vw',
          height:'13vw',
          top:'2.1vw',
          left:'58.5vw',
        },
        {//3
          width:'23.3vw',
          height:'13vw',
          top:'2.1vw',
          left:'65.3vw',
        },
        {//4
          width:'4.7vw',
          height:'9.3vw',
          top:'18.8vw',
          left:'48.8vw',
        },
        {//5
          width:'6.7vw',
          height:'9.3vw',
          top:'18.8vw',
          left:'55.2vw',
        },
        {//6
          width:'3.2vw',
          height:'9.3vw',
          top:'18.8vw',
          left:'65.3vw',
        },
        {//7
          width:'8.1vw',
          height:'1.8vw',
          top:'18.8vw',
          left:'68.5vw',
        },
        {//8
          width:'3.2vw',
          height:'9.3vw',
          top:'18.8vw',
          left:'78.3vw',
        },
        {//9
          width:'3.2vw',
          height:'9.3vw',
          top:'18.8vw',
          left:'83.2vw',
        },
        {//10
          width:'8.147vw',
          height:'11.934vw',
          top:'21.993vw',
          left:'68.405vw',
        },
        {//11
          width:'9.636vw',
          height:'7.236vw',
          top:'31.87vw',
          left:'43.871vw',
        },
        {//12
          width:'6.625vw',
          height:'7.236vw',
          top:'31.87vw',
          left:'55.154vw',
        },
        {//13
          width:'11.37vw',
          height:'7.236vw',
          top:'31.87vw',
          left:'65.182vw',
        },
        {//14
          width:'8.094vw',
          height:'9.157vw',
          top:'29.95vw',
          left:'78.325vw',
        },
        {//15
          width:'8.094vw',
          height:'9.157vw',
          top:'29.95vw',
          left:'78.325vw',
        },
        {//16
          width:'8.185vw',
          height:'3.672vw',
          top:'42.891vw',
          left:'5.767vw',
        },
        {//17
          width:'9.752vw',
          height:'8.926vw',
          top:'48.564vw',
          left:'2.401vw',
        },
        {//18
          width:'9.959vw',
          height:'14.599vw',
          top:'42.891vw',
          left:'15.47vw',
        },
        {//19
          width:'9.752vw',
          height:'8.926vw',
          top:'48.564vw',
          left:'2.401vw',
        },
        {//20
          width:'13.155vw',
          height:'14.599vw',
          top:'42.891vw',
          left:'28.748vw',
        },
        {//21
          width:'9.636vw',
          height:'14.599vw',
          top:'42.891vw',
          left:'43.871vw',
        },
        {//22
          width:'6.625vw',
          height:'14.599vw',
          top:'42.891vw',
          left:'55.154vw',
        },
        {//23
          width:'22.741vw',
          height:'36.616vw',
          top:'42.891vw',
          left:'65.182vw',
        },
        {//24
          width:'23.028vw',
          height:'18.456vw',
          top:'61.127vw',
          left:'2.401vw',
        },
        {//25
          width:'14.745vw',
          height:'18.308vw',
          top:'61.127vw',
          left:'28.755vw',
        },
        {//26
          width:'17.067vw',
          height:'18.379vw',
          top:'61.127vw',
          left:'44.545vw',
        },
        {//27
          width:'10.391vw',
          height:'7.261vw',
          top:'72.245vw',
          left:'40.017vw',
        },
        {//28
          width:'9.694vw',
          height:'14.564vw',
          top:'83.474vw',
          left:'2.401vw',
        },
        {//29
          width:'9.851vw',
          height:'18.4vw',
          top:'83.474vw',
          left:'15.578vw',
        },
        {//30
          width:'8.301vw',
          height:'20.123vw',
          top:'83.474vw',
          left:'28.755vw',
        },
        {//31
          width:'8.533vw',
          height:'14.564vw',
          top:'83.474vw',
          left:'53.079vw',
        },
        {//32
          width:'9.666vw',
          height:'20.123vw',
          top:'83.474vw',
          left:'65.182vw',
        },
        {//33
          width:'9.592vw',
          height:'18.4vw',
          top:'83.474vw',
          left:'78.33vw',
        },
        {//34
          width:'5.021vw',
          height:'4.809vw',
          top:'99.929vw',
          left:'2.401vw',
        },
        {//35
          width:'7.256vw',
          height:'4.947vw',
          top:'105.488vw',
          left:'12.095vw',
        },
        {//36
          width:'5.582vw',
          height:'1.89vw',
          top:'105.488vw',
          left:'20.503vw',
        },
        {//37
          width:'3.077vw',
          height:'1.89vw',
          top:'105.488vw',
          left:'30.613vw',
        },
        {//38
          width:'4.702vw',
          height:'1.112vw',
          top:'109.323vw',
          left:'30.613vw',
        },
        {//39
          width:'8.533vw',
          height:'10.562vw',
          top:'100.207vw',
          left:'53.079vw',
        },
        {//40
          width:'8.533vw',
          height:'10.562vw',
          top:'100.207vw',
          left:'53.079vw',
        },
        {//41
          width:'3.222vw',
          height:'1.557vw',
          top:'105.655vw',
          left:'65.182vw',
        },
        {//42
          width:'7.953vw',
          height:'4.67vw',
          top:'105.655vw',
          left:'70.784vw',
        }
      ],
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
    this.initBlock();
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
          console.log('upadted');
        });
    },
    cancelAutoUpdate: function() { clearInterval(this.timer) },
    sliceVw(str,times,shift){
      return (Number(str.slice(0,str.indexOf('v')))*times+shift)+'vw';
    },
    initBlock(){
      for(let i = 0; i < this.styleObject.length; i++){
        this.styleObject[i].width = this.sliceVw(this.styleObject[i].width,0.5,0);
        this.styleObject[i].height = this.sliceVw(this.styleObject[i].height,0.5,0);
        this.styleObject[i].top = this.sliceVw(this.styleObject[i].top,0.5,1);
        this.styleObject[i].left = this.sliceVw(this.styleObject[i].left,0.5,7);
      }
    },
    updateBolck(){
      const increase =-5;
      for(let i = 0; i < this.styleObject.length; i++){
        console.log(this.stores[i]);
        if(this.stores[i] === undefined){
          this.styleObject[i].backgroundColor = 'white';
        }else if(this.stores[i]['inlineNum']<1){
          this.styleObject[i].backgroundColor = this.DENSITY1;
        }else if(this.stores[i]['inlineNum'] <3){
          this.styleObject[i].backgroundColor = this.DENSITY2;
        }else if(this.stores[i]['inlineNum'] <5){
          this.styleObject[i].backgroundColor = this.DENSITY3;
        }else if(this.stores[i]['inlineNum'] <7){
          this.styleObject[i].backgroundColor = this.DENSITY4;
        }else{
          this.styleObject[i].backgroundColor = this.DENSITY5;
        }
      }
    }
  }
}

</script>

<style scoped>
.container-fluid {
  width: 60vw;
  height: 60vw;
  position: relative;
  text-align: center;
  border-color:green;
  border-width: thick;
  border-style: solid;
  border-radius: 30px;
  padding-top:5vw;
  margin-top: 2vw;
  margin-bottom: 2vw;
}

.bg-p div {
  position: absolute;
  font-size: 1vw;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color:gray;
  border-width: thin;
  border-style: solid;
  border-radius: 10px;
  color:gray;
}
.logo{  
  width:20vw; height:15vw;
  position: absolute;
  top:2vw;
  left:15vw;
}
img{
max-width:50%;
height:auto;
}

</style>
