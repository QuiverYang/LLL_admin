<template>
  <div id="app">
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">LeadLL</a>
      <div class="collapse navbar-collapse">
        <ul class="nav nav-tabs mr-auto">
          
          <li class="nav-item">
            <router-link class="nav-link" to="/main/stores">店家資訊</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/main/users">使用者資訊</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/main/analysis">動線分析</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="clearToken">登入/登出</a>
            </li>
        </ul>


      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
      clearToken(){
          localStorage.removeItem('token');
          console.log('removed token');
          this.$router.push('/login')
      }
  },
}
</script>


