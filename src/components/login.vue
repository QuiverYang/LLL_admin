<template>
  <div class="store">
    <div class="container">
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h3>Sign In</h3>
                    <div class="d-flex justify-content-end social_icon">
                        <span><i class="fab fa-facebook-square"></i></span>
                        <span><i class="fab fa-google-plus-square"></i></span>
                        <span><i class="fab fa-twitter-square"></i></span>
                    </div>
                </div>
                <div class="card-body">
                    <form>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="account" v-model="account">
                            
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="password" class="form-control" placeholder="password" v-model="password">
                        </div>
                        <div class="row align-items-center remember">
                            <input type="checkbox">Remember Me
                        </div>
                        <div class="form-group">
                            <a href="#" class="btn float-right btn-outline-primary" @click.prevent="login">login</a>
                        </div>
                    </form>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-center links">
                        Don't have an account?<a href="#">Sign Up</a>
                    </div>
                    <div class="d-flex justify-content-center">
                        <a href="#">Forgot your password?</a>
                        <a href="#" @click="test">test</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Store',
  data () {
    return {
        token:'',
        account:'',
        password:''
    }
  },
  methods: {
      login(){
            console.log(this.account)
            this.$http.post('http://34.80.102.113:3000/leadline/auth/getToken',{
                account:this.account,
                password:this.password
            }).then((response)=>{
                let status = response.data.status;
                if(status == 200){
                    console.log('200')
                    this.token = response.data.token
                    localStorage.setItem('token', this.token)
                    console.log(this.token);
                    this.$router.push('/main/stores')
                }else{
                    console.log('400')
                    this.$router.push('/err404')
                }
            })
        },
        test(){
            this.token = localStorage.getItem('token');
            console.log(this.token);
            // this.$http.post('http://127.0.0.1:3000/leadline/test/c'),{
            //     account:this.account
            // },{
            //     headers:{
            //         "x-access-token":eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI1ZDEyZGI2ZTM0OGI1ODk3OTQxMmE2NDUiLCJpYXQiOjE1NjIzMjg3OTIsImV4cCI6MTU2MjQxNTE5Mn0.brlNwPVnGjVu4MV739vRH-LR1_-WU_cKfYRWx03Obds
            //     }
            // }
        }
  }
//   created(){
//     this.$http.get('http://127.0.0.1:3000/leadline/admin/getAllStores').then((response)=>{
//           console.log(response.data);
//       })
//   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container {
    margin-top: 30px
    }
</style>
