<template>
  <div class="addExhibition">
    <div class="card pb-3" style="width: 20rem;">
      <div class="card-body">
        <h5 class="card-title">新增活動</h5>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">活動名稱:</span>
          </div>
          <input
            v-model="input[0]"
            type="text"
            class="form-control"
            placeholder="活動名稱"
            aria-label="活動名稱"
            aria-describedby="basic-addon1"
          />
        </div>
        <div class="block" id="inputDate">
          <el-date-picker
            class="w-100"
            size="large"
            v-model="dates"
            type="daterange"
            range-separator="至"
            start-placeholder="開始日期"
            end-placeholder="結束日期"
          ></el-date-picker>
        </div>
      </div>

      

      <div class="ml-3 mr-3">
        <a href="#" @click="addStore" class="btn btn-success w-100">新增</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['toexhibitions'],
  data() {
    return {
      exhibitionSchema: [],
      postKeyValues: {},
      input: [],
      dates: [],
      exhibitionsNames:[]
    };
  },
  created: function() {
    this.$http
      .get(
        "http://34.80.102.113:3000/leadline/exhibition/getExhibitionSchema",
        {
          headers: { "x-access-token": localStorage.getItem("token") }
        }
      )
      .then(response => {
        this.exhibitionSchema = response.data.msg;
      });
    this.exhibitionsNames = this.toexhibitions;
  },
  methods: {
    addStore() {
      let postKeyValues = {};
      this.input.push(this.dates[0]);
      this.input.push(this.dates[1]);
      if (this.input.length < 3) {
        alert("填入資料不能為空");
        postKeyValues = {};
        return;
      }
      for (var i = 0; i < this.input.length; i++) {
        if (!this.input[i] || this.input.length < 3) {
          alert("填入資料不能為空");
          postKeyValues = {};
          return;
        }
        postKeyValues[this.exhibitionSchema[i]] = this.input[i];
      }
      this.exhibitionsNames.push(this.input[0]);
      this.$emit('changeExhibition', this.exhibitionsNames);
      this.$http
        .post(
          "http://34.80.102.113:3000/leadline/exhibition/create",
          postKeyValues
        )
        .then(response => {
          console.log(response.data);
          this.$router.push("/main/exhibitions/exhibitionInfo");
        });
    }
  }
};
</script>

<style>
.card {
  margin: 20px auto; /* Added */
  float: none; /* Added */
}

#inputDate .el-date-editor .el-range-separator {
  width: 10%;
}
</style>