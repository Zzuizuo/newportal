<template>
    <div id="uploadimg" :style="{width: width+'px'}">
        <el-upload
            class="avatar-uploader"
            action="http://upload.qiniup.com/"
            :on-remove="handleRemove"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :on-change="handleChange"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
            :multiple="isMultiple"
            :show-file-list="isShowList"
            :data="uploadObj">
            <div v-if="isMultiple" class="multiple">
                <div class="imgitem" v-if="imgList.length" v-for="(item,index) in imgList" :key="index" 
                @mousemove="handleModelShow(index)"
                @mouseout="handleModelNone">
                    <img :src="item+ '?imageMogr2/thumbnail/!120x120r/gravity/Center/crop/120x120'" class="avatar" @click="handleGetToken(index)">
                    <div v-if="currentIndex === index" class="model">
                        <i class="el-icon-edit" @click="handleEdit(index)"></i>
                        <i class="el-icon-delete" @click.stop="handleDelete(index)"></i>
                    </div>
                </div>
                <i class="el-icon-plus avatar-uploader-icon" @click="handleGetToken"></i>
            </div>
            <div v-if="!hasPlusIcon && !isMultiple">
                <img v-if="imgUrl" :src="imgUrl" class="avatar" @click="handleGetToken">
                <i v-else class="el-icon-plus avatar-uploader-icon" @click="handleGetToken"></i>
            </div>
            <div v-if="hasPlusIcon">
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
            imgUrl: '',
            imgList: [],
            fileList: [],
            uploadObj: {
                token: ''
            },
            isShowList: false,
            modelShow: false,
            currentIndex: null,
            boxWidth: 0,
            isEdit: false,
            editIndex: null,
        }
    },
    props:{
        isMultiple:{
            type: Boolean,
            default: false,
        },
        isShowFileList: {
            type: Boolean,
            default: false,
        },
        imageUrl: {
            type: String,
            default: ''
        },
        imageList: {
            type: Array,
            default: () => {
                return []
            }
        },
        hasPlusIcon: {
            type: Boolean,
            default: false,
        },
        width: {
            type: Number,
            default: 400
        }
    },
    computed:{

    },
    watch: {
        imageUrl(val){
            this.$nextTick(() =>{
                this.imgUrl = val
            })
        },
        imageList(val){
            this.imgList = val
        }
    },
    created(){
        this.isShowList = this.isShowFileList
        this.boxWidth = this.width
        if(this.isMultiple){
            this.imgList = this.imageList
        }else{
            this.imgUrl = this.imageUrl
        }
    },
    methods:{
        handleRemove(file, fileList) {
            this.$emit('on-remove',file)
        },
        handleChange(file, fileList){
            if(this.isMultiple){
                this.fileList = fileList
            }else{
                this.fileList = [fileList[fileList.length - 1]]
            }
        },
        handleUploadSuccess(res,file,fileList){
            this.$message({
                showClose: true,
                message: '上传成功',
                type: 'success'
            })
            if(!this.isMultiple){
                this.fileList = [fileList[fileList.length - 1]]
                this.imgUrl = 'http://cdn.genwoshua.com/' + res.key
            }
            if(this.isEdit){
                this.$emit('on-edit-success',res,this.editIndex,this.updateEditStatus)
            }else{
                this.$emit('on-success',res)
            }
        },
        updateEditStatus(){
            this.isEdit = false
            this.editIndex = index
        },
        handleUploadError(res){
            this.$emit('on-error',res)
        },
        beforeAvatarUpload(file) {
            const isGIF = file.type === 'image/gif';
            if (isGIF) {
                this.fileList = []
                this.$message.error('上传头像图片不能是 GIF 格式!');
            }
            return !isGIF;
            // this.$emit('on-checkImg',file)
        },

        handleModelShow(index){
            this.currentIndex = index
        },
        handleModelNone(){
            this.currentIndex = null
        },
        handleEdit(index){
            this.isEdit = true
            this.editIndex = index
            this.handleGetToken()
        },
        handleDelete(index){
            this.$emit('on-delete',index)
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
#uploadimg{
    width: 400px;
    .avatar-uploader .el-upload {
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
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
    .multiple{
        display: flex;
        flex-wrap: wrap;
        img{
            border-radius: 6px;
        }
        .imgitem{
            margin: 0 10px 10px 0;
            border: 1px solid #d9d9d9;
            border-radius: 6px;
            position: relative;
            .model{
                display: flex;
                align-items: center;
                justify-content: space-around;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, .3);
                border-radius: 6px;
                font-size: 25px;
                color: #00c8fb;
            }
        }
    }
}
</style>
