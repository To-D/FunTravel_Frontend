 <template>
 <footer>
        <el-row>

            <el-col :span="24">
            <ul class="social-icons">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Behance</a></li>
              <li><a href="#">Linkedin</a></li>
              <li><a href="#">Dribbble</a></li>
            </ul>
            </el-col>

          <el-col :span="24">
            <div class="copyright-text">
              <p>Copyright 2020 Stand Blog Co.                    
                 | Design: <a rel="nofollow" href="https://templatemo.com" target="_parent">TemplateMo</a></p>
            </div>
          </el-col>

        </el-row>
    </footer>
</template>    
<script>
export default {
    name:"Footer",
}
</script>    
<style>
footer{
    margin-top: 100px;
    text-align: center;
    background-color: #20232e;
    padding: 60px 0px;
}

footer ul.social-icons {
    padding-bottom: 60px;
    margin-bottom: 60px;
    border-bottom: 1px solid rgba(250,250,250,0.15);
}

footer ul.social-icons li {
    display: inline-block;
    margin-right: 30px;
}

footer ul.social-icons li a {
    font-size: 14px;
    text-transform: uppercase;
    color: #fff;
    font-weight: 500;
    letter-spacing: 0.25px;
    transition: all .3s;
}
footer p {
    font-size: 13px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 0px;
    font-weight: 400;
    line-height: 30px;
}

footer p a {
    color: #f48840;
}
</style>