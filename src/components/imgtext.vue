<template>
    <div>
        <div id="scrollbarbox">
            <el-scrollbar class="scrollbar">
                <div class="content">
                    <div v-for="(item,index) in imgtextList" :key="index" class="imgtextitem" 
                    @mousemove="handleItemMousein(index)" @mouseout="handleItemMouseOut()">
                        <div class="img" v-if="item.type == 'img'">
                            <img :src="item.content" alt="">
                        </div>
                        <div class="text" v-else>
                            <p>{{item.content}}</p>
                        </div>
                        <div class="itemmask" v-show="maskShow && index === currentIndex">
                            <div class="maskicon">
                                <i v-if="index != imgtextList.length - 1" class="el-icon-sort-down" @click="handleChangeListDown(index)"></i>
                                <i v-if="index != 0" class="el-icon-sort-up" @click="handleChangeListUp(index)"></i>
                                <i v-if="item.type != 'img'" class="el-icon-edit" @click="handleEdit(index)"></i>
                                <i class="el-icon-delete" @click="handleDelete(index)"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="editbox" @mousemove="handlemouseIn" @mouseout="handleMouseOut">
                    <i v-if="!isAdd" class="el-icon-plus add"></i>
                    <div v-show="isAdd" class="addbox">
                        <div class="picbox">
                            <uploadimg :image-url="imgUrl" :is-multiple="false" :has-plus-icon="true"
                                class="uploadimg"
                                @on-add-img="handleAddImg" 
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
            maskShow: false,
            currentIndex: null,
            imgUrl: '',
            imgtextList: [],
        }
    },
    props:{
        dataList: {
            type: Array,
            default: []
        }
    },
    computed:{
            
    },
    watch: {
        dataList(list){
            this.imgtextList = list

            // this.imgtextList = []
            // list.map(item => {
            //     this.imgtextList.push(item)
            // })
        }
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
            this.$emit('on-add-text')
        },
        handleAddImg(res){
            this.$message({
                showClose: true,
                message: '上传成功',
                type: 'success'
            })
            this.$emit('on-add-img',res)
        },
        handleError(res){
            this.$message({
                showClose: true,
                message: '上传失败',
                type: 'error'
            })
        },
        handleUploadRemove(res){
        },


        handleItemMousein(index){
            this.currentIndex = index
            this.maskShow = true
        },
        handleItemMouseOut(){
            this.currentIndex = null
            this.maskShow = false
        },
        handleChangeListDown(index){
            this.$emit('on-sort',index,'down')
        },
        handleChangeListUp(index){
            this.$emit('on-sort',index,'up')
        },
        handleEdit(index){
            this.$emit('on-edit',index)
        },
        handleDelete(index){
            this.$emit('on-delete-item',index)
        },

       
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
            .imgtextitem{
                position: relative;
                .itemmask{
                    display: flex;
                    align-items: center;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(255,255,255,.8);
                    .maskicon{
                        display: flex;
                        justify-content: space-around;
                        cursor: pointer;
                        width: 100%;
                        padding: 0 50px;
                        font-size: 25px;
                        text-align: center;
                        color: #C0C4CC;
                        i{
                            &:hover{
                                color: #606266;
                            }
                        }
                    }
                }
            }
            .img{
                width: 100%;
                margin-bottom: 10px;
                img{
                    width: 100%;
                }
            }
            .text{
                width: 100%;
                margin-bottom: 10px;
            }
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
    .el-upload-list__item-name,.el-upload-list__item-status-label{
        display: none;
    }
}
</style>
