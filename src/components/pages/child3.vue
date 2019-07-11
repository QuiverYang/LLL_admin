<template>
  <div>
        <img src="" class="card-img-top" alt="nothing">
        <div class="card-body">
            <h5 class="card-title">Card 3</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created(){
      console.log(this.$route.params.firstName);
      console.log(this.$route.params.lastName);
      const firstName = this.$route.params.firstName;
      const lastName = this.$route.params.lastName;
      this.$http.get('http://34.80.102.113:3000/leadline/user/get?firstName='+firstName+'&lastName='+lastName).then((response)=>{
          console.log(response.data);
      })
  }
}
</script>