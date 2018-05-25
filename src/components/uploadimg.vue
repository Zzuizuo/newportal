<template>
    <div class="uploadimg">
        <el-upload
            class="avatar-uploader"
            action="http://upload.qiniup.com/"
            :on-remove="handleRemove"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :on-change="handleChangeVideo"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
            :multiple="isMultiple"
            :data="uploadObj">
            <div v-if="!hasPlusIcon">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" @click="handleGetToken">
                <i v-else class="el-icon-plus avatar-uploader-icon videobox" @click="handleGetToken"></i>
            </div>
            <div v-else>
                <div @click="handleGetToken">
                    <slot name="icon"></slot>
                </div>
            </div>            
        </el-upload>
    </div>
</template>

<script>
import request from '@/assets/js/request'

export default{
    data(){
        return{
            fileList: [],
            uploadObj: {
                token: ''
            }
        }
    },
    props:{
        isMultiple:{
            type: Boolean,
            default: false,
        },
        imageUrl: {
            type: String,
            default: ''
        },
        hasPlusIcon: {
            type: Boolean,
            default: false,
        }
    },
    computed:{

    },
    watch: {

    },
    created(){

    },
    methods:{
        handleRemove(file, fileList) {
            this.$emit('on-remove',file)
        },
        handleChangeVideo(file, fileList){
            this.fileList = [fileList[fileList.length - 1]]
        },
        handleUploadSuccess(res,file,fileList){
            this.fileList = [fileList[fileList.length - 1]]
            this.$message({
                showClose: true,
                message: '上传成功',
                type: 'success'
            })
            this.$emit('on-success',res)
        },
        handleUploadError(res){
            this.$emit('on-error',res)
        },
        beforeAvatarUpload(file) {
            // this.$emit('on-checkImg',file)
            const isGIF = file.type === 'image/gif';
            // const isLt2M = file.size / 1024 / 1024 < 2;

            if (isGIF) {
                this.fileList = []
                this.$message.error('上传头像图片不能是 GIF 格式!');
            }
            // if (!isLt2M) {
            //     this.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            return !isGIF;
        },
        handleGetToken(){
            request.get(this, '/admin/qiniu/getUpToken',{type: 'image'}).then((data)=>{
                if(data.code === 1){
                    this.uploadObj.token = data.data.token
                }
            })
        }
    },
}
</script>

<style lang="less">
.uploadimg{
    width: 400px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.avatar {
    width: 120px;
    height: 120px;
    display: block;
}
</style>
