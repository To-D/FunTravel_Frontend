<template>
<div>
  <navbar></navbar>

  <!-- banner -->
  <div id="carousal_container">
  <carousel
  :margin="18"
  :autoplay="true"
  :loop="true"
  :dots="false"
  :nav="true"
  :navText="['‹','›']"
  :autoplayHoverPause="true"
  :mouseDrag ="true"
  :autoplaySpeed="1000"
  >
    <div v-for="i in 4 " :key="i">
      <div class="img_container" style="width:100%; position:relative;z-index:1;margin:0 auto; background: #000;">
          <img src="../assets/images/picture4.jpg" :alt="i" style="width:100%; opacity:0.6; filter: alpha(opacity=60);">
          <!-- related information -->
          <div class="item-content">
              <div class="main-content">
                <div class="meta-category">
                  <span>Nature</span>
                </div>
                <router-link to="pictureDetail"><h4>Donec porttitor augue at velit</h4></router-link>
                <ul class="post-info">
                  <li>Admin</li>
                  <li>May 14, 2020</li>
                  <li>24 Comments</li>
                </ul>
              </div>
          </div>
      </div>
    </div>
  </carousel>
  </div>

  <el-row>
    <el-col :span="12" :offset="6">
      <div class="middle">
        <h4><span>NEWEST</span> PICTURE</h4>
      </div>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="10" offset="1">
      <div class="img_container" >
          <img src="../assets/images/picture2.jpg" :alt="i">
          <!-- related information -->
          <div class="item-content">
              <div class="main-content">
                <div class="meta-category">
                  <span>Nature</span>
                </div>
                <router-link to="pictureDetail"><h4>Donec porttitor augue at velit</h4></router-link>
                <ul class="post-info">
                  <li>Admin</li>
                  <li>May 14, 2020</li>
                  <li>24 Comments</li>
                </ul>
              </div>
          </div>
      </div>
    </el-col>

    <el-col :span="10" offset="2">
      <div class="img_container" >
          <img src="../assets/images/picture2.jpg" :alt="i" >
          <!-- related information -->
          <div class="item-content">
              <div class="main-content">
                <div class="meta-category">
                  <span>Nature</span>
                </div>
                <router-link to="pictureDetail"><h4>Donec porttitor augue at velit</h4></router-link>
                <ul class="post-info">
                  <li>Admin</li>
                  <li>May 14, 2020</li>
                  <li>24 Comments</li>
                </ul>
              </div>
          </div>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import navbar from "../components/NavBar";
import carousel from 'vue-owl-carousel'

export default {
  name: 'Home',
  components: { navbar,carousel},
  data () {
    return {
        src:"../assets/images/picture1.jpg",
    }
    },
    methods:{
  }
}
</script>

<style>
/* carousal adjustment */
#carousal_container{
    padding:10px 16px;
    margin-left:2px;
}
/* image */
 .img_container{
    height:404.3px;
    width:467.2px;
} 
img{
    width:100%;
    height:100%;
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

.owl-theme .owl-item .item-content .meta-category span {
    color: #f48840;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 0.25px;
    text-align: left;
}
.owl-theme .owl-item .item-content h4 {
    font-size: 24px;
    font-weight: 900;
    color: #fff;
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
.owl-theme .owl-item .item-content ul li:after {
    content: '|';
    color: #fff;
    margin-left: 8px;
}
.owl-theme .owl-item .item-content ul li:last-child:after{
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
    
}
.middle span{
  color:#f48840;
}
</style>