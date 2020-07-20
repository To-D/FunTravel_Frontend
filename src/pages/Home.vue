<template>
<div>
  <navbar></navbar>
  <div id="container">
  <carousel
  :margin="18"
  :autoplay="true"
  :loop="true"
  :dots="false"
  :nav="false"
  >
    <div class="img_container">
        <img src="../assets/images/picture1.jpg">
    </div>
    <div class="img_container">
            <img src="../assets/images/picture2.jpg">
    </div>
    <div class="img_container">
        <img src="../assets/images/picture3.jpg">
    </div>
    <div class="img_container">
            <img src="../assets/images/picture4.jpg">
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
<style scoped>
#container{
    padding:0 9px 0 15px;
}
 .img_container{
    height:404.3px;
    width:467.2px;
} 
img{
    width:100%;
    height:100%;
}
</style>