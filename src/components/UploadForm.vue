<template>
<div class="outer-container">
    <h2>Upload New Picture</h2>
    <el-row>
        <el-form
        @submit.native.prevent
        status-icon
        :model="form"
        label-position="top"
        :rules="rules"
        ref="form"
        v-loading="loading"
        >
        <el-col :span="11" :offset="2">            
                <el-form-item prop="file">
                    <el-upload
                        ref="upload"
                        action="#"
                        class="picture-uploader"                                                       
                        :auto-upload="false"                        
                        :on-change="handleChange"                        
                        :on-remove= "handleRemove"
                        :on-exceed="handleExceed"
                        :file-list="files"
                        :limit="1"
                        accept="image/jpeg"                        
                    >
                    <!-- :http-request="upload"
                        :before-upload="onBeforeUpload" -->
                    <div v-if="imageUrl" class="img-preview">
                        <img  :src="imageUrl" class="avatar">
                    </div>
                    <div v-else>
                    <i class="el-icon-plus avatar-uploader-icon"></i>                    
                    </div>
                    </el-upload>
                </el-form-item>            
        </el-col>
        <el-col :span="7">
            <el-form-item label="Title" prop="title">
                <el-input                
                placeholder="TITLE"
                v-model="form.title"
                type="text"
                auto-complete="false"
                >
                </el-input>
            </el-form-item>

            <el-form-item label="Author" prop="author">
                <el-input
                placeholder="AUTHOR"
                v-model="form.author"
                type="text"
                auto-complete="false"
                >
                </el-input>
            </el-form-item> 

            
            <el-form-item prop="topic" label="Topic" class="is-required">                                                 
                <el-tag                                    
                  closable
                  @close="handleClose(topic)"
                  type="warning"
                  v-for="topic in form.topics"
                  :key="topic.id"
                
                ><i class="el-icon-price-tag"></i> {{topic}}</el-tag>
                <el-input
                  class="input-new-tag"                  
                  v-if="inputVisible"
                  v-model="newTag"
                  ref="saveTagInput"               
                  size="small"    
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"              
                ></el-input>
                <el-button v-else size="small" @click="showInput">+ New Topic</el-button>                    
              </el-form-item>

              <el-col :span="12" class="select-container">
                <el-form-item prop="nation" label = "Nation" class="is-required">
                    <el-select v-model="form.nation" placeholder="Nations" @change="nationChange">
                        <el-option
                        v-for="nation in nations"
                        :key="nation.value"
                        :label="nation.label"
                        :value="nation.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
              </el-col>

            <el-col :span="12">
              <el-form-item prop="city" label = "City" class="is-required">
                  <el-select v-model="form.city" clearable placeholder="Choose nation first" >
                        <el-option
                        v-for="city in cities"
                        :key="city.value"
                        :label="city.label"
                        :value="city.value" 
                        >
                        </el-option>
                    </el-select>
              </el-form-item>
            </el-col>

            <el-form-item label="Introduction" prop="intro">            
                <el-input
                placeholder="INTRO"
                v-model="form.intro"
                type="textarea"
                auto-complete="false"
                :rows="2"
                maxlength="100"
                show-word-limit                
                >
                </el-input>        
            </el-form-item>

            <el-form-item>
                <el-button type="warning" @click="dialogVisible = true" v-if="edit">Confirm Modify</el-button>
                <el-button type="warning" @click="dialogVisible = true" v-else>Submit</el-button>
            </el-form-item>
        </el-col>  
        </el-form>
    </el-row>        

    <el-dialog
        title="Confirm"
        :visible.sync="dialogVisible"
        width="30%"
    >
        <span v-if="!edit">Are you sure about your picture information?</span>
        <span v-else>Are you sure about your modification?</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">No</el-button>
            <el-button type="warning" @click="Submit('form')">Yes</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    name:"uploadForm",
    props:{
        picture:Object,
        edit:{
            type:Boolean,
            default:false,
        },
        topics:Array,
    },        
    inject: ["reload"],
    data(){
        return{
            // isEdit:false,

            loading:false,
            imageUrl: '',
            newTag:"",
            inputVisible:false,
            file:null,
            files:[],

            nations: [{
                value: 'China',
                label: 'China'
                },{
                value: 'America',
                label: 'America'
                },{
                value: 'Japan',
                label: 'Japan'
                },{
                value: 'Korea',
                label: 'Korea'
                },{
                value: 'Canada',
                label: 'Canada'
                },
            ],
            cities:[],         
            dialogVisible:false,
 
            form:{
                title:"",
                author:"",
                topics:[],
                intro:"",
                nation:"",
                city:"",
            },
            rules:{                
                title: [
                {
                  required: true,
                  message: "Title of your picture is required",
                  trigger: "change"
                }                
              ],
              author: [
                {
                  required: true,
                  message: "Author of your picture is required",
                  trigger: "change"
                }                
              ],
              topic: [
                  {
                    validator:(rule,value,callback)=>{
                        if(this.form.topics.length == 0) {
                            callback(new Error('Topics are required'));
                        }
                    callback();
                    },
                    trigger:"blur"
                  }                    
                ],
              intro: [
                {
                  required: true,
                  message: "Please give a short intro of your picture",
                  trigger: "change"
                }                
              ],              
            }
        }
    },
    created(){        
        if(this.edit){
            this.form = this.picture;        
            this.form.topics = this.topics;
            console.log(this.form.topics);
            var name = this.picture.title +".jpg";
            this.files=[{name:name}],
            this.imageUrl = this.GLOBAL.baseUrl+"/images/"+this.picture.url;                       
        }
    },
    methods:{
        handleChange(file, fileList) {            
            this.imageUrl = URL.createObjectURL(file.raw);
            this.file = file;                        
        },        
        handleRemove(){
            this.imageUrl=''
            this.file = null
        },
        handleExceed(){
            this.notify("warning","Please upload only one picture once!");
        },
        handleClose(tag) {
            this.form.topics.splice(
                this.form.topics.indexOf(tag),
                1
            );
            this.$refs.form.validateField("topic");            
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
        });
        },
        handleInputConfirm() {
            let newTag = this.newTag;
            if (newTag && this.form.topics.indexOf(newTag) == -1) {
                this.form.topics.push(newTag);                
            }
            this.inputVisible = false;
            this.newTag = "";
        },        
        nationChange(){
            this.form.city="";
            switch(this.form.nation){
                case "China":
                    this.cities=[{
                        value: 'BeiJing',
                        label: 'BeiJing',
                    },{
                        value: 'ShangHai',
                        label: 'ShangHai',
                    },{
                        value: "WuHan",
                        label: "Wuhan",                        
                    },{
                        value:"ShenZhen",
                        label:"ShenZhen",
                    },{
                        value:"YunNan",
                        label:"YunNan",
                    },{
                        value:"AnHui",
                        label:"AnHui",
                    }]
                    break;
                case "America":
                    this.cities=[{
                        value:"NewYork",
                        label:"NewYork",
                    },{
                        value:"Washington",
                        label:"Washington",
                    }]
                    break;
                case "Japan":
                    this.cities=[{
                        value:"Tokoyo",
                        label:"Tokoyo",
                    },{
                        value:"Hokkaido",
                        label:"Hokkaido",
                    }]
                    break;
                case "Canada":
                    this.cities=[{
                        value:"Ottawa",
                        label:"Ottowa",
                    },{
                        value:"Toronto",
                        label:"Toronto",
                    }]
                    break;
                case "Korea":
                    this.cities=[{
                        value:"Seoul",
                        label:"Seoul",
                    },{
                        value:"Pusan",
                        label:"Pusan",
                    }]
                    break;
                default:
                    this.cities=[];
            }
        },        
        confirmForm(){            
            let _this = this;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if(this.form.nation == "" || this.form.city == ""){
                        this.notify("warning","Please choose nation and city!")
                        return;                
                    }
                    // upload but no picture
                    if(!this.edit && !this.file){
                        this.notify("warning","Please upload your picture!")
                        return;
                    }       
                    this.dialogVisible = true;
                }else {
                this.$message.error("Wrong submit! Please check the form.");                
                }
            });
        },
      Submit(formName) {        
            this.loading = true;            
            
            var data = new FormData(); 
            var picture = this.form;
            data.append("title", picture.title);
            data.append("author", picture.author);            
            data.append("topics", picture.topics);
            data.append("intro", picture.intro);                        
            data.append("nation", picture.nation);                        
            data.append("city", picture.city);                             
                      
            if(!this.edit){ // upload                
                data.append("username",this.$store.state.username);  
            }else{  //edit
                 data.append("pictureId",this.$route.params.pictureID);
            }            
            
            if(this.file != null){
                data.append("file", this.file.raw);               
            }            

            var config = {
              headers: { "Content-Type": "multipart/form-data" }
            };

            var url = '/upload';

            this.$axios
            .post(url, data, config)
            .then(resp => {
              if (resp.status === 200) {                
                this.loading = false;                
                this.notify("success","Upload Successfully");                
                this.reload();
              }
            })
            .catch(error => {
              console.log(error);
              this.loading = false;
            });          
      },          
    }
    
}
</script>

<style scoped>
.outer-container{
    margin-top:130px;
}
.input-new-tag {
  width: 103px;
  margin-right: 5px;
  vertical-align: bottom;
}
.img-preview{
    width: 600px;
    height:350px;
}
h2{
    cursor:auto;
}
</style>
<style>
.el-form-item__content{
    line-height: 1.5;
}
.el-select{
    margin:0 10px 0 0;
}
.picture-uploader {        
    border-radius: 6px;
    cursor: pointer;    
    overflow: hidden;
    position:relative;
    width: 600px;
    height: 400px;    
    margin-top:80px;      
  }
.avatar-uploader-icon {
    font-size: 50px;
    color: #8c939d;
    width: 600px;
    height: 400px;
    line-height: 400px;
    text-align: center;
  }
  .avatar {
    border-radius: 6px;
    width:100%;
    height: 100%;
    object-fit: fill;
    display: block;
  }

.el-textarea__inner{
    padding:5px 52px 5px 15px;
}

</style>