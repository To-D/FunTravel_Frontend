<template>
<div>
    <!-- navbar -->
    <navbar></navbar>
    
    <!-- picture showcase -->
    <el-row class="detail_container" v-if="this.picture">
        <el-col :span="20" :offset="2">        
            <!-- picture information -->
            <el-col :span="14">              
                <div class="img-container">
                    <vue-photo-zoom-pro :url=getImgSrc(picture.url)></vue-photo-zoom-pro>
                </div>
                <div class="text_container">
                    <el-row>
                    <el-col :span="16">
                    <h4>{{picture.title}}</h4> 
                    <ul class="post-info">
                        <li>{{picture.author}}</li>
                        <li>May 31, 2020</li>
                        <li>{{picture.collectionCount}} Likes</li>                        
                    </ul>
                    </el-col>
                    <el-col :span="8" class="collectionIcon">
                        <br>
                        <span @click="collect" v-if="!isCollected"><i class="el-icon-star-off" ></i></span>
                        <span @click="cancelCollect" v-else><i class="el-icon-star-on" ></i></span>
                    </el-col>
                    </el-row>
                    
                    <p>{{picture.intro}}</p>
                    <div class="post-options">
                        <el-row>
                            <el-col :span="12">
                                <span><i class="el-icon-discount"></i></span>
                                <ul class="post-tags">                                                                        
                                    <li v-for="topic in topics" :key="topic.id">
                                        {{topic.topic}}
                                    </li>                                                                     
                                </ul>
                            </el-col>
                            <div class="col-6">
                                <span><i class="el-icon-position"></i></span>
                                <ul class="post-share">                                    
                                    <li>{{picture.nation}}</li>
                                    <li>{{picture.city}}</li>
                                </ul>
                            </div>
                        </el-row>
                    </div>
                </div>
            </el-col>            

            <!-- picture comments -->
            <el-col :span="10">                
                <div class="sidebar-comment">                    
                    <h2>Comments</h2>
                    <div v-if="this.comments">
                        <div class="comment-container" >
                            <div class="comment-content" 
                            v-for="comment in comments.slice((currentPage- 1)*pageSize,currentPage*pageSize)" 
                            :key="comment.id"
                            >
                                    <h4>{{comment.username}}<span>{{comment.time.substr(0,10)}}</span></h4>
                                    <p>{{comment.comment}}</p>
                            </div>

                            <div v-if="comments.slice((currentPage- 1)*pageSize,currentPage*pageSize).length < 3">                                
                                <div class="comment-content" v-for="i in (3-comments.slice((currentPage- 1)*pageSize,currentPage*pageSize).length)" :key="i">  
                                    <br><br>                                                              
                                    <p><i class="el-icon-medal"></i> Waiting for your comment……</p>
                                </div>                                
                            </div>
                        </div>
                        <el-pagination                            
                            hide-on-single-page
                            layout="prev, pager, next"
                            :page-size = "pageSize" 
                            :current-page.sync="currentPage"
                            :total="comments.length">
                        </el-pagination>
                    </div>
                    <!-- comment form -->
                    <div>
                      <form id="comment" action="#" method="post">                          
                          <el-input
                            type="textarea"
                            :rows="4"
                            :placeholder="commentPlaceHolder"
                            v-model="comment"
                            :disabled="disable"
                        >
                        </el-input>           
                        <el-button 
                            type="warning" 
                            :disabled="buttonDisable"
                            @click="postComment"
                            >Submit</el-button>
                      </form>
                    </div>
                  </div>
            </el-col>
        </el-col>
    </el-row>


    <foot></foot>
</div>
</template>
<script>
import navbar from "../components/NavBar"
import foot from "../components/Footer"

export default {
    name:"PictureDetail",
    components:{navbar,foot},
    data(){
        return{
            picture:null,
            comments:[],
            comment:"",
            pageSize:3,
            currentPage:1,
            disable:false,     
            isCollected:false, 
            topics:[],
        }
    },
    computed:{
        commentPlaceHolder(){
            if(this.$store.state.token){
                return "TYPE YOUR COMMENT"
            }
            return "LOGIN FIRST"
        },
        buttonDisable(){
            return this.comment == "";
        }
    },
    created(){
        this.getPictureDetail();        
    },
    methods:{
        getImgSrc(url){
            return this.GLOBAL.baseUrl + "/images/" + url;
        },
        postComment(){
            this.$axios
            .post('/postComment',{
                comment:this.comment,
                username:this.$store.state.username,
                pictureId:this.picture.id
            })            
            .then(resp=>{
                if(resp.status === 200){
                    this.notify("success","Comment successfully!")                    
                }
                this.comment="";
                this.getPictureDetail();
            })
            .catch(error=>{
                console.log(error);
            })
        },
        getPictureDetail(){
            this.$axios.post("/getPictureDetail",{
                id:this.$route.params.pictureID
            })
            .then(resp=>{
                console.log(resp);
                if(resp.status === 200){
                    this.picture = resp.data.picture;                    
                    this.comments = this.picture.comments;                    
                    this.topics = resp.data.topics;
                    this.$axios
                    .post("/isCollected",{
                        username:this.$store.state.username,
                        pictureId:this.picture.id
                    })
                    .then(resp=>{
                        console.log(resp);
                        if(resp.status === 200){                
                            this.isCollected = resp.data;
                        }
                    })
                    .catch(error=>{
                        console.log(error);
                    })
                }
            })
            .catch(error=>{
                console.log(error);                
            })
        },
        collect(){            
            this.$axios
            .post("/collect",{
                username:this.$store.state.username,
                pictureId:this.picture.id,                
            })
            .then(resp=>{
                if(resp.status===200){
                    this.isCollected = true;
                    this.picture.collectionCount++;
                    this.notify("success","Already added to your favorite!");
                }
            })
            .catch(error=>{
                console.log(error);
            })            
        },
        cancelCollect(){
            this.$axios
            .post("/cancelCollect",{
                username:this.$store.state.username,
                pictureId:this.picture.id,                
            })
            .then(resp=>{
                if(resp.status===200){
                    this.isCollected = false;
                    this.picture.collectionCount--;
                    this.notify("success","Already removed from your favorite!");
                }
            })
            .catch(error=>{
                console.log(error);
            })                        
        }
    }
    
}
</script>
<style scoped>
.detail_container{
    margin-top:150px;
}

/* picture information */
.img-container .photo-zoom-pro img{
    width:100%;
    height:100%;
    object-fit: cover;
}
.text_container{
    text-align: left;
    padding:10px 40px;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
}

.text_container h4{
    font-size: 20px;
    letter-spacing: 0.25px;
    margin: 10px 0px 12px 0px;
    letter-spacing: 0.5px;
    font-weight: 900;
    color: #f48840;
}

.text_container ul{
    margin:0;
    padding:0;
}

.text_container ul li{
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

.text_container p{
    padding: 25px 0px;
    margin: 25px 0px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    font-size: 15px;
    font-weight: 400;
    color: #7a7a7a;
    line-height: 30px;
}
.post-options ul {
    display: inline;    
    color: #aaa;
}
.post-options ul li::after{
    content:" ,";
}

i{
    color: #f48840;
}

.collectionIcon{
    text-align:right
}
.collectionIcon span i{
    cursor: pointer;
}

.el-icon-star-off{
    font-size: 30px;
}
.el-icon-star-on{
    font-size: 32px;    
}

/* picture comments */
.sidebar-comment{
    margin-left:50px;
}

.sidebar-comment h2{
    padding-bottom: 10px;
    
}

.comment-container{
    margin-bottom: 20px;
}

.comment-content{
    padding:10px 20px;
    height:120px;
    border-bottom: 1px solid #eee;
}
.comment-content h4{
    margin-bottom: 10px;
}
.comment-content h4 span{
    font-size: 14px;
    color: #aaa;
    font-weight: 400;
    letter-spacing: 0.25px;
    margin-left: 20px;    
}

.comment-content p{
    margin-top:0;
    margin-bottom: 0px;
    font-size: 15px;
    font-weight: 400;
    color: #7a7a7a;
    line-height: 30px;
}    
</style>
<style>
.el-pagination .el-pager li:not(.disabled).active {
    color:#f48840;
}

.el-pagination .el-pager li:not(.disabled):hover {
    color:#f48840;
}
.el-pagination{
    text-align: center;
    margin-bottom:20px;
}
.el-pagination i{
    color:#7a7a7a
}


</style>