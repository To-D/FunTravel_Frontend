<template>
<div>
  <navbar></navbar>
  <div id="carousal_container">
  <carousel
  :margin="18"
  :autoplay="true"
  :loop="true"
  :dots="false"
  :nav="true"
  :navText="['‹','›']"
  :autoplayHoverPause="true"
  >
    <div v-for="i in 4 " :key="i">
      <div class="img_container">
          <img src="../assets/images/picture1.jpg">
      </div>
    </div>
  </carousel>
  </div>
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
        count: 0
    }
    },
    methods:{
     load () {
        this.count += 2
      }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#carousal_container{
    padding:10px 16px;
    margin-left:2px;
}
 .img_container{
    height:404.3px;
    width:467.2px;
} 
img{
    width:100%;
    height:100%;
}

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
</style>