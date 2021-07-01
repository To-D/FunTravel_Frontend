<template>
<div>

  <navbar page="Home"></navbar>

  <!-- banner -->
  <div id="carousal_container">
  <carousel
  :margin="18"
  :autoplay="true"
  :loop="true"
  :dots="false"
  :navText="['‹','›']"
  :autoplayHoverPause="true"
  :mouseDrag ="true"
  :autoplaySpeed="1000"
  v-if="hottestPictures.length > 0"
  >
    <div v-for="(img,index) in hottestPictures" :key="img.id" >
      <div class="hot_img_container">
          <img :src="getImgSrc(img.url)" :alt="img.title">
          <div class="item-content">
              <div class="main-content">
                <router-link :to="'picture-detail/'+img.id" ><h4>{{img.title}}</h4></router-link>
                <ul class="post-info">
                  <li>{{img.author}}</li>
                  <li>{{img.uploadTime.substr(0,10)}}</li>
                  <li>{{img.collectionCount}} Likes</li>
                </ul>
                <div class="topic-container">
                  <span><i class="el-icon-price-tag"></i></span>
                    <ul>                                                                        
                      <li v-for="topic in hottestPicTopics[index]" :key="topic.id">
                        {{topic.topic}}
                      </li>                                                                     
                    </ul>
                </div>
              </div>
          </div>
      </div>
    </div>
  </carousel>
  </div>

  <!-- middle title-->
  <el-row>
    <el-col :span="18" :offset="3">
      <div class="middle">
        <h4><span>NEWEST</span> PICTURE</h4>
      </div>
    </el-col>
  </el-row>

  <el-row>
    <!-- Newest pictures -->
    <el-col :span="20" :offset="3">
      <el-col :span="16">        
        <div class="container" v-for="(picture,index) in newestPictures" :key='picture.id' >
            <div class="img_container">
                <img :src=getImgSrc(picture.url) @click="toDetail(picture.id)" />
            </div>
            <div class="text_container">
              <span>{{picture.title}}</span>              
              <ul class="post-info">
                <li>{{picture.author}}</li>
                <li>{{picture.uploadTime.substr(0,10)}}</li>
                <li>{{picture.collectionCount}} likes</li>
              </ul>                
              <div class="topic-container">
                  <span><i class="el-icon-price-tag"></i></span>
                    <ul>                                                                        
                      <li v-for="topic in newestPicTopics[index]" :key="topic.id">
                        {{topic.topic}}
                      </li>                                                                     
                    </ul>
                </div>
            </div>
        </div>                                
      </el-col>   

    <!-- side bar -->
    <!-- <el-col :span="8">
      <div class="sidebar">
          <el-row>
            <el-col :span="24">
              <div class="sidebar-item search">
                <form id="search_form" name="gs" method="GET" action="#">
                  <input type="text" name="q" class="searchText" placeholder="type to search..." autocomplete="on">
                </form>
              </div>
            </el-col>
                <el-col :span="24">
                  <div class="sidebar-item tags">
                    <div class="sidebar-heading">
                      <h2>Tag Clouds</h2>
                    </div>
                    <div class="content">
                      <ul>
                        <li><a href="#">Lifestyle</a></li>
                        <li><a href="#">Creative</a></li>
                        <li><a href="#">HTML5</a></li>
                        <li><a href="#">Inspiration</a></li>
                        <li><a href="#">Motivation</a></li>
                        <li><a href="#">PSD</a></li>
                        <li><a href="#">Responsive</a></li>
                      </ul>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>      
    </el-col> -->

    </el-col>
  </el-row>

  <!-- footer -->
  <foot></foot>
</div>
</template>

<script>
import navbar from "../components/NavBar";
import carousel from 'vue-owl-carousel'
import ShowPicture from "../components/ShowPicture"
import foot from "../components/Footer"

export default {
  name: 'Home',
  components: { navbar,carousel,ShowPicture,foot},
  data () {
    return {
      // Hottest
      hottestPictures:[],
      hottestPicTopics:[],

      // Newest
      newestPictures:[],
      newestPicTopics:[],
    }
  },
  methods:{
    getImgSrc(url){
      return this.GLOBAL.baseUrl + "/" + url;
    },
    toDetail(id){
      this.$router.push("/picture-detail/"+id)
    }
  },
  created(){
    this.$axios
    .post("/getHottestPictures")
    .then(resp=>{      
      if(resp.status === 200){
        this.hottestPictures = resp.data.pictures;
        this.hottestPicTopics = resp.data.topics
      }
    })
    .catch(error=>{
      console.log(error);
    })

    this.$axios
    .post("/getNewestPictures")
    .then(resp=>{
      if(resp.status === 200){
        this.newestPictures = resp.data.pictures;
        this.newestPicTopics = resp.data.topics;
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }
}
</script>

<style>
/* carousal adjustment */
#carousal_container{
    padding:10px 16px;
    margin-left:2px;
    margin-top:110px;
}
/* image */
 .hot_img_container{
    height:404.3px;
    width:467.2px;
    /* position:relative; */
    z-index:1;
    margin:0 auto;
    background: #000;
} 
.hot_img_container img{
    width:100%;
    height:100%;
    opacity:0.6; 
    filter: alpha(opacity=60);
}
/* nav */
.owl-theme .owl-nav [class*='owl-'] {
    color: #fff;
    font-size: 36px;
    width: 60px;
    height: 60px;
    padding:0px;
    margin:0px;
    display: inline-block;
    text-align: center;
    line-height: 60px;
    background-color: rgba(250, 250, 250, 0.3);
}
.owl-theme .owl-nav [class*='owl-']:hover{
    background-color: rgba(250, 250, 250, 0.4);
}
.owl-theme .owl-nav {
    position: absolute;
    top: 36%;
    width: 100%;
}
.owl-carousel .owl-nav.disabled{
  display:block !important;
}
.owl-theme .owl-nav .owl-prev {
    position: absolute;
    left: 40px;
}
.owl-theme .owl-nav .owl-next {
    position: absolute;
    right: 40px;
}

/* related information */
.owl-theme .owl-item .item-content {
    position: absolute;
    bottom: 40px;
    left: 40px;
    text-align: left;
}

.topic-container{
  margin-top:10px;
}
.owl-theme .owl-item .item-content h4 {
    text-align: left;
    color: #f48840;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 900;
    letter-spacing: 0.5px;
    text-transform: capitalize;
    margin: 10px 0px 12px 0px;
    line-height: 1.2;
}

ul {
    padding: 0;
    margin: 0;
    list-style: none;
}
.owl-theme .owl-item .item-content ul li {
    display: inline-block;
    margin-right: 8px;
    font-size: 14px;
    color: #fff;
    font-weight: 600;
    transition: all .3s;
}
.owl-theme .owl-item .item-content .post-info ul li:after {
    content: '|';
    color: #fff;
    margin-left: 8px;
}
.owl-theme .owl-item .item-content .post-info ul li:last-child:after{
  display: none;
}

/* middle */
.middle{
    padding: 10px;
    margin:50px 0;
    background-image: url("../../static/images/middle-bg.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    color:#fff;
    font-size:25px;
    text-align: center;
    
}
.middle span{
  color:#f48840;
}

.container{
    display:inline-block;
    margin: 10px 0;
    /* border: 1px solid #eee; */
}

.img_container{
    width:700px;
    height:300px;
}
.img_container img{
    width:100%;
    height:100%;
    object-fit: cover;
}

.text_container{
    text-align: left;
    padding:40px;
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
.post-options ul li a{
    color: #aaa;
}
i{
    color: #f48840;
}
.img_container{
  cursor: pointer;
}
/* side bar */
.sidebar{
  margin-left: 20px;
  margin-top:10px;
  text-align: left;
}

.sidebar input{
  width: 318px;
  height: 50px;
  border: 1px solid #eee;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 500;
  color: #7a7a7a;
  outline: none;
  padding-left:15px;
}

.sidebar .sidebar-item {
  margin-top:50px;
}
.sidebar h2{
  font-size: 18px;
  text-align: left;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 0.5px;
  color: #20232e;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
  margin-bottom: 25px;
}
.sidebar .tags ul li{
  margin-bottom: 10px;
  margin-right: 6px;
  display: inline-block;
}
.sidebar .tags ul li:hover{
  background-color: #f48840;
}
.sidebar .tags ul li a{
    font-size: 15px;
    font-weight: 500;
    color: #aaa;
    display: inline-block;
    border: 1px solid #eee;
    padding: 10px 18px;
    transition: all .3s;
}
.sidebar .tags ul li a:hover{
  color:#fff
}

.topic-container ul li::after{
  content:" ,";
}

.topic-container ul{
  display: inline;
}
.topic-container ul li:last-child:after{
  display: none;
}
</style>