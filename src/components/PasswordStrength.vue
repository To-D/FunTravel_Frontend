<template>
    <div id="container">
        <el-row>
            <el-col :span="6" :offset="1">
                <el-progress :percentage="onePercentage" status="exception"  :stroke-width="width"></el-progress>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-progress :percentage="twoPercentage" status="warning"  :stroke-width="width"></el-progress>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-progress :percentage="ThreePercentage" status="success" :stroke-width="width"></el-progress>
            </el-col>
            <el-col :span="2" :offset="1" style="line-height: 15px;">
                {{content}}
            </el-col>
        </el-row>
    </div>
</template>
 
<script>
    export default {
        name: "PasswordStrength",
        model: {
            event: 'change',
            prop: 'password'
        },
        props: {
            password: {
                type: [String,Boolean,Number,Object],
                required: true,
                default: "",
            },
        },
        watch:{
            password(newValue){
                const mode = this.checkPasswordStrength(newValue);
                switch (mode) {
                    case 0:
                        this.content = '';
                        this.onePercentage = 0;
                        this.twoPercentage = 0;
                        this.ThreePercentage = 0;
                        break;
                    case 1:
                        this.content = 'LOW';
                        this.onePercentage = 100;
                        this.twoPercentage = 0;
                        this.ThreePercentage = 0;
                        break;
                    case 2:
                        this.content = 'MIDDLE';
                        this.onePercentage = 100;
                        this.twoPercentage = 100;
                        this.ThreePercentage = 0;
                        break;
                    case 3:
                        this.content = 'HIGH';
                        this.onePercentage = 100;
                        this.twoPercentage = 100;
                        this.ThreePercentage =100;
                        break;
                }
            }
        },
        data(){
            return{
                width:5,
                content:"",
                onePercentage:0,
                twoPercentage:0,
                ThreePercentage:0,
            }
        },
        methods:{
            //密码强度验证
            checkPasswordStrength(value) {
                let mode = 0;
                //正则表达式验证符合要求的
                if (value.length < 1) return mode;
                if (/\d/.test(value)) mode++; //数字
                if (/[a-z]/.test(value)) mode++; //小写
                if (/[A-Z]/.test(value)) mode++; //大写
                if (/~!@#$%^&*()_+`\-={}:";'<>?,.\//.test(value)) mode++; //特殊字符
                return mode;
            }
        }
    }
</script>
 
<style>
    .el-progress__text {
        display: none;
    }
    .el-progress-bar {
        padding-right: 0px;
        margin: 0px;
    }
</style>