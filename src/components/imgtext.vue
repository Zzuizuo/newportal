<template>
    <div id="scrollbarbox">
        <el-scrollbar class="scrollbar">
            <div class="content">
                <div v-for="(item,index) in imgtextList" :key="index">
                    <img v-if="item.type == 'img'" :src="item.content" alt="">
                    <p v-else>{{item.content}}</p>
                </div>
            </div>
            <div class="editbox" @mousemove="handlemouseIn" @mouseout="handleMouseOut">
                <i v-if="!isAdd" class="el-icon-plus add"></i>
                <div v-else class="addbox">
                    <div class="picbox">
                        <uploadimg :image-url="imgUrl" :is-multiple="false" :has-plus-icon="true"
                            class="uploadimg"
                            @on-success="handleAddImg" 
                            @on-error="handleError"
                            @on-remove="handleUploadRemove">
                            <template slot="icon">
                                <div class="pic">
                                    <i class="el-icon-picture-outline"></i>
                                    <p class="text">添加图片</p>
                                </div>
                            </template>
                        </uploadimg>
                    </div>

                    <div class="text" @click="handleAddText">
                        <i class="el-icon-document"></i>
                        <p>添加文字</p>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script>
import request from '@/assets/js/request'
import uploadimg from './uploadimg'

export default{
    components: {
        uploadimg
    },
    data(){
        return{
            isAdd: false,
            imgUrl: '',
            imgtextList: [],
        }
    },
    props:{
        
    },
    computed:{

    },
    watch: {

    },
    created(){

    },
    methods:{
        handlemouseIn(){
            this.isAdd = true
        },
        handleMouseOut(){
            this.isAdd = false
        },

        handleAddText(){

        },
        handleAddImg(res){
            this.$message({
                showClose: true,
                message: '上传成功',
                type: 'success'
            })
            let img = 'http://cdn.genwoshua.com/' + res.key + '?imageMogr2/thumbnail/!120x120r/gravity/Center/crop/120x120'
            this.imgtextList.push({type: 'img',content: img})
        },
        handleError(res){
            this.$message({
                showClose: true,
                message: '上传失败',
                type: 'error'
            })
        },
        handleUploadRemove(res){
        }
    },
}
</script>
<style lang="less">
#scrollbarbox{
    width: 430px;
    height: 480px;
    border: 1px solid #C0C4CC;
    .scrollbar{
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        .content{

        }
        .editbox{
            position: relative;
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px dashed #DCDFE6;
            &:hover{
                border: 1px dashed #C0C4CC;
            }
            .add{
                font-size: 60px;
                color: #C0C4CC;
            }
            .addbox{
                display: flex;
                justify-content: space-around;
                font-size: 50px;
                color: #C0C4CC;
                .picbox{
                    cursor: pointer;
                    position: relative;
                    margin-right: 80px;
                    p{
                        font-size: 14px;
                        text-align: center;
                    }
                    .uploadimg{
                        width: 56px;
                        height: 90px;
                        opacity: 100%;
                    }
                    .pic{
                        &:hover{
                            color: #606266
                        }
                    }
                }
                .text{
                    cursor: pointer;
                    &:hover{
                        color: #606266
                    }
                    p{
                        font-size: 14px;
                        text-align: center;
                    }
                }
            }
        }
    }
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
    .avatar-uploader .el-upload {
        border: 0;
        color: #C0C4CC;
    }
}
</style>
