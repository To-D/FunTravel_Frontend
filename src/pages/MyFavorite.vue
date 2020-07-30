<template>
<div>
    <navbar page="MyFavorite"></navbar>
    <div class="out-container">        
        <el-row>
        <el-col :span=6 :offset="9">
            <h2>My Favorite</h2>
        </el-col>
        <el-col :span="3" :offset="1" class="track">
            <i class="el-icon-view" v-if="view" style="color:#f48840"> PUBLIC  </i> 
            <i class="el-icon-view" v-else style="color:#C0CCDA"> PRIVATE</i> 
            <el-switch
                v-model="view"                
                active-color="#f48840"
                @change="changeView"
                >
            </el-switch>
            
        </el-col>
        <el-col :span="3">
            <el-dropdown class="track" @command="handleCommand">
                <span class="el-dropdown-link">
                    <i class="el-icon-timer" style="color:#f48840"> FOOTPRINT</i>                    
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item 
                     v-for="(history,index) in histories" 
                     :key="index" 
                     :command="history.id">
                        {{history.title}}
                     </el-dropdown-item>                
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>        
        </el-row>
        
        </div>
        <show-picture v-if="childStart" :pictures="pictures" page="MyFavorite"></show-picture>
    
    <foot></foot>
</div>
</template>

<script>
import navbar from "../components/NavBar"
import foot from "../components/Footer"
import ShowPicture from "../components/ShowPicture"


export default {
    name:"MyFavorite",
    components:{navbar,foot,ShowPicture},
    data(){
        return{
            pictures:[],
            childStart:false,
            histories:[],
            view:null,
        }
    },
    methods:{
        handleCommand(command) {
            this.$router.push("/picture-detail/"+command);
        },
        changeView(){
            this.$axios
            .post("/setView",{
                view:this.view?1:0,
                username:this.$store.state.username
            })
            .then(resp=>{
                if(resp.status===200){                    
                }
            })
            .catch(error=>{
                console.log(error);
            })

        }
    },
    created(){
        if(!this.$store.state.token){
            this.$router.push("/login");
            this.notify("warning","Log in first!");
            return;
        }

        this.histories = JSON.parse(this.$store.state.histories);      

        this.$axios
        .post('/getMyFavorite',{
            username:this.$store.state.username,
        })
        .then(resp=>{            
            if(resp.status === 200){
                this.pictures = resp.data;
                this.childStart = true;
            }
        })
        .catch(error=>{
            console.log(error);
        })        
        this.$axios
        .post('/getView',{
            username:this.$store.state.username,
        })
        .then(resp=>{            
            if(resp.status === 200){
                this.view = resp.data;                
            }
        })
        .catch(error=>{
            console.log(error);
        })        
    },
}
</script>

<style scoped>
.out-container{
    margin-top:130px;
}

.track{
    margin-top:40px
}

.track i{
    font-size: 18px;
    cursor: auto;
}
</style>
