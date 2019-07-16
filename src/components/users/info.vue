<template>
  <div class="user">
    <div class="table-responsive">
      <table class="table table-striped">
        <thead class="thead-dark" @click="syncUsersNewUsers">
          <tr>
            <th scope="col">#</th>
            <template v-for="item in userSchema">
              <th scope="col" :key="item">
                <div class="text-center">{{ item }}</div>
              </th>
            </template>
            <th class="text-center">button1</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="(user,index) in users" :key="user.email">
            <th class="align-middle" scope="col">{{index+1}}</th>
            <template v-for="(value, names) in user"> 
              <td
                v-if="names!=='__v' && names !=='_id' && names !=='auth' && names !=='line' "
                class="align-middle"
                scope="col"
                :key="names"
                @dblclick="editUser2(names,index)"
                
                
              >
              <div  >
                <div class="text-center"
                  v-if="newUsers[index][names]===users[index][names]"
                    >
                  {{value}}
                </div>
                <div v-if="newUsers[index][names]!==users[index][names]">
                  <input
                    type="text"
                    class="form-control"
                    autofocus
                    :placeholder="value"
                    v-model="cacheInput"
                    @keyup.esc="cancleEdit(names, index)"
                    @keyup.enter="confirmEdit(names,index,cacheInput,user.email)"
                    
                  />
                </div>  
              </div>
                
              </td>
            </template>

            <th class="align-middle">
              <a href="#" class="btn btn-outline-danger" @click.prevent="removeUser(user)">刪除</a>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="center">
      <a href="#" class="btn btn-outline-success w-100" @click.prevent="addUser">新增</a>
    </div>

    

  </div>
</template>

<script>
import Vue from 'vue'

Vue.directive('closable', {
  bind (el, binding, vnode) {

  }
})

export default {
  name: "User",
  data() {
    return {
      users: [],
      newUsers: [],
      cacheInput: "",
      isClicked:false,
      userSchema: [],
      showPopup: false,
    };
  },
  methods: {
    addUser() {
      this.$router.push("/main/users/addUser");
    },
    test(){
      console.log('test')
    },
    syncUsersNewUsers(){
      var vm = this;
      for(let i = 0; i < vm.newUsers.length; i++){
        for(let key2 in vm.newUsers[i]){
          vm.newUsers[i][key2] = vm.users[i][key2];
        }
      }
      this.isClicked = false;
    },
    editUser2(names, key) {
      this.syncUsersNewUsers();
      this.isClicked = true;
      this.newUsers[key][names] = "-1";
    },
    confirmEdit(names, key, input, email) {
      //names -> key of object of users[key]
      //key -> index of users
      //input -> input value
      const postKeyValue = names;
      this.newUsers[key][names] = input;
      this.users[key][names] = input;
      this.$http
        .put(
          "http://34.80.102.113:3000/leadline/user/update",
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
      this.newUsers[key][names] = this.users[key][names];
      this.isClicked = false;
    },
    removeUser(item) {
      console.log(item);
      let newIndex = "";
      this.users.forEach(function(item2, index) {
        if (item._id === item2._id) {
          newIndex = index;
          console.log(`index: ${index}`);
        }
      });
      this.axios
        .delete("http://34.80.102.113:3000/leadline/user/remove", {
          data: { email: item.email }
        })
        .then(response => {
          console.log("user removed");
          this.users.splice(newIndex, 1);
          this.newUsers.splice(newIndex, 1);
        });
    },
    onClose () {
      this.showPopup = false
    }
  },
  computed: {
    changedUsers: function() {
      this.newUsers = this.users;
      return this.newUsers;
    }
  },
  created() {
    this.$http
    .get("http://34.80.102.113:3000/leadline/user/getUserSchema", {
      headers: { "x-access-token": localStorage.getItem("token") }
    })
    .then(response => {
      this.userSchema = response.data.msg;
      for(var i = 0; i < this.userSchema.length; i++){
        if(this.userSchema[i] === 'auth' || this.userSchema[i] ==='line'){
          this.userSchema.splice(i--,1);
        }
      }
      console.log('userSchema: '+this.userSchema);
    });

    this.$http
      .get("http://34.80.102.113:3000/leadline/admin/getAllUsers", {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
      .then(response => {
        console.log("user creation");
        this.users = response.data.msg.users;
        this.newUsers = _.cloneDeep(this.users);
        console.log(response.data.msg.users);
        
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
