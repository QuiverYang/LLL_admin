<template>
  <div class="addStore">
    <div class="card" style="width: 30rem;">
      <div class="card-body">
        <h5 class="card-title">新增店家</h5>
        <template v-for="item in storeSchema">
          <div class="input-group mb-3" :key="item">
            <div class="input-group-prepend" style="width : 150px">
              <span class="input-group-text" style="width:100%">{{item}}</span>
            </div>
            <input
              type="text"
              class="form-control"
              :placeholder="item"
            />
          </div>
        </template>
        <a href="#" class="btn btn-success w-100">新增</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storeSchema: []
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
      this.$http
        .post("http://34.80.102.113:3000/leadline/store/create", {
          name: this.name,
          phone: this.phone,
          password: this.password,
          address: this.address,
          info: this.info,
          currentExhibit: this.currentExhibit,
          email: this.email
        })
        .then(response => {
          console.log(response.data);
          this.newStores.push({
            name: this.name,
            phone: this.phone,
            password: this.password,
            address: this.address,
            info: this.info,
            currentExhibit: this.currentExhibit,
            email: this.email
          });
          this.$router.push("/main/stores/addStore");
        });
    }
  }
};
</script>

<style scoped>
.card {
  margin: 20px auto; /* Added */
  float: none; /* Added */
}
</style>
