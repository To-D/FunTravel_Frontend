<template>
<div>
  <el-row>
  <el-col :span="11">
    <img src="../assets/images/welcome.jpg" alt="Image"/>
  </el-col>

  <el-col :span="13">
    <div class="loginFormContainer">
      <logo></logo>
      <h3>LOG IN</h3>
    <el-form
      @submit.native.prevent
      status-icon
      :model="loginForm"
      :rules="rules"
      label-position="left"
      v-loading="loading"
    >
      <el-form-item prop="user" size="medium" >
        <el-input
          size="medium"
          type="text"
          v-model="loginForm.user"
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

      <el-form-item prop="code" size="medium">
        <el-col :span="12">
          <el-input
            size="medium"
            type="text"
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="Verification Code"
          ></el-input>
        </el-col>

        <el-col :span="12">
          <verification-code @refresh="getNewCode" ref="code"></verification-code>
        </el-col>
      </el-form-item>

      <el-form-item size="medium">
        <el-button
          native-type="submit"
          :disabled ="isDisabled"
          size="medium"
          type="warning"
          style="width:100% "
          v-on:click="login"
        >Log In</el-button>
      </el-form-item>
    </el-form>
    
    <div >
      <span>
        Don't have an account yet?
        <router-link to="register">Create one</router-link>
      </span>
    </div>
  </div>
  </el-col>
</el-row>
</div>

</template>

<script>
import logo from "../components/Logo";
import VerificationCode from "../components/VerificationCode";

export default {
  name: 'Login',
  components: {logo,VerificationCode},
  data () {
    return {
      identifyCode:'',
      loginForm: {
          user: "",
          password: "",
          code:""
        },
        rules: {
          user: [
            {required:true,message:"Username or email is required",blur:"change"}
          ],
          password: [
            {required:true, message:"Password is required", blur:"change"},
             {pattern:/^[\w~!@#$%^&*()_+`\-={}:";'<>?,.\/]{6,12}$/, message:"Invalid password",blur:"change"},
          ],
          code:[
            {required:true, message:"Verification code is required", blur:"change"},
            {
            validator:(rule,value,callback)=>{
              if(value.toUpperCase() != this.identifyCode.toUpperCase()) {
                callback(new Error('Verification code error'));
              }
              callback();
            },
            trigger:"blur"
            }
          ]
        },
        loading: false,
      }    
  },
  computed:{
    isDisabled(){
      return (this.loginForm.user == "") ||
             (this.loginForm.password =="") ||
             (this.loginForm.code =="") ||
              !/^[\w~!@#$%^&*()_+`\-={}:";'<>?,.\/]{6,12}$/.test(this.loginForm.password);
    }
  },
  methods:{
    getNewCode(code){
      this.identifyCode = code;
    },
    login() {
      this.loading = true;
      if(this.identifyCode.toUpperCase() != this.loginForm.code.toUpperCase()){
        this.notify('error','Wrong verification code!');
        this.$refs.code.$el.click();
        this.loading = false;
        return;
      }

      this.$axios
        .post("/login", {
          userIdentifier: this.loginForm.user,
          password: this.$md5(this.loginForm.password),
        })
        .then(resp => {
          console.log(resp);
          if (resp.status === 200 && resp.data.hasOwnProperty("token")) {
            //Save token
            this.$store.commit("login", resp.data);
            this.notify('success','Welcome back!');
            this.$router.replace({ path: "/" });            
          } else {
            this.notify('error','Username/Email or password is wrong!');
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
          this.notify('error','Username/Email or password is wrong!');
          this.loading = false;
        });
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  width:80%;
  height:750px;
  margin-top:5px;
}
.loginFormContainer{
  padding:100px 100px 0 100px;
}
</style>