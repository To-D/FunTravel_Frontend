<template>
<div>
    <div v-if="pictures && pictures.length == 0">
        <div >
            <div class="error-container">
                <h2><i class="el-icon-folder-delete"></i>  No Picture Here</h2>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="outer-container" v-if="this.pictures">            
            <el-col :span="8" v-for="picture in pictures.slice((currentPage- 1)*pageSize,currentPage*pageSize)" :key='picture.id' >
                <div class="container" >
                <div class="img_container">
                    <img :src="getImgSrc(picture.url)" @click="toDetail(picture.id)"/>
                </div>
                <div class="text_container">
                    <span>{{picture.title}}</span>            
                    <ul class="post-info">
                        <li>{{picture.author}}</li>
                        <li>{{picture.uploadTime.substr(0,10)}}</li>
                        <li>{{picture.collectionCount}} likes</li>
                    </ul>                
                </div>
                </div>    
            </el-col>                                                                                
        </div>    
        <el-pagination        
            layout="prev, pager, next"
            :total="pictures.length"
            :page-size = "pageSize" 
            :current-page.sync="currentPage"
            >
        </el-pagination>
    </div>
</div>
</template>
<script>
export default {
    name:"ShowPictures",
    props:['pictures'],
    data(){
        return{
            pageSize:6,
            currentPage:1,
        }
    },
    methods:{
        getImgSrc(url){
            return this.GLOBAL.baseUrl + "/images/" +url;
        },
        toDetail(id){
            this.$router.push("/picture-detail/"+id)
        }
    }
}
</script>
<style scoped>
.outer-container{
    height: 800px;    
}
.container{        
    width:400px; 
    margin-left:45px;
    margin-top:20px;    
}

.container:hover{
    
    box-shadow: 0px 0px 10px #888888;
}

.img_container{        
    width:400px;
    height:230px; 
}
.img_container img{
    width:100%;
    height:100%;
    object-fit: cover;
}

.text_container{
    text-align: left;
    padding:20px 40px;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
}

.text_container span{
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 900;
    color: #f48840;
}
.text_container h4{
    font-size: 20px;
    letter-spacing: 0.25px;
    margin: 10px 0px 12px 0px;
}

.text_container li{
    display: inline-block;
    margin-right: 8px;
    font-size: 14px;
    color: #aaa ;
    font-weight: 400;
    transition: all .3s;
}
.text_container .post-info li::after{content: '|';
    color: #aaa;
    margin-left: 8px;
}
.text_container li:last-child::after{
    display: none;
}
.text_container ul{
    padding:0;
}
.el-pagination{
    text-align: center;
}


.error-container{    
    background-color: #f7f7f7;
    padding:100px;
    margin:80px 40px;
}
img{
    cursor: pointer;
}
</style>
<style>
.el-pager li.active {
    color:#f48840;
}

.el-pager li:hover {
    color:#f48840;
}
</style>