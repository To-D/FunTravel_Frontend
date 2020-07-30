<template>
<div >    
    <el-header>
    <navbar page="MyFriends"></navbar>
    </el-header>
    <el-container class="outer-container">
        <!-- 侧边栏 -->
         <el-aside>        
            <el-menu
            default-active="-1"
            class="friends-list"
            
            >     
                <h3 style="text-align:center">Friends List</h3> 
                <el-row>
                <el-col :span="10" :offset="2">
                    <el-button icon="el-icon-circle-plus" size="small" @click="dialogFormVisible = true">New friend</el-button>
                </el-col>
                <el-col :span="10" >                    
                    <el-badge :value="messages.length" class="item" v-if="hasMessage">
                        <el-button icon="el-icon-message" size="small" @click="handleMessage">New Messages</el-button>                        
                    </el-badge>
                    <el-button icon="el-icon-message" size="small" v-else @click="notify('warning','No messages now')">Messages</el-button>                        
                </el-col>
            </el-row>
            <el-menu-item                                 
                index="-1"                
                @click="changeRole(user)"
            >
                <i class="el-icon-user-solid"></i>
                <span slot="title">{{user.username}}</span>
            </el-menu-item> 

            <div v-if="friends">
                <div  v-for="friend in friends"
                    :key="friend.id">
                <el-col :span="18" >       
                <el-menu-item                                    
                    :index="friend.username"
                     @click="changeRole(friend)"
                >
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">{{friend.username}}</span>                    
                </el-menu-item>                                    
                </el-col>
                <el-col :span="4">                    
                    <span><i class="el-icon-chat-round chatButton" @click="chat(friend.username)"></i></span>
                </el-col>
                </div>
            </div>                        
        </el-menu>
     </el-aside>

     <!-- 主视图 -->
     <el-main>    
         <h2>{{presentRole.username}}'s FAVORITE</h2>
         <el-col>

         <el-col :span="8">
             <el-card class="profile" v-if="presentRole">
                 <h5>PROFILE</h5>
                 <p><i class="el-icon-user-solid"></i> Username: {{presentRole.username}}</p>
                 <p><i class="el-icon-postcard"></i> Email: {{presentRole.email}}</p>
                 <p ><i class="el-icon-time"></i> Register Time: {{presentRole.registerTime}}</p>                 
             </el-card>
         </el-col>

         <div v-if="canView">
            <div v-if="presentPictures && presentPictures.length>0">
                <el-col 
                    :span="8" 
                    v-for="picture in presentPictures.slice((currentPage- 1)*pageSize,currentPage*pageSize)" 
                    :key="picture.id"
                    
                    >
                    <el-card>
                        <div>
                        <img :src="getImgSrc(picture.url)" class="image">
                        </div>
                        <div class="text_container">
                            <span >{{picture.title}}</span>            
                            <ul class="post-info">
                                <li>{{picture.author}}</li>
                                <li v-if="picture.uplodTime">{{picture.uploadTime.substr(0,10)}}</li>
                                <li>{{picture.collectionCount}} likes</li>
                            </ul>                    
                        </div>
                    </el-card>
                </el-col>   
            </div>
            <div v-else>
                <el-col :span= "16">
                    <div class="error-container">
                        <h2><i class="el-icon-folder-delete"></i>  No Favorite Yet</h2>
                    </div>
                </el-col>
            </div>  
         </div>
         <div v-else>
             <el-col :span= "16">
                <div class="error-container">
                    <h2><i class="el-icon-folder-delete"></i> Private</h2>
                </div>
             </el-col>
         </div>
         </el-col>
         <el-col>
         <el-pagination        
                layout="prev, pager, next"
                :total="presentPictures.length"
                :page-size = "pageSize" 
                :current-page.sync="currentPage"
                :hide-on-single-page="true"
                >
            </el-pagination>    
         </el-col>
     </el-main>
     </el-container>    
    <foot></foot>     

    <!-- add new friend dialog -->
    <el-dialog title="Add New Friend" :visible.sync="dialogFormVisible">
      <el-form
        @submit.native.prevent
        status-icon
        :model="form"
        :rules="rules"
        :inline="true"
        label-position="left"        
        :ref="form"
        hide-required-asterisk
      >
        <!-- username or email-->
        <el-form-item prop="username" label="Search by username" style="margin-left:40px;">
          <el-input
            type="warning"
            v-model="form.username"
            auto-complete="off"            
            placeholder="Username"            
          ></el-input>
        </el-form-item>

        <!-- submit button -->
        <el-form-item>
          <el-button
            native-type="submit"
            :disabled="isSearchDisabled"
            type="warning"
            style="width: 100%"
            v-on:click="search(form)"
          >
          <i class="el-icon-loading" v-if="loading"></i>
          <span v-else>Search</span>
          </el-button>
        </el-form-item>
        

      </el-form>

      <!-- display search result -->
      <el-table        
        :data="searchResult"
        style="width: 100%"
        max-height="250"
      >        
        <el-table-column fixed prop="username" label="Username" width="170"></el-table-column>
        <el-table-column prop="email" label="E-mail" width="170"></el-table-column>
        <el-table-column prop="registerTime" label="Register Time" width="170"></el-table-column>   
        <el-table-column label="Operation" width="170">
        <template slot-scope="scope">
            <el-button
            size="small"
            type="warning"
            @click="add(scope.row.username)"
            >Add</el-button>            
      </template>     
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- message handle dialog -->
    <el-dialog title="Handle message" :visible.sync="messageDialogVisible">
        <span>{{message.content}}</span>
        <span slot="footer" v-if="message.type =='application'">
            <el-button @click="refuse(message.id)">Refuse</el-button>
            <el-button @click="allow(message.id)" type="warning">Allow</el-button>
        </span>    
        <span slot="footer" v-if="message.type =='notify'">            
            <el-button @click="alreadyRead(message.id)" type="warning">I know</el-button>
        </span>    
    </el-dialog>

</div>
</template>
<script>
import navbar from "../components/NavBar"
import foot from "../components/Footer"
import ShowPictures from "../components/ShowPicture"

export default {
    name:"MyFriends",
    components:{navbar,foot,ShowPictures},
    inject:["reload"],
    data(){
        return{
            // friends list
            friends:[],
            // present user
            user:{},
            presentRole:{},

            // messages
            messages:[],
            message:{},
            messageDialogVisible : false,
            hasMessage:false,

            // favorite pictures
            userPictures:[],
            presentPictures:[],
            pageSize:5,
            currentPage:1,         
            canView:true,
            

            // add new friend dialog
            dialogFormVisible: false,
            isSearchDisabled: true,
            loading:false,                  
            searchResult:[],
            form: {
                username: ""
            },
            rules: {
            username: [
                {
                    required: true,
                    message: "Please enter the username",
                    trigger: "blur"
                },
                {
                    validator: (rule, value, callback) => {
                        this.isSearchDisabled = this.form.username == "";
                        this.searchResult = [];
                        callback();
                    },
                    trigger: "change"
                }
            ]
        },


        }
    },

    created(){
        if(!this.$store.state.token){
            this.$router.push("/login");
            this.notify("warning","Log in first!")
            return;
        }

        // Get My favorite Pictures
        this.$axios
        .post('/getMyFavorite',{
            username:this.$store.state.username,
        })
        .then(resp=>{                        
            if(resp.status === 200){
                this.userPictures = resp.data;                
                this.presentPictures = this.userPictures;
            }
        })
        .catch(error=>{
            console.log(error);
        })

        this.getRelateInformation();
                
    },
    methods:{
        getImgSrc(url){
            return this.GLOBAL.baseUrl + "/images/" +url;
        },
        toDetail(id){
            this.$router.push("/picture-detail/"+id)
        },
        search(formName){
            this.$refs[formName].validate(valid => {
                if (valid) {
                this.loading = true;
                if(this.form.username == this.$store.state.username){
                    this.notify("warning","Don't search your own name!")
                    this.loading = false;
                    return;
                }
                this.$axios
                    .post("/searchUser", {
                        username: this.$store.state.username,                    
                        searchName:this.form.username,
                    })
                    .then(resp => {                        
                    if (resp.status === 200) {
                        this.loading = false;                        
                        if (resp.data.alreadyFriend) {
                            var mes = this.form.username + " has been your friend";
                            this.notify("warning",mes);
                            return;                        
                        }
                        if(resp.data.searchResult) {
                            resp.data.searchResult.registerTime = resp.data.searchResult.registerTime.substr(0,10);
                            this.searchResult.push(resp.data.searchResult);                            
                        }else{
                            this.notify("warning","No such user!");
                        }
                    }
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading = false;
                        this.notify("error","Sorry for something wrong!");
                    });
                } else {
                    this.notify("warning","Wrong submit! Please check the form.");
                }
            });
        },
        add(username){            
            this.$axios
            .post("/addFriend",{
                username:this.$store.state.username,
                friendName:username
            })
            .then(resp=>{
                if(resp.status === 200){
                    if(resp.data == "success"){
                        this.notify("success","Message has been sent!");
                        this.dialogFormVisible = false;
                    }else{
                        this.notify("warning","You have already send an application!");
                    }
                    
                }
            })
            .catch(error=>{
                console.log(error);
                this.notify("error","Sorry for something wrong!");
            })
        },
        handleMessage(){
            this.messageDialogVisible = true;
            this.message = this.messages[0];
        },
        getRelateInformation(){
            // get user information
            this.$axios
            .post("/getMessage",{
                username:this.$store.state.username,            
            })
            .then(resp=>{
                if(resp.status === 200){
                    console.log(resp);
                    this.user = resp.data.user;                    
                    this.user.registerTime = this.user.registerTime.substr(0,10);
                    this.presentRole = this.user;
                    this.friends = resp.data.friends;
                    if(resp.data.hasMessage){
                        this.hasMessage = true;
                        this.messages = resp.data.messages;                        
                    }
                }
            })
            .catch(error=>{
                console.log(error);
                this.notify("error","Sorry for something wrong!");            
            })
        },
        allow(id){
            this.$axios
            .post("/allow",{
                id:id,                                
            })
            .then(resp=>{
                if(resp.status === 200){
                    console.log(this.resp);
                    this.reload();
                    this.notify("success","Add successfully");                                                            
                }
            })
            .catch(error=>{
                console.log(error);
            })
        },
        refuse(id){
            this.$axios
            .post("/refuse",{                
                id:id,
            })
            .then(resp=>{
                if(resp.status === 200){
                    console.log(this.resp);
                    this.reload();
                    this.notify("success","Refuse successfully!");                                                            
                }
            })
            .catch(error=>{
                console.log(error);
            })
        },
        changeRole(friend){
            this.presentRole=friend;
            this.presentRole.registerTime=this.presentRole.registerTime.substr(0,10);
            if(friend == this.user){
                this.presentPictures = this.userPictures;
                this.canView = true;
            }else{
                this.$axios
                .post("/getFriendFavorite",{
                    username:friend.username,
                })
                .then(resp=>{
                    if(resp.status === 200){
                        if(resp.data.view){
                            this.presentPictures = resp.data.pictures;
                            this.canView = true;
                        }else{
                            this.canView = false;
                            this.presentPictures=[];
                        }
                    }
                })
                .catch(error=>{
                    console.log(error);
                    this.notify("error","Sorry, something wrong!");
                })
            }
        },
        alreadyRead(id){
            this.$axios.post("/alreadyRead",{
                id:id
            })
            .then(resp=>{
                console.log(resp);    
                this.reload();
            })
            .catch(error=>{
                console.log(error);
                this.reload();
            })
        },
        chat(toUserName){
            this.$store.commit("changeToUser", toUserName);
            window.open('chat', 'newwindow', 'height=650, width=400, top=50, left=500, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
        }
    }
}
</script>
<style scoped>
footer{
    margin-top:5px;
}
.chatButton{
    padding:15px;
    margin:5px;
    cursor: pointer;
}
.outer-container{
    margin-top:48px;
}
.profile{
    height:270px;
    line-height: 3;
    padding:20px;    
}
.profile h5{
    text-align: center;
    margin:10px;
}
.profile i{
    color:#f48840;
}
.profile p{
    color:#aaa;
}
.image {
    width: 100%;
    height: 200px;
    display: block;
  }

.text_container .post-info li{
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
.text_container .post-info li:last-child::after{
    display: none;
}
.text_container{
    text-align: left;
    padding:20px 40px;   
    border:none; 
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
.text_container ul{
    padding:0;
}
.el-pagination {
    text-align: center;
}
.error-container{    
    background-color: #f7f7f7;
    padding:100px;
    margin:20px 40px;
}
</style>

<style>
.el-aside{
    border-right: 1px solid #eee;
}
.el-card{
    margin:10px;
}
.el-card__body{
    padding:0;    
}
</style>