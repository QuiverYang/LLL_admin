<template>
  <div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead class="thead-dark"  @click="syncUsersNewUsers">
          <tr>
            <th scope="col" class="text-center">#</th>
            <!-- <template v-for="item in exhibitionSchema">
              <th scope="col" :key="item">
                <div class="text-center">{{ item }}</div>
              </th>
            </template> -->
            <template v-for="(value,key) in exhibitions[0]" >
              <th scope="col" v-if="key!=='__v' && key !=='_id' && key !=='allPosts'" v-bind:key="key">
                <div class="text-center">{{ key }}</div>
              </th>
            </template>

            <th class="text-center">button1</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="(item,index) in exhibitions" v-bind:key="index">
            <th class="align-middle" scope="col">{{index+1}}</th>
            <template v-for="(value, key) in item">
              <td v-if="key!=='__v' && key !=='_id' && key !=='allPosts'"
                  class="align-middle"
                  scope="col"
                  :key="key"
                  @dblclick="editExhibition2(key,index)">
                <div
                  class="text-center"
                  v-if="newExhibitions[index][key]===exhibitions[index][key]"
                >{{value}}</div>
                <div v-if="newExhibitions[index][key]!==exhibitions[index][key]">
                  <input
                    type="text"
                    class="form-control"
                    autofocus
                    :placeholder="value"
                    v-model="cacheInput"
                    @keyup.esc="cancleEdit(key, index)"
                    @keyup.enter="confirmEdit(key,index,cacheInput,item.name)"
                  />
                </div>
              </td>
            </template>

            <th class="align-middle">
                <a href="#" class="btn btn-outline-danger" style="font-size:0.5rem" @click.prevent="removeExhibition(item)">刪除</a>
              <!-- <i href="#" class="el-icon-delete red" @click.prevent="removeExhibition(item)"></i> -->
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="center">
      <a href="#" class="btn btn-outline-success w-100 mb-5 mt-3" @click.prevent="addExhibition">新增</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExhibitionInfo",
  data() {
    return {
      exhibitions: [],
      newExhibitions: [],
      cacheInput: "",
      exhibitionSchema: [],
      isClicked:false,
    };
  },
  methods: {
    
    removeExhibition(item) {
      console.log(item);
      let newIndex = "";
      let exhibitNames=[];
      this.exhibitions.forEach(function(item2, index) {
        
        if (item._id === item2._id) {
          newIndex = index;
        }else{
          exhibitNames.push(item2.name);
        }
      });
      this.$emit('changeExhibition', exhibitNames);
      this.axios
        .delete("http://34.80.102.113:3000/leadline/exhibition/remove", {
          data: { name: item.name }
        })
        .then(response => {
          console.log("exhibition removed");
          this.exhibitions.splice(newIndex, 1);
          this.newExhibitions.splice(newIndex, 1);
        });
    },
    addExhibition() {
      this.$router.push("/main/exhibitions/addExhibition");
    },
    syncUsersNewUsers(){
      var vm = this;
      for(let i = 0; i < vm.newExhibitions.length; i++){
        for(let key2 in vm.newExhibitions[i]){
          vm.newExhibitions[i][key2] = vm.exhibitions[i][key2];
        }
      }
      this.isClicked = false;
    },
    editExhibition2(key, index) {
      this.syncUsersNewUsers();
      this.isClicked = true;
      this.newExhibitions[index][key] = "-1";
    },
    confirmEdit(names, index, input, name) {
      //names -> key of object of exhibitions[key]
      //index -> index of exhibitions
      //input -> input value
      const postKeyValue = names;
      this.newExhibitions[index][names] = input;
      this.exhibitions[index][names] = input;
      this.$http
        .put(
          "http://34.80.102.113:3000/leadline/exhibition/update",
          {
            name: name,
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
    cancleEdit(names, index) {
      this.newExhibitions[index][names] = this.exhibitions[index][names];
      this.isClicked = false;
    }
  },
  created() {
    this.$http
      .get("http://34.80.102.113:3000/leadline/exhibition/getExhibitionSchema", {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
      .then(response => {
        this.exhibitionSchema = response.data.msg;
      });
    this.$http
      .get("http://34.80.102.113:3000/leadline/admin/getAllExhibitions", {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
      .then(response => {
        const exhibitions = response.data.msg.exhibitions;
        this.exhibitions = [...exhibitions];
        // this.exhibitions.forEach(function(item){
        //   item.isEditing = false;
        // })
        this.newExhibitions = _.cloneDeep(this.exhibitions);
        
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
