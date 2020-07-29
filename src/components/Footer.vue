 <template>
 <footer>     
    <el-row>                
        <el-col :span="16">
            <h2>Site Map</h2>
            <el-col :span="12">
                <ul class="map">
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/search">Search</router-link></li>
                    <li><router-link to="/register">Register</router-link></li>
                    <li><router-link to="/login">Log in</router-link></li>              
                </ul>
            </el-col>
            <el-col :span="12" v-if="isLogin">
                <ul class="map">
                  <li><router-link to="/upload">Upload</router-link></li>
                  <li><router-link to="/myPictures">My Pictures</router-link></li>
                  <li><router-link to="/myFavorite">My Favorite</router-link></li>
                  <li><router-link to="/myFriends">My Friends</router-link></li>
                </ul>
            </el-col>
        </el-col>
        <el-col :span="8">
            <h2>COPYRIGHT</h2>
            <div class="copyright-text">
              <p>Copyright 2020</p>
              <p> Design By <span>Jaxon</span></p>
              <p> Fudan University</p>
            </div>
          </el-col>

        </el-row>
    </footer>
</template>    
<script>
export default {
    name:"Footer",
    data(){
        return{
            isLogin:this.$store.state.username,
        }
    }
}
</script>    
<style>
footer{
    margin-top: 50px;
    text-align: center;
    background-color: #20232e;
    padding: 40px 0px;    
}

footer h2{
    color: #fff;
    text-align: left;
    margin-left: 170px;
}

footer ul.map {
    list-style: none;   
    padding: 0 100px;
    
}

footer ul.map {
    display: inline-block;
    margin-right: 30px;
}

footer ul.map li a {
    font-size: 14px;
    text-transform: uppercase;
    color: #fff;
    font-weight: 500;
    letter-spacing: 0.25px;
    transition: all .3s;
    line-height: 2em;
}
footer p {
    font-size: 13px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 0px;
    font-weight: 400;
    line-height: 2em;
}
footer span{
    color:#f48840;
}
.copyright-text{
    border-left: 1px solid #fff;
}
</style>