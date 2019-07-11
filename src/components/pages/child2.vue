<template>
  <div>

        <!-- Page Content -->
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
              <h1 class="display-4">新增</h1>
                <div class="form-inline">
                  <div class="form-label-group">
                    <input type="text" id="inputName" class="form-control" placeholder="名稱" required="required" autofocus="autofocus" v-model="name">
                    <label for="inputName">名稱</label>
                  </div>
                </div>
                <div class="form-inline btn_input">
                  <div class="form-label-group">
                    <input type="password" id="inputPassword" class="form-control" placeholder="密碼" required="required" v-model="password">
                    <label for="inputPassword">密碼</label>
                  </div>
                </div>
                <div class="form-inline btn_input">
                  <div class="form-label-group">
                    <input type="text" id="inputPhone" class="form-control" placeholder="電話" required="required">
                    <label for="inputPhone">電話</label>
                  </div>
                </div>
                <div class="form-inline btn_input">
                  <div class="form-label-group">
                    <input type="email" id="inputEmail" class="form-control" placeholder="eamil" required="required" autofocus="autofocus">
                    <label for="inputEmail">e-mail</label>
                  </div>
                </div>
                <button type="submit" class="btn btn-secondary" @click="post">try it</button>
                <a class="btn btn-primary btn_input" href="" @click="post">Login</a>
          </div>
          <div class="col-md-4"></div>
          
          {{name}}
        </div>
      </div>

</template>



<script>
export default {
  data () {
    return {

    }
  }
}
</script>