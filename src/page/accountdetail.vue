<template>
    <div class="accountdetail">
        <el-container>
            <el-header>
                <div class="header">
                    <p class="headertitle">{{titleMessage}}</p>
                    <i class="el-icon-close close" @click="handleClose"></i>
                </div>
            </el-header>
            <el-main>
                <div class="bigbox">
                    <el-form ref="form" :model="form" label-width="180px" :rules="formRules">
                        <el-form-item label="管理权限" prop="authList">
                            <el-checkbox-group v-model="form.authList">
                                <el-checkbox v-for="item in auths" :key="item.name" :label="item.value">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="管理员" v-if="pageType == 'edit'">
                            <div class="userinfo">
                                <img :src="userData.headimgurl" alt="">
                                <span>{{userData.nickname}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="创建时间" v-if="pageType == 'edit'">
                            <div style="margin-left: 30px">{{userData.createdDate}}</div>
                        </el-form-item>
                    </el-form>
                    <div class="buttonbox">
                        <el-button v-if="pageType == 'create'" type="primary" :disabled="!form.authList.length" @click="handleCreateAccount">立即添加</el-button>
                        <el-button v-if="pageType == 'edit'" @click="handleDeleteUser()">删除</el-button>
                        <el-button v-if="pageType == 'edit'" type="primary" @click="handleUpdata">保存</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import request from '@/assets/js/request'
export default {
    components: {

    },
    data () {
        return {
            titleMessage: '',
            pageType: '',
            userId: '',
            userData: {},
            auths: [],
            form:{
                authList: [],
            },
            formRules: {
                authList: { type: 'array', required: true, message: '请至少选择一个权限', trigger: 'change' }
            }
        }
    },
    computed:{

    },
    watch: {
        
    },
    created(){
        let params = this.$router.currentRoute.params
        this.pageType = params.type
        if(params.type){
            sessionStorage.pageType = params.type
        }
        if(params.userId){
            this.userId = params.userId
            sessionStorage.userId = params.userId
        }
        if(sessionStorage.pageType){
            this.pageType = sessionStorage.pageType
        }
        if(sessionStorage.userId){
            this.userId = sessionStorage.userId
        }

        if(this.pageType == 'create'){
            this.titleMessage = '创建管理员'
        }
        if(this.pageType == 'edit'){
            this.titleMessage = '编辑管理员'
            this.loadUserData()
        }

        this.$store.commit('handleDisplayMenu')
        this.loadAuthListData()
    },
    methods: {
        handleClose(){
            this.$router.history.go(-1)
        },
        handleCreateAccount(){
            request.post(this, '/admin/user/create',this.form).then((res) => {
                if(res.code == 1){
                    this.handleClose()
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msg.message ? res.msg.message : res.msg,
                        showClose: true,
                    })
                }
            })
        },
        handleDeleteUser(){
            request.get(this, '/admin/user/del/'+ this.userId).then((res) => {
                if(res.code == 1){
                    this.handleClose()
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msg.message ? res.msg.message : res.msg,
                        showClose: true,
                    })
                }
            })
        },
        handleUpdata(){
            let queryObj = Object.assign({},this.form,{userId: this.userId})
            request.post(this, '/admin/user/update', queryObj).then((res) => {
                if(res.code == 1){
                    this.$message({
                        type: 'success',
                        message: '保存成功',
                        showClose: true,
                    })
                    this.handleClose()
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msg.message ? res.msg.message : res.msg,
                        showClose: true,
                    })
                }
            })
        },
        loadUserData(){
            request.get(this, '/admin/user/'+ this.userId).then((res) => {
                if(res.code == 1){
                    this.userData = res.data
                    this.form.authList = res.data.authList
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msg.message ? res.msg.message : res.msg,
                        showClose: true,
                    })
                }
            })
        },
        loadAuthListData(){
            request.get(this, '/admin/user/allAuthList').then((res) => {
                if(res.code == 1){
                    let arr = []
                    for(let i in res.data){
                        arr.push({
                            name: res.data[i],
                            value: i
                        })
                    }
                    this.auths = arr
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msg.message ? res.msg.message : res.msg,
                        showClose: true,
                    })
                }
            })
        },
    }
}
</script>
<style lang="less">
.accountdetail{
    background: #f0f0f2;
    min-height: 100vh;
    .el-checkbox{
        display: block;
    }
    .el-checkbox:nth-child(1){
        margin-left: 30px;
    }
    .el-header{
        box-sizing: border-box;
        background: #f0f0f2;
    }
    .header{
        position: relative;
        width: 1400px;
        margin: 0 auto;
        .close{
            position: absolute;
            right: 0;
            top: 40px;
            font-size: 25px;
        }
    }
    .headertitle{
        height: 100px;
        text-align: center;
        line-height: 100px;
    }

    .bigbox{
        width: 1400px;
        min-height: calc(100vh - 150px);
        background: #fff;
        margin: 0 auto;
        padding-top: 50px;
        box-sizing: border-box;
    }
    .userinfo{
        display: flex;
        align-items: center;
        img{
            width: 86px;
            height: 86px;
            border-radius: 100%;
            margin-left: 30px;
        }
        span{
            font-size: 14px;
            margin-left: 20px;
        }
    }
    .buttonbox{
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 20px;
        width: 100%;
    }
}

</style>
