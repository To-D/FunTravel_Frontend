<template>
<div>
    <navbar page="MyFavorite"></navbar>
    <div class="out-container">        
        <el-row>
        <el-col :span=14 :offset="5">
            <h2>My Favorite</h2>
        </el-col>
        <el-col :span=3>
            <el-dropdown class="track">
                <span class="el-dropdown-link">
                    <i class="el-icon-timer">Footprint</i>
                    
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  v-for="(history,index) in histories" :key="index">{{history.title}}</el-dropdown-item>                
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
        }
    },
    methods:{

    },
    created(){
        if(!this.$store.state.token){
            this.$router.push("/login");
            this.notify("warning","Log in first!")
        }

        this.histories = JSON.parse(this.$store.state.histories);
        // console.log("myfavorite:"+this.histories);

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
    }
}
</script>

<style scoped>
.out-container{
    margin-top:130px;
}

.track{
    margin-top:25px
}

.track i{
    font-size: 20px;
    cursor: auto;
}
</style>
