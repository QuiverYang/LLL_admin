<template>
<div class="container mt-3">
  <div class="row">
    <div class="col-lg-4 col-md-6 col-sm-12" v-for="data in chartData" :key="data.email">
      <div >
        <ve-histogram
        :title="{text:data.name}"
        :data="data"
        :settings="chartSettings"
        :grid="grid"
        :visual-map="visualMap"></ve-histogram>
      </div>
    </div>
  </div>
  
</div>
  
</template>

<script>
import 'echarts/lib/component/visualMap'

export default {
  
  data () {
    this.visualMap = [
        {
          type: 'piecewise',
          splitNumber: 5,
          min: 0,
          max: 10,
          right: 0,
          top: '50%'
        }
      ]
    this.grid = {
      right: 70
    }
    this.chartSettings = {
        labelMap: {
          'PV': '店名',
        },
        legendName: {
          '访问用户': '访问用户 total: 10000'
        },
      }
    return {
      chartData: [/* {columns: ['time', 'visitorNum'],rows: []} */],
      stores:[],
      timer:'',
      
    }
  },
  watch: {

  },
  created: function () {
    this.fetchData();
    this.timer = setInterval(this.fetchData,1000*10);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    fetchData(){
      this.$http
        .get("http://34.80.102.113:3000/leadline/store/getQueueInfo", {
          headers: { "x-access-token": localStorage.getItem("token") }
        })
        .then(response => {
          let data = response.data.msg;
          let obj = {}
          this.chartData = [];
          for(let i = 0; i < data.length; i++){

            obj = {
              email:data[i].email,
              name:data[i].name,
              columns: ['時間','人數'],
              rows:data[i].timeAndVisitor
            };
            this.chartData.push(obj);
          }
          console.log('upadted')
        });
          //this.charData.rows is like the following
          // [
          //   {
          //       "name": "捷克漢堡",
          //       "eamil":jack@gamil.com
          //       "timeAndVisitor": [
          //           {"time": 8,"visitorNum": 3},
          //           {"time": 9,"visitorNum": 1},
          //           {"time": 10,"visitorNum": 2},
          //           {"time": 11,"visitorNum": 2},
          //           {"time": 12,"visitorNum": 1},
          //           {"time": 13,"visitorNum": 0},
          //           {"time": 14,"visitorNum": 0},
          //           {"time": 15,"visitorNum": 0},
          //           {"time": 16,"visitorNum": 0},
          //           {"time": 17,"visitorNum": 0},
          //           {"time": 18,"visitorNum": 0}
          //       ]
          //   },]
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
