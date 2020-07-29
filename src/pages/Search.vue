<template>
<div>
    <navbar page="Search"></navbar>
    <el-row class="search-container">
        <el-col :span="22" :offset="1">
            <div class="search-input">
                <el-row>
                    <el-col :span="2">
                        <h2>Search</h2>
                    </el-col>            
                    <el-col :span="16" :offset="2">
                        <el-input 
                            type="text"
                            v-model="keyword"
                            placeholder="TYPE TO SEARCH"
                            @keyup.enter.native="search"
                        >
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                        </el-input>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7" :offset="5">
                        <span>Filter by</span>
                        <el-radio-group v-model="filter" >
                            <el-radio-button label="TITLE">TITLE <i class="el-icon-reading"></i></el-radio-button>
                            <el-radio-button label="TOPIC">TOPIC <i class="el-icon-price-tag"></i></el-radio-button>                            
                        </el-radio-group>                                                
                    </el-col>

                    <el-col :span="8" >
                        <span>Sort by</span>                                 
                        <el-radio-group v-model="sort" >
                            <el-radio-button label="FAVORITE HOT">FAVORITE HOT <i class="el-icon-sort-down"></i></el-radio-button>
                            <el-radio-button label="UPDATE TIME">UPDATE TIME <i class="el-icon-sort-down"></i></el-radio-button>                            
                        </el-radio-group>                                                
                    </el-col>

                </el-row>
                </div>
        </el-col>              
    </el-row>    

    <show-pictures :pictures="searchResult"></show-pictures>

    <foot></foot>
</div>
</template>
<script>
import navbar from "../components/NavBar"
import foot from "../components/Footer"
import ShowPictures from "../components/ShowPicture"

export default {
    name:"Search",
    components:{navbar,foot,ShowPictures},
    data(){
        return{
            keyword:"",      
            filter:"TITLE",
            sort:"FAVORITE HOT",
            searchResult:null,
        }
    },
    methods:{
        search(){            
            this.$axios
            .post("/search",{
                keyword:this.keyword,
                filter:this.filter,
                sort:this.sort,
            })
            .then(resp=>{                
                if(resp.status===200){
                    this.searchResult = resp.data;
                }
            })
            .catch(error=>{
                console.log(error);
            })            
        },        
    },
    created(){
        this.search();
        
    }
}
</script>
<style scoped>
.search-container{
    margin:130px 20px 20px 20px;
    padding:40px 0 20px 0;    
    border-bottom: 1px solid #eee;
    background-image: url("../../static/images/heading-bg.jpg");
}

.el-input{
    margin-top:15px;    
}
h2{
    margin:0;
    padding-left:90px;
    padding-bottom:10px;
    font-size:25px;
    color:#f48840;
}
.search-container span{
    color:white;
}
.el-radio-group{
    margin-left:20px;
}

</style>
<style>
.el-radio-button__inner{
    padding:12px 15px;
}
.el-radio-button__inner:hover{
    color:#f48840
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #FFF;
    background-color:#f48840;
    border-color:#f48840;
    -webkit-box-shadow: -1px 0 0 0 #f48840;
    box-shadow: -1px 0 0 0 #f48840;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner i{
    color: #FFF;
}
.el-icon-search{
    color:#f48840;
}
</style>