<template>
<div>
  <el-row>
  <el-col :span="11">
    <img src="../assets/images/welcome.jpg" alt="welcome"/>
  </el-col>

  <el-col :span="13">
    <div class="formContainer">
      <logo></logo>
      <h3>REGISTER</h3>
    <el-form
      @submit.native.prevent
      status-icon
      :model="registerForm"
      :rules="rules"
      label-position="left"
      v-loading="loading"
      ref="registerForm"
    >
     
      <el-form-item prop="username" size="medium" >        
        <el-input
          size="medium"
          type="text"
          v-model="registerForm.username"
          auto-complete="off"
          placeholder="Username (4 to 15 characters)"
        ></el-input>        
      </el-form-item>
     

      <el-form-item prop="email" size="medium" >
        <el-input
          size="medium"
          type="text"
          v-model="registerForm.email"
          auto-complete="off"
          placeholder="Email"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password" size="medium">
        <el-input
          size="medium"
          type="password"
          v-model="registerForm.password"
          auto-complete="off"
          placeholder="Password (6 to 12 characters)"
        ></el-input>
      </el-form-item>

    <el-form-item v-show="registerForm.password!=''">
        <password-strength :password="registerForm.password"></password-strength>
    </el-form-item>

    <el-form-item prop="confirm" size="medium">
        <el-input
          size="medium"
          type="password"
          v-model="registerForm.confirm"
          auto-complete="off"
          placeholder="Confirm password"
        ></el-input>
      </el-form-item>

      <el-form-item prop="code" size="medium">
        <el-col :span="12">
          <el-input
            size="medium"
            type="text"
            v-model="registerForm.code"
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
          v-on:click="register"
        >register</el-button>
      </el-form-item>
    </el-form>
    
    <div >
      <span>
        Already have an account ?
        <router-link to="login">Log in</router-link>
      </span>
    </div>
  </div>
  </el-col>
</el-row>
</div>

</template>

<script>
import logo from "../components/Logo";
import PasswordStrength from "../components/PasswordStrength";
import VerificationCode from "../components/VerificationCode";

export default {
  name: 'Login',
  components: {logo,VerificationCode,PasswordStrength},
  data () {
    return {
      identifyCode:'',
      registerForm: {
          username: "",
          email:"",
          password: "",
          confirm:"",
          code:""
        },
        rules: {
          username: [
            {required:true,message:"Username is required",trigger:"change",trigger:"blur"},
            {pattern:/^[\w~!@#$%^&*()_+`\-={}:";'<>?,.\/]{4,15}$/, message:"Username's length should between 4 and 12",trigger:"change",trigger:"blur"},
          ],
          email: [
            {required:true, message:"Email is required",trigger:"change",trigger:"blur"},
            {pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message:"Invalid email", trigger:"change",trigger:"blur"},
          ],
          password: [
            {required:true, message:"Password is required", trigger:"change",trigger:"blur"},
            {pattern:/^[\w~!@#$%^&*()_+`\-={}:";'<>?,.\/]{6,12}$/, message:"Password's length should between 6 and 15",trigger:"change",trigger:"blur"},
            {
            validator:(rule,value,callback)=>{
              this.$refs.registerForm.validateField('confirm');
              callback();
            },
            trigger:"blur"
            },
          ],
          confirm: [
            {required:true, message:"Please confirm your password", trigger:"change",trigger:"blur"},
            {
            validator:(rule,value,callback)=>{
              if(value!= this.registerForm.password) {
                callback(new Error('Entered passwords differ from the another!'));
              }
              callback();
            },
            message:"Entered passwords differ from the another!",
            trigger:"change"
            },
          ],
          code:[
            {required:true, message:"Verification code is required", trigger:"change",trigger:"blur"},
            {
            validator:(rule,value,callback)=>{
              if(value.toUpperCase() != this.identifyCode.toUpperCase()) {
                callback(new Error('Verification code error'));
              }
              callback();
            },
            trigger:"blur"
            },
          ]
        },
        loading: false,
      }    
  },
  computed:{
    isDisabled(){
      return (this.registerForm.username == "") ||
             (this.registerForm.email == "") ||
             (this.registerForm.password =="") ||
             (this.registerForm.confirm == "") ||
             (this.registerForm.code == "") ||
            !/^[\w~!@#$%^&*()_+`\-={}:";'<>?,.\/]{4,15}$/.test(this.registerForm.username)||
            !/^[\w~!@#$%^&*()_+`\-={}:";'<>?,.\/]{6,12}$/.test(this.registerForm.password)||
            !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.registerForm.email) ||
            this.registerForm.password !== this.registerForm.confirm;
    }
  },
  methods:{
    getNewCode(code){
      this.identifyCode = code;
    },
    register() {
      this.loading = true;
      if(this.identifyCode.toUpperCase() != this.registerForm.code.toUpperCase()){
        this.notify('error','Wrong verification code!');
        this.$refs.code.$el.click();
        this.loading = false;
        return;
      }

      this.$axios
        .post("/register", {
          username: this.registerForm.username,
          email: this.registerForm.email,
          password: this.$md5(this.registerForm.password),
        })
        .then(resp => {          
          if (resp.status === 200 ) {
            console.log(resp);
            switch(resp.data){
              case "username duplicated":
                this.notify('warning','Username duplicated!');
                this.loading = false;
                break;
              case "email duplicated":
                this.notify('warning','Email duplicated!');
                this.loading = false;
                break;
              default:
                //Save token
                this.$store.commit("login", {"token":resp.data,"username":this.registerForm.username});
                this.notify('success','Welcome to FunTravel!');
                this.$router.replace({ path: "/" });
            }            
          }
        })
        .catch(error => {
          console.log(error);
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
  margin-left:50px;
}
.formContainer{
  padding:70px 100px 0 100px;
}

a{
  color:#f48840;
}

h3{  
  text-align: center;
}
</style>