<template>
  <div class="addStore">
    <div class="card" style="width: 30rem;">
      <div class="card-body">
        <h5 class="card-title">新增店家</h5>
        <template v-for="(item,index) in storeSchema">
          <div v-if="item !=='queue' && item !=='imgURL' &&item !=='visitorTime'&&item !=='post'" class="input-group mb-3" :key="item">
            <div class="input-group-prepend" style="width : 150px">
              <span class="input-group-text" style="width:100%">{{item}}</span>
            </div>
            <input
              type="text"
              class="form-control"
              v-model="input[index]"
            />
          </div>
        </template>

        <a href="#" @click="addStore" class="btn btn-success w-100">新增</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storeSchema: [],
      postKeyValues:{},
      input:[],
    };
  },
  created: function() {
    this.$http
      .get("http://34.80.102.113:3000/leadline/store/getStoreSchema", {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
      .then(response => {
        this.storeSchema = response.data.msg;
      });
  },
  methods: {
    addStore() {
      let postKeyValues = {}
      if(this.input.length<9){
          alert('填入資料不能為空');
          postKeyValues ={}
          return;
        };
      for(var i = 0; i < this.input.length; i++){
        if(!this.input[i]||this.input.length<9){
          alert('填入資料不能為空');
          postKeyValues ={}
          return;
        };
        postKeyValues[this.storeSchema[i]] = this.input[i];
      };
      this.$http
        .post("http://34.80.102.113:3000/leadline/store/create",postKeyValues)
        .then(response => {
          console.log(response.data);
          this.$router.push("/main/stores/storeInfo");
      });
    }
  }
}
</script>

<style scoped>
.card {
  margin: 20px auto; /* Added */
  float: none; /* Added */
}
</style>