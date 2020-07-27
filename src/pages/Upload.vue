<template>
    <div>
        <navbar></navbar>
        <upload-form></upload-form>
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
    created(){
        if(!this.$store.state.token){
            this.$router.push("/login");
            this.notify("warning","Log in first!")
        }
    }
}
</script>