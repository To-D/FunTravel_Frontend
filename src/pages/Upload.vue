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
    props:['pictureForm'],
    components:{navbar,foot,uploadForm}
    
}
</script>
<style scoped>

</style>