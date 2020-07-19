<template>
<div>
  <el-form
    @submit.native.prevent
    status-icon
    :model="loginForm"
    :rules="rules"
    class="login_container"
    label-position="left"
    label-width="0px"
    v-loading="loading"
  >
    <el-form-item prop="username" size="medium" >
      <el-input
        size="medium"
        type="text"
        v-model="loginForm.username"
        auto-complete="off"
        placeholder="Username/Email"
      ></el-input>
    </el-form-item>

    <el-form-item prop="password" size="medium">
      <el-input
        size="medium"
        type="password"
        v-model="loginForm.password"
        auto-complete="off"
        placeholder="Password"
      ></el-input>
    </el-form-item>

    <el-form-item size="medium">
      <el-button
        native-type="submit"
        :disabled ="isDisabled"
        size="medium"
        type="primary"
        style="width:100% "
        v-on:click="login"
      >Sign In</el-button>
    </el-form-item>
  </el-form>
  
  <div class="text-center text-small text-muted">
    <span>
      Don't have an account yet?
      <router-link to="register">Create one</router-link>
    </span>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            {required:true,message:"Username is required",blur:"change"},
            {pattern:/^[a-zA-Z-][a-zA-Z0-9-_]{4,31}$/,message:"Invalid username/email",blur:"change"}
          ],
          password: [
            {required:true, message:"Password is required", blur:"change"},
            {pattern:/^[\w-]{6,32}$/, message:"Invalid password",blur:"change"},
          ]
        },
        loading: false,
      }    
  },
  computed:{
    isDisabled(){
      return (this.loginForm.username == "") || (this.loginForm.password =="");
    }
  },
  methods:{
        login() {
        // Turn to loading mode when the form is submitted,and come back when getting response
        this.loading = true;
        this.$axios
          .post("/login", {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty("token")) {
              //Save token
              this.$store.commit("login", resp.data);
              this.$message({
                dangerouslyUseHTMLString: true,
                type:'success',
                message: '<strong style="color:teal">Welcome back!</strong>',
                center:true
              });
              this.$router.replace({ path: "/" });            
            } else {
              this.errorNotification();
              this.loading = false;
            }
          })
          .catch(error => {
            console.log(error);
            this.errorNotification();
            this.loading = false;
          });
      }
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
