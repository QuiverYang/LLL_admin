<template>
  <div class="hello">
      <ul class="nav">
        <li class="nav-item">
            <router-link class="nav-link" to="/pages">卡片1</router-link>
        </li>
        <li class="nav-item">
             <router-link class="nav-link" to="/pages/child2">卡片2</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/pages/child3">卡片3</router-link>
        </li>
        
        <li class="nav-item">
            <div class="input-group flex-nowrap">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="addon-wrapping">@</span>
                </div>
                <input type="text" class="form-control" placeholder="id" aria-label="Username" aria-describedby="addon-wrapping" v-model="id">
            </div>
        </li>
        <li class="nav-item">
            <div class="input-group flex-nowrap">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="addon-wrapping">@</span>
                </div>
                <input type="text" class="form-control" placeholder="password" aria-label="Username" aria-describedby="addon-wrapping" v-model="pw">
            </div>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="login">登入</a>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
        id:'',
        pw:''
    }
  },
  methods:{
      login(){
          this.axios.post('http://34.80.102.113:3000/leadline/test/b').then((response)=>{
              let data = response.data;
              let password = data.msg.password;
              if(password === this.pw){
                  this.$router.push('/pages/child2')
              }else{
                  alert('fail');
              }
            })
          
      }
  }
}
</script>