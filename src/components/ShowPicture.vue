<template>
<div>        
    <div class="container" v-for="i in 3" :key='i' >
        <div class="img_container">
            <img src="../assets/images/picture2.jpg" />
        </div>
        <div class="text_container">
            <span>THEME</span>
            <h4>Title</h4> 
            <ul class="post-info">
                <li>AUTHOR</li>
                <li>May 31, 2020(release time)</li>
                <li>12 Comments(comments_count)</li>
            </ul>
            <!-- <p>Stand Blog is a free HTML CSS template for your CMS theme. You can easily adapt or customize it for any kind of CMS or website builder. You are allowed to use it for your business. You are NOT allowed to re-distribute the template ZIP file on any template collection site for the download purpose. <a rel="nofollow" href="https://templatemo.com/contact" target="_parent">Contact TemplateMo</a> for more info. Thank you.</p>
            <div class="post-options">
                <el-row>
                    <el-col :span="12">
                        <ul class="post-tags">
                            <li><i class="el-icon-discount"></i></li>
                            <li><a href="#">Beauty</a>,</li>
                            <li><a href="#">Nature</a></li>
                        </ul>
                    </el-col>
                    <div class="col-6">
                        <ul class="post-share">
                            <li><i class="el-icon-share"></i></li>
                            <li><a href="#">Facebook</a>,</li>
                            <li><a href="#"> Twitter</a></li>
                        </ul>
                    </div>
                </el-row>
            </div> -->
        </div>
    </div>                              
</div>    
</template>
<script>
export default {
    name:"ShowPictures",
    data(){
        return{

        }
    },
}
</script>
<style>
.container{
    display:inline-block;
    margin: 10px 0;
    /* border: 1px solid #eee; */
}

.img_container{
    width:730px;
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
</style>