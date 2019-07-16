<template>
  <div class="addUser">
    <div class="card" style="width: 30rem;">
      <div class="card-body">
        <h5 class="card-title">新增客戶</h5>
          <template v-for="(item,index) in userSchema" >

            <div v-if="item !=='auth' && item !=='line'" class="input-group mb-3" :key="item">
              
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

        <a href="#" class="btn btn-success w-100" @click="addUser">新增</a>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userSchema: [],
      input: [],
    };
  },
  created: function() {
    this.$http
      .get("http://34.80.102.113:3000/leadline/user/getUserSchema", {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
      .then(response => {
        this.userSchema = response.data.msg;
      });
  },
  methods: {
    addUser() {
      let postKeyValues = {}
      if(this.input.length<6){
          alert('填入資料不能為空');
          postKeyValues ={}
          return;
        };
      for(var i = 0; i < this.input.length; i++){
        if(!this.input[i]){
          alert('填入資料不能為空');
          postKeyValues ={}
          return;
        };
        postKeyValues[this.userSchema[i]] = this.input[i];
      };
      this.$http
        .post("http://34.80.102.113:3000/leadline/user/create",postKeyValues)
        .then(response => {
          console.log(response.data);
          this.$router.push("/main/users/userInfo");
      });
    }
  },
  computed:{

  }
};

</script>
<style scoped>
.card {
  margin: 20px auto; /* Added */
  float: none; /* Added */
}
</style>
