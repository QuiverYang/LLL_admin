<template>
  <div class="store">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <!-- <th scope="col">._id</th> -->
      <th scope="col">公司名稱</th>
      <th scope="col">密碼</th>
      <th scope="col">電話</th>
      <th scope="col">地址</th>
      <th scope="col">店家資訊</th>
      <th scope="col">email</th>
      <th scope="col">目前參展</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,key) in changedStores" v-bind:key="item.name">
      <th scope="row">{{key+1}}</th>
      <!-- <td>{{item._id}}</td> -->
      <td v-if="item._id !== cacheStore._id">{{item.name}}</td>
      <td v-if="item._id === cacheStore._id">
        <input type="text" class="form-control"
         v-model ="cacheName"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td v-if="item._id !== cacheStore._id">{{item.password}}</td>
      <td v-if="item._id === cacheStore._id">
        <input type="text" class="form-control"
         v-model ="cachePassword"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td v-if="item._id !== cacheStore._id">{{item.phone}}</td>
      <td v-if="item._id === cacheStore._id">
        <input type="text" class="form-control"
         v-model ="cachePhone"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td v-if="item._id !== cacheStore._id">{{item.address}}</td>
      <td v-if="item._id === cacheStore._id">
        <input type="text" class="form-control"
         v-model ="cacheAddress"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td v-if="item._id !== cacheStore._id">{{item.info}}</td>
      <td v-if="item._id === cacheStore._id">
        <input type="text" class="form-control"
         v-model ="cacheInfo"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td v-if="item._id !== cacheStore._id">{{item.email}}</td>
      <td v-if="item._id === cacheStore._id">
        <input type="text" class="form-control"
         disabled 
         v-model ="cacheEmail"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td v-if="item._id !== cacheStore._id">{{item.currentExhibit}}</td>
      <td v-if="item._id === cacheStore._id">
        <input type="text" class="form-control"
         v-model ="cacheCurrentExhibit"
         @keyup.esc="cancleEdit()"
         @keyup.enter="confirmEdit(item)">
      </td>
      <td><a href="#" class="btn btn-outline-danger" @click.prevent="removeStore(item)">刪除</a></td>
      <td><a href="#" class="btn btn-outline-warning" @click.prevent="editStore(item)">編輯</a></td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td><input type="text" placeholder="公司名稱" class="form-control" v-model="name"></td>
      <td><input type="text" placeholder="密碼" class="form-control" v-model="password"></td>
      <td><input type="text" placeholder="電話" class="form-control" v-model="phone"></td>
      <td><input type="text" placeholder="地址" class="form-control" v-model="address"></td>
      <td><input type="text" placeholder="店家資訊" class="form-control" v-model="info"></td>
      <td><input type="text" placeholder="email" class="form-control" v-model="email"></td>
      <td><input type="text" placeholder="目前參展" class="form-control" v-model="currentExhibit"></td>
      <td><a href="#" class="btn btn-outline-success" @click.prevent="addStore">新增</a></td>
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
      stores:[],
      newStores:[],
      name:'',
      phone:'',
      password:'',
      address:'',
      info:'',
      currentExhibit:'',
      email:'',
      cacheStore:{},
      cacheName:'',
      cachePhone:'',
      cachePassword:'',
      cacheAddress:'',
      cacheInfo:'',
      cacheCurrentExhibit:'',
      cacheEmail:'',
    }
  },
  methods:{
    removeStroe(item){
      let newIndex ='';
      this.stores.forEach(function(item2,index){
        if(item._id === item2._id ){
          newIndex = index;
          console.log(`index: ${index}`)
        }
      })
      this.stores.splice(newIndex,1);
    },
    addStore(){
      this.$http.post('http://34.80.102.113:3000/leadline/store/create',{
        name:this.name,
        phone:this.phone,
        password:this.password,
        address:this.address,
        info:this.info,
        currentExhibit:this.currentExhibit,
        email:this.email
      }).then(response=>{
        console.log(response.data);
        this.newStores.push({
        name:this.name,
        phone:this.phone,
        password:this.password,
        address:this.address,
        info:this.info,
        currentExhibit:this.currentExhibit,
        email:this.email
        });
      })
    },
    editStore(item){
      this.cacheStore = item;
      this.cacheName=item.name;
      this.cachePhone=item.phone;
      this.cachePassword= item.password;
      this.cacheAddress= item.address;
      this.cacheInfo= item.info;
      this.cacheCurrentExhibit= item.currentExhibit;
      this.cacheEmail=item.email;

    },
    confirmEdit(item){
      item.name=this.cacheName;
      item.phone=this.cachePhone;
      item.password=this.cachePassword;
      item.address=this.cacheAddress;
      item.info=this.cacheInfo;
      item.currentExhibit=this.cacheCurrentExhibit;
      item.email=this.cacheEmail;
      this.$http.put('http://34.80.102.113:3000/leadline/store/update',{
        name:this.cacheName,
        phone:this.cachePhone,
        password:this.cachePassword,
        address:this.cacheAddress,
        info:this.cacheInfo,
        currentExhibit:this.cacheCurrentExhibit,
        email:this.cacheEmail
      },{headers:{'x-access-token':localStorage.getItem('token')}})
      .then((response)=>{

          console.log(response.data);
          this.cacheStore = {};
          this.cacheName='';
          this.cachePhone='';
          this.cachePassword= '';
          this.cacheAddress= '';
          this.cacheInfo= '';
          this.cacheCurrentExhibit= '';
          this.cacheEmail='';
        
      })
    },
    cancleEdit(){
      this.cacheStore = {};
      this.cacheName='';
      this.cachePhone='';
      this.cachePassword= '';
      this.cacheAddress= '';
      this.cacheInfo= '';
      this.cacheCurrentExhibit= '';
      this.cacheEmail='';
    },
  },
  computed:{
    changedStores:function(){
      this.newStores = this.stores;
      return this.newStores;
    }
  },
  created(){
    this.$http.get('http://34.80.102.113:3000/leadline/admin/getAllStores',{
      headers:{'x-access-token':localStorage.getItem('token')}
      }).then((response)=>{
        console.log(response.data.msg.stores[0]);
        this.stores = response.data.msg.stores;
        this.stores.forEach(function(item){
          item.ischanged = false;
        })
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
