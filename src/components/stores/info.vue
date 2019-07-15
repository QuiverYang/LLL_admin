<template>
  <div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <template v-for="item in storeSchema">
              <th scope="col" :key="item">
                <div class="text-center">{{ item }}</div>
              </th>
            </template>
            <th class="text-center">button1</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="(item,key) in stores" v-bind:key="item.name">
            <th class="align-middle" scope="col">{{key+1}}</th>
            <template v-for="(value, names) in item">
              <td v-if="names!=='__v' && names !=='_id'" class="align-middle" scope="col" :key="names" @dblclick="editStore2(names,key)">
                <div
                  class="text-center"
                  v-if="newStores[key][names]===stores[key][names]"
                >{{value}}</div>
                <div v-if="newStores[key][names]!==stores[key][names]">
                  <input
                    type="text"
                    class="form-control"
                    autofocus
                    :placeholder="value"
                    v-model="cacheInput"
                    @keyup.esc="cancleEdit(names, key)"
                    @keyup.enter="confirmEdit(names,key,cacheInput,item.email)"
                  />
                </div>
              </td>
            </template>

            <th class="align-middle">
              <a href="#" class="btn btn-outline-danger" @click.prevent="removeStore(item)">刪除</a>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="center">
      <a href="#" class="btn btn-outline-success w-100" @click.prevent="addStore">新增</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Store",
  data() {
    return {
      stores: [],
      newStores: [],
      cacheInput: "",
      storeSchema: []
    };
  },
  methods: {
    removeStore(item) {
      console.log(item);
      let newIndex = "";
      this.stores.forEach(function(item2, index) {
        if (item._id === item2._id) {
          newIndex = index;
          console.log(`index: ${index}`);
        }
      });
      this.axios
        .delete("http://34.80.102.113:3000/leadline/store/remove", {
          data: { email: item.email }
        })
        .then(response => {
          console.log("store removed");
          this.stores.splice(newIndex, 1);
          this.newStores.splice(newIndex, 1);
        });
    },
    addStore() {
      this.$router.push("/main/stores/addStore");
    },
    editStore2(names, key) {
      this.newStores[key][names] = "-1";
    },
    confirmEdit(names, key, input, email) {
      //names -> key of object of stores[key]
      //key -> index of stores
      //input -> input value
      const postKeyValue = names;
      this.newStores[key][names] = input;
      this.stores[key][names] = input;
      this.$http
        .put(
          "http://34.80.102.113:3000/leadline/store/update",
          {
            email: email,
            postKeyValue: names,
            input: input
          },
          { headers: { "x-access-token": localStorage.getItem("token") } }
        )
        .then(response => {
          console.log(response.data);
          this.cacheInput = "";
        });
    },
    cancleEdit(names, key) {
      this.newStores[key][names] = this.stores[key][names];
    }
  },
  created() {
    this.$http
      .get("http://34.80.102.113:3000/leadline/store/getStoreSchema", {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
      .then(response => {
        this.storeSchema = response.data.msg;
      });
    this.$http
      .get("http://34.80.102.113:3000/leadline/admin/getAllStores", {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
      .then(response => {
        const stores = response.data.msg.stores;
        this.stores = [...stores];
        // this.stores.forEach(function(item){
        //   item.isEditing = false;
        // })
        this.newStores = _.cloneDeep(this.stores);
      });
  },
  beforeMount() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td {
  font-size: 0.5rem;
  max-width: 100px;
  word-wrap: break-word;
}
td,
th {
  padding: 0.1rem;
}
td > input {
  font-size: 0.5rem;
  white-space: nowrap;
}
thead tr th {
  padding: 15px !important;
}
.center {
  display: flex;
  justify-content: center;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
