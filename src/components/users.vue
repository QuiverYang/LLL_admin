<template>
  <div class="user">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <!-- <th scope="col">._id</th> -->
      <th scope="col">姓氏</th>
      <th scope="col">名稱</th>
      <th scope="col">性別</th>
      <th scope="col">電話</th>
      <th scope="col">生日</th>
      <th scope="col">email</th>
      <th scope="col">密碼</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,key) in changedUsers" v-bind:key="item.email">
      <th scope="row">{{key+1}}</th>
      <!-- <td>{{item._id}}</td> -->
      <td v-if="item._id !== cacheUser._id">{{item.name.lastName}}</td>
      <td v-if="item._id === cacheUser._id">
        <input type="text" class="form-control"
         v-model ="cacheLastName"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td v-if="item._id !== cacheUser._id">{{item.name.firstName}}</td>
      <td v-if="item._id === cacheUser._id">
        <input type="text" class="form-control"
         v-model ="cacheFirstName"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td v-if="item._id !== cacheUser._id">{{item.gender}}</td>
      <td v-if="item._id === cacheUser._id">
        <input type="text" class="form-control"
         v-model ="cacheGender"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td v-if="item._id !== cacheUser._id">{{item.phone}}</td>
      <td v-if="item._id === cacheUser._id">
        <input type="text" class="form-control"
         v-model ="cachePhone"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td v-if="item._id !== cacheUser._id">{{item.birthday}}</td>
      <td v-if="item._id === cacheUser._id">
        <input type="text" class="form-control"
         v-model ="cacheBirthday"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td v-if="item._id !== cacheUser._id">{{item.email}}</td>
      <td v-if="item._id === cacheUser._id">
        <input type="text" class="form-control"
         disabled 
         v-model ="cacheEmail"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td v-if="item._id !== cacheUser._id">{{item.password}}</td>
      <td v-if="item._id === cacheUser._id">
        <input type="text" class="form-control"
         v-model ="cachePassword"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td><a href="#" class="btn btn-outline-danger" @click.prevent="removeUser(item)">刪除</a></td>
      <td><a href="#" class="btn btn-outline-warning" @click.prevent="editUser(item)">編輯</a></td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td><input type="text" placeholder="姓氏" class="form-control" v-model="lastName"></td>
      <td><input type="text" placeholder="姓名" class="form-control" v-model="firstName"></td>
      <td><input type="text" placeholder="性別" class="form-control" v-model="gender"></td>
      <td><input type="text" placeholder="電話" class="form-control" v-model="phone"></td>
      <td><input type="text" placeholder="生日" class="form-control" v-model="birthday"></td>
      <td><input type="text" placeholder="email" class="form-control" v-model="email"></td>
      <td><input type="text" placeholder="密碼" class="form-control" v-model="password"></td>
      <td><a href="#" class="btn btn-outline-success" @click.prevent="addUser">新增</a></td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
export default {
  name: 'Store',
  data () {
    return {
      users:[],
      newUsers:[],
      firstName:'',
      lastName:'',
      phone:'',
      password:'',
      gender:'',
      email:'',
      birthday:'',
      cacheUser:{},
      cacheFirstName:'',
      cachePhone:'',
      cachePassword:'',
      cacheLastName:'',
      cacheGender:'',
      cacheBirthday:'',
      cacheEmail:'',
    }
  },
  methods:{
    removeUser(item){
      let newIndex ='';
      this.users.forEach(function(item2,index){
        if(item._id === item2._id ){
          newIndex = index;
          console.log(`index: ${index}`)
        }
      })
      this.axios.delete('http://34.80.102.113:3000/leadline/user/remove',{
        data:{email:item.email}
      }).then(response=>{
        console.log(item.email)
        this.users.splice(newIndex,1);
      })
    },
    addUser(){
      this.$http.post('http://34.80.102.113:3000/leadline/user/create',{
        firstName:this.firstName,
        lastName:this.lastName,
        phone:this.phone,
        password:this.password,
        gender:this.gender,
        birthday:this.birthday,
        email:this.email
      }).then(response=>{
        console.log(response.data);
        this.newUsers.push({
        firstName:this.firstName,
        phone:this.phone,
        password:this.password,
        gender:this.gender,
        birth:this.birthday,
        email:this.email,
        lastName:this.lastName
        });
      })
    },
    editUser(item){
      this.cacheUser = item;
      this.cacheFirstName=item.name.firstName;
      this.cachePhone=item.phone;
      this.cachePassword= item.password;
      this.cacheGender= item.gender;
      this.cachelastName= item.name.lastName;
      this.cacheEmail=item.email;
      this.cacheBirthday=item.birthday;
    },
    confirmEdit(item){
      item.firstName=this.cacheFirstName;
      item.lastName=this.cacheLastName;
      item.phone=this.cachePhone;
      item.password=this.cachePassword;
      item.gender=this.cacheGender;
      item.birthday=this.cacheBirthday;
      item.email=this.cacheEmail;
      this.$http.put('http://34.80.102.113:3000/leadline/user/update',{
        firstName:this.firstName,
        lastName:this.lastName,
        phone:this.phone,
        password:this.password,
        gender:this.gender,
        birthday:this.birthday,
        email:this.email
      },{headers:{'x-access-token':localStorage.getItem('token')}})
      .then((response)=>{

          console.log(response.data);
          this.cacheUser={},
          this.cacheFirstName='',
          this.cachePhone='',
          this.cachePassword='',
          this.cacheLastName='',
          this.cacheGender='',
          this.cacheBirthday='',
          this.cacheEmail=''
        
      })
    },
    cancleEdit(){
      this.cacheUser={},
      this.cacheFirstName='',
      this.cachePhone='',
      this.cachePassword='',
      this.cacheLastName='',
      this.cacheGender='',
      this.cacheBirthday='',
      this.cacheEmail=''
    },
  },
  computed:{
    changedUsers:function(){
      this.newUsers = this.users;
      return this.newUsers;
    }
  },
  created(){
    this.$http.get('http://34.80.102.113:3000/leadline/admin/getAllUsers',{
      headers:{'x-access-token':localStorage.getItem('token')}
      }).then((response)=>{
        console.log('user creation')
        this.users = response.data.msg.users;
        console.log(response.data.msg.users)
        this.users.forEach(function(item){
          item.ischanged = false;
        })
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
