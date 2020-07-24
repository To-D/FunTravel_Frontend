<template>
<div>
    <navbar></navbar>
    <el-row class="detail_container">
        <el-col :span="20" :offset="1">
            <el-col :span="12">
                <div class="img_container">
                    <img src="../assets/images/picture2.jpg" />
                </div>
                <div class="text_container">
                    <span>Title</span>
                    <h4>Best Template Website for HTML CSS</h4> 
                    <ul class="post-info">
                        <li>Author</li>
                        <li>May 31, 2020</li>
                        <li>12 Comments</li>
                    </ul>
                </div>
            </el-col>
            <el-col class="text_container" :span="11" :offset="1">
                <h2>INTRODUCTION</h2>
                <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
            </el-col>
        </el-col>
    </el-row>
</div>
</template>
<script>
import navbar from "../components/NavBar"
export default {
    name:"PictureDetail",
    components:{navbar},
    data(){
        return{
            // pictureId:this.$route.params.pictureID,
        }
    }
    
}
</script>
<style scoped>
.img_container{
    
}
.img_container img{
    width:100%;
    height:100%;
    object-fit: cover;
}

.text_container{
    text-align: left;
    padding:40px;
    
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
.detail_container{
    top:130px;
}
.text_container p{
    padding: 25px 0px;
    margin: 25px 0px;
    font-size: 15px;
    font-weight: 400;
    color: #7a7a7a;
    line-height: 30px;
}
</style>