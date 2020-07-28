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
                    <el-badge :is-dot="true" class="item"  >
                        {{username}}
                    </el-badge>
                </template>                
                <el-menu-item index="3-1"><router-link to="/my-favorite"> Favorite</router-link></el-menu-item>
                <el-menu-item index="3-2"><router-link to="/upload">Upload</router-link></el-menu-item>
                <el-menu-item index="3-3"><router-link to="/my-pictures">My pictures</router-link></el-menu-item>                
                <el-menu-item index="3-4">
                    <el-badge :is-dot="true" class="item">
                    <router-link to="/MyFriends">My Friends</router-link>
                    </el-badge>
                </el-menu-item>                
                <el-menu-item index="3-5" @click="dialogVisible = true">Logout</el-menu-item>
            </el-submenu>
            
        </el-menu>
      </el-col>
    </el-row>
    <el-dialog
        title="Confirm"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <span>Are you sure to logout?</span>        
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">No</el-button>
            <el-button type="danger" @click="logout">Yes</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import logo from "../components/Logo"

export default {
    name:"NavBar",
    components:{logo},
    props:['page'],
    data() {
      return {
        activeIndex: '1',
        isLogin: false,
        username: "USERNAME",
        dialogVisible:false,
      };
    },
    created(){
        if(this.$store.state.token){
            this.isLogin = true;
            this.username = this.$store.state.username;
        }                
        switch(this.page){
            case "Home":
                this.activeIndex = '1';
                break;
            case "Search":
                this.activeIndex = '2';
                break;
            case "Upload":
                this.activeIndex='3-2';
                break;
            case "MyPictures":
                this.activeIndex='3-3';
                break;
            case "MyFavorite":
                this.activeIndex='3-1';
                break;
            case "MyFriends":
                this.activeIndex='3-4';
                break;
        }
    },
    methods:{
        logout(){
            this.$store.commit("logout");
            this.$router.push("/login");
            this.notify("success","You have signed out!");
        },        
    }
  }
</script>

<style scoped>
.el-row{
    background-color: #f7f7f7;
    position:fixed;
    top:0;
    left:0;
    right:0;
    z-index:999;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.2);
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
.el-menu-item a{
    color: rgba(30,30,30);
}
.el-menu-item:hover{
    background-color: #f48840;
}
.el-menu-item:active{
    color: rgba(30,30,30);
}
</style>
