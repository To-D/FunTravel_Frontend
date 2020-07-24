<template>
<div>
    <!-- navbar -->
    <navbar></navbar>

    <!-- picture showcase -->
    <el-row class="detail_container">
        <el-col :span="20" :offset="1">

            <!-- picture information -->
            <el-col :span="14">
                <div class="img_container">
                    <img src="../assets/images/picture2.jpg" />
                </div>
                <div class="text_container">
                    <h4>Title</h4> 
                    <ul class="post-info">
                        <li>Author</li>
                        <li>May 31, 2020</li>
                        <li>12 Comments</li>
                    </ul>
                    <p>Stand Blog is a free HTML CSS template for your CMS theme. You can easily adapt or customize it for any kind of CMS or website builder. You are allowed to use it for your business. You are NOT allowed to re-distribute the template ZIP file on any template collection site for the download purpose. <a rel="nofollow" href="https://templatemo.com/contact" target="_parent">Contact TemplateMo</a> for more info. Thank you.</p>
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
                                    <li><i class="el-icon-position"></i></li>
                                    <li><a href="#">China</a>,</li>
                                    <li><a href="#"> Shanghai</a></li>
                                </ul>
                            </div>
                        </el-row>
                    </div>
                </div>
            </el-col>

            <!-- picture comments -->
            <el-col :span="10">
                <div class="sidebar-comment">
                    <div class="sidebar-heading">
                      <h2>Your comment</h2>
                    </div>
                    <div class="content">
                      <form id="comment" action="#" method="post">                          
                          <el-col :span="24">
                            <fieldset>
                              <textarea name="message" rows="6" id="message" placeholder="Type your comment" required=""></textarea>
                            </fieldset>
                          </el-col>
                          <el-col :span="24">
                            <fieldset>
                              <button type="submit" id="form-submit" class="main-button">Submit</button>
                            </fieldset>
                          </el-col>
                        
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
            // pictureId:this.$route.params.pictureID,
        }
    }
    
}
</script>
<style scoped>
.detail_container{
    margin-top:120px;
}

/* picture information */
.img_container img{
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
.post-options ul li a{
    color: #aaa;
}
i{
    color: #f48840;
}

/* picture comments */
.sidebar-comment{
    margin-left:50px;
}
</style>