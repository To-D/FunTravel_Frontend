<template>
<div>
    <navbar page="Modify"></navbar>
    <upload-form v-if="this.picture && this.topics && this.topics.length > 0" :edit="true" :picture="this.picture" :topics="this.topics"></upload-form>
    <foot></foot>
</div>
</template>

<script>
import navbar from "../components/NavBar"
import foot from "../components/Footer"
import uploadForm from "../components/UploadForm"

export default {
    name:"Upload",    
    components:{navbar,foot,uploadForm},
    data(){
        return{
            picture:{},
            topics:[],
        }        
    },
    created(){
        if(!this.$store.state.token){
            this.$router.push("/login");
            this.notify("warning","Log in first!");
            return;
        }

        this.$axios
        .post('/canModify',{
            username:this.$store.state.username,
            pictureId:this.$route.params.pictureID
        })
        .then(resp=>{            
            
            if(resp.status === 200){                
                if(resp.data.message == "no"){
                    this.$router.push("/");
                    this.notify("warning","Sorry, you are not the uploader!")
                    return;
                }
                if(resp.data.message == "notfound"){
                    this.$router.push("/error")
                }

                this.picture = resp.data.picture;                                
                var tmp = JSON.parse(JSON.stringify(resp.data.topics));             
                var res = [];
                var len = tmp.length;
                for(var i = 0; i< len; i++){                    
                    res.push(tmp[i].topic);
                }                
                this.topics = res;                
                
            }
        })
        .catch(error=>{
            console.log(error);
        })
        
    }
    
}
</script>