<template>
<div>
    <el-row  class="navbar">
    <el-col :span="8">
        <logo></logo>
    </el-col>
    <el-col :span="16">
        <el-menu 
        :default-active="activeIndex" 
        mode="horizontal" 
        id="menu" 
        active-text-color=" #f48840"
        text-color="#1e1e1e"
        >
            <el-menu-item index="1" >
                <router-link to="/">HOME</router-link>
            </el-menu-item>
            <el-menu-item index="2" >
                <router-link to="/search">SEARCH</router-link>                
            </el-menu-item>
            <el-menu-item index="3" v-if="!isLogin">
                <router-link to="/login">LOGIN</router-link>
            </el-menu-item>
                        
            <el-submenu index="3" v-else>
                <template slot="title">
                    <el-badge is-dot="true" class="item"  >
                        {{username}}
                    </el-badge>
                </template>
                
                <el-menu-item index="2-1">My Favorite</el-menu-item>
                <el-menu-item index="2-2">Upload</el-menu-item>
                <el-menu-item index="2-3">My pictures</el-menu-item>
                <el-badge is-dot="true" class="item">
                <el-menu-item index="2-3">My Friends</el-menu-item>
                </el-badge>
                <el-menu-item index="2-3" @click="logout">Logout</el-menu-item>
            </el-submenu>
            
        </el-menu>
      </el-col>
    </el-row>
    </div>
</template>

<script>
import logo from "../components/Logo"

export default {
    name:"NavBar",
    components:{logo},
    data() {
      return {
        activeIndex: '1',
        isLogin: false,
        username: "USERNAME"
      };
    },
    created(){
        if(this.$store.state.token){
            this.isLogin = true;
            this.username = this.$store.state.username;
        }
    },
    methods:{
        logout(){
            this.$confirm("Are you sure to sign out?", "Sign Out", {
                confirmButtonText: "Yes",
                cancelButtonText: "No"
            })
            .then(() => {
                this.$store.commit("logout");
                this.$router.push("/login");
                this.notify("success","You have signed out!")
            })
        }
    }
  }
</script>

<style scoped>
.el-row{
    background-color: #f7f7f7;
}
#menu{
    padding:25px 0 0 500px;
    border-bottom:solid 0px;
    background-color: #f7f7f7;
}
#menu .el-menu-item{
    font-weight:900;
}
#menu .el-submenu__title .el-badge{
    font-weight:900;
}
</style>
