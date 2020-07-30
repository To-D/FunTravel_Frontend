<template>
  <div class="chat-box">
    <header>Chat with {{toUser}}</header> 

    <div class="msg-box" ref="msg-box">
      <div
        v-for="(msg,index) in list"
        :key="index"        
      > 
        
        <div v-if="msg.type == 'message'" :style="msg.sendUser == sendUser?'flex-direction:row-reverse':''" class="msg">      
            
            <div class="user-head">
                <img :src="msg.sendUser == sendUser?'../../static/images/avator1.jpg':'../../static/images/avotor2.jpg'" height="30" width="30" :title="msg.sendUser">
            </div>
            <div class="user-msg">
                <span :style="msg.sendUser == sendUser?' float: right;':''" :class="msg.sendUser == sendUser?'right':'left'">{{msg.content}}</span>          
            </div>
        </div>

        <div v-else style="text-align:center">
            <div class="notify">{{msg.content}}</div>
        </div>

      </div>
    </div>

    <div class="input-box">
      <input type="text" ref="sendMsg" v-model="contentText" @keyup.enter="sendText()" />
      <div class="btn" :class="{['btn-active']:contentText}" @click="sendText()">Send</div>
    </div>

  </div>
</template>

<script>
  export default {
      name:"Chat",
    data() {
      return {
        ws: null,                     
        list: [], // 聊天记录的数组
        sendUser:this.$store.state.username,
        toUser:this.$store.state.toUser,
        contentText: "" // input输入的值
      };
    },
    mounted() {
      this.initWebSocket();
    },
    destroyed() {        
      // 离开页面时关闭websocket连接
      this.ws.onclose(undefined);
    },
    methods: {
      // 发送聊天信息
      sendText() {
        let _this = this;
        _this.$refs["sendMsg"].focus();
        // 聊天信息为空
        if (!_this.contentText) {
          return;
        }        
        _this.ws.send(_this.contentText); //调用WebSocket send()发送信息的方法
        _this.contentText = "";
        setTimeout(() => {
          _this.scrollBottm();
        }, 500);
      },

      // 进入页面创建websocket连接
      initWebSocket() {
        let _this = this;            
        if (window.WebSocket) {            
            var serverHot =  window.location.hostname;            
            var url = 'ws://' + serverHot + ':8080' + '/chat/'+this.sendUser+'/'+this.toUser; // `ws://127.0.0.1:8080/chat/sendUser/toUser`
            let ws = new WebSocket(url);
            _this.ws = ws;
            ws.onopen = function(e) {
                console.log("服务器连接成功: " + url);
            };
            ws.onclose = function(e) {
                console.log("服务器连接关闭: " + url);
            };
            ws.onerror = function() {
                console.log("服务器连接出错: " + url);
            };

            ws.onmessage = function(e) {                
                //接收服务器返回的数据
                 let resData = JSON.parse(e.data)                       
                 // 解析时间
                 if (resData && resData.time) {
                    var date = new Date(resData.time);
                    var content = '';
                    content += date.getFullYear();
                    content += '-';
                    content += ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1));
                    content += '-';
                    content += (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
                    content += ' ';
                    content += (date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours());
                    content += ':';
                    content += (date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes());
                    content += ':';
                    content += (date.getSeconds() < 10 ? ("0" + date.getSeconds()) : date.getSeconds());
                    resData.time = content;
                }                 
                _this.list = [
                ..._this.list,
                { sendUser: resData.sendUser, type:resData.type, content: resData.content,time:resData.time}
                ];                
          };
        }else{
            this.notify("error","Your browser doesn't support this function!");
        }
      },
      // 滚动条到底部
      scrollBottm() {
          let el = this.$refs["msg-box"];
          el.scrollTop = el.scrollHeight;
      }
    },
    created(){        
        if(!this.$store.state.token){
            this.$router.push("/login");
            this.notify("warning","Log in first!");
            return;
        }
    }
  };
</script>

<style lang="css" scoped>
.chat-box{
    margin: 0 auto;
    background: #eee;
    position: absolute;
    height: 100%;
    width: 100%;
    max-width: 400px;
}

.chat-box header {
    position: fixed;
    width: 100%;
    max-width: 400px;
    height: 3rem;
    background: #f48848;    
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    font-size: 1rem;
  }

.msg-box {
    position: absolute;
    height: calc(100% - 6.5rem);
    width: 100%;
    margin-top: 3rem;
    overflow-y: scroll;
}

.msg{    
    width: 95%;
    min-height: 2.5rem;
    margin: 1rem 0.5rem;
    position: relative;
    display: flex;
    justify-content: flex-start !important;
}
.user-head {
    min-width: 2.5rem;
    width: 20%;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: #f1f1f1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.head {
    width: 1.2rem;
    height: 1.2rem;
}
.user-msg {
    width: 80%;  
    word-break: break-all;
    position: relative;
    z-index: 5;
}
span {
    display: inline-block;
    padding: 0.5rem 0.7rem;
    border-radius: 0.5rem;
    margin-top: 0.2rem;
    font-size: 0.88rem;
}
.left {
    background: white;
    animation: toLeft 0.5s ease both 1;
}
.right {
    background: #f48848;
    color: white;
    animation: toright 0.5s ease both 1;
}
.notify{    
    font-size:0.8rem;
    color:rgba(0,0,0,0.3);
    margin:20px 40px;    
}

@keyframes toLeft {
    0% {
      opacity: 0;
      transform: translateX(-10px);
    };
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
}
@keyframes toright {
    0% {
      opacity: 0;
      transform: translateX(10px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
}

.input-box {
    padding: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3.5rem;
    background: #fafafa;
    box-shadow: 0 0 5px #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;    
}
input {
    height: 2.3rem;
    display: inline-block;
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-radius: 0.2rem;
    font-size: 0.88rem;
}
.btn {
    height: 2.3rem;
    min-width: 4rem;
    background: #e0e0e0;
    padding: 0.5rem;
    font-size: 1.2rem;
    color: white;
    text-align: center;
    border-radius: 0.2rem;
    margin-left: 0.5rem;    
    transition: 0.5s;
}
 .btn-active {
    background: #f48848;
}
</style>