<template>
<div>
    <navbar page="MyPictures"></navbar>
    <div class="out-container">
        <h2>My Pictures</h2>
        <show-picture v-if="childStart" :pictures="pictures" page="MyPictures"></show-picture>
    </div>
    <foot></foot>
</div>
</template>

<script>
import navbar from "../components/NavBar"
import foot from "../components/Footer"
import ShowPicture from "../components/ShowPicture"

export default {
    name:"MyPictures",
    components:{navbar,foot,ShowPicture},
    data(){
        return{
            pictures:[],
            childStart:false,
        }
    },
    created(){
        if(!this.$store.state.token){
            this.$router.push("/login");
            this.notify("warning","Log in first!")
        }
        this.$axios
        .post('/getMyPictures',{
            username:this.$store.state.username,
        })
        .then(resp=>{
            console.log(resp);
            if(resp.status === 200){
                this.pictures = resp.data;
                this.childStart = true;
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
</script>

<style scoped>
.out-container{
    margin-top:130px;
}
</style>