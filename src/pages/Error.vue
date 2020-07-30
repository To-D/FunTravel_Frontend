<template>
<div>
    <navbar></navbar>   
    <div class="img-container">
        <img src="../../static/images/404.jpg"> 
    </div>
    <foot></foot>
</div>
</template>

<script>
import navbar from "../components/NavBar"
import foot from "../components/Footer"

export default {
    name:"Upload",    
    components:{navbar,foot},    
    
}
</script>
<style scoped>
.img-container{
    margin-top:130px;
    margin-left:250px;  
    margin-bottom: -150px;      
    height: 700px;
}
img{
    height:80%;    
}
</style>