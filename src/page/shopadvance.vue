<template>
    <div class="accountadvance">
        <el-container>
            <el-header>
                <div class="header">
                    <p class="headertitle">{{shopData.shopType == 'SCENIC' ? '创建景区' : '创建酒店'}}</p>
                    <i class="el-icon-close close" @click="handleClose"></i>
                </div>
              
            </el-header>
            <el-main>
                <div class="bigbox">
                    <div class="shopbaseinfo">
                        <div class="icon el-icon-success"></div>
                        <div class="shopname">
                            <p>{{shopData.name}}</p>
                            <p class="tips">已成功创建商家，创建时间{{shopData.createdDate}}</p>
                        </div>
                        <div class="litemallqr">
                            <img :src="shopData.liteMallQr" alt="">
                            <p class="tips">tips: 右键图标保存哦！</p>
                        </div>
                    </div>
                    <div class="tipbox">
                        <i class="el-icon-warning"></i>为更高效的管理商家，建议立即完善以下信息
                    </div>
                    <el-form ref="shopform" :model="shopform" label-width="180px">
                        <el-form-item label="所属景点" v-if="shopData.shopType == 'HOTEL'">
                            <el-input :disabled="true" :value="relationContent" placeholder="请选择相关联内容" style="width: 400px;">
                                <el-button slot="append" style="background: #fff" @click="handleSelectContent">关联内容</el-button>
                            </el-input>
                            <p class="tips">用户可以通过景点找到您的酒店</p>
                        </el-form-item>
                        <el-form-item label="商家图片">
                            <uploadimg :image-url="shopform.imgUrl ? shopform.imgUrl + '?imageMogr2/thumbnail/!120x120r/gravity/Center/crop/120x120' : ''" 
                            :is-show-file-list="true"
                            @on-success="handleUploadSuccess" 
                            @on-remove="handleUploadRemove"/>
                        </el-form-item>
                        <el-form-item label="其他图片">
                            <uploadimg :image-list="shopform.imgList" 
                            :is-multiple="true" 
                            :width="800"
                            @on-delete="handleDeleteImg"
                            @on-edit-success="handleEditImg"
                            @on-success="handleUploadMultipleSuccess"/>
                        </el-form-item>
                        <el-form-item label="简介">
                            <el-input v-model="shopform.intro" type="textarea" style="width: 500px"></el-input>
                            <p class="tips">限200字以内</p>
                        </el-form-item>
                        <el-form-item label="详细介绍">
                            <imgtext
                                :data-list="shopform.details"
                                @on-add-text="handleAddText"
                                @on-add-img="handleAddImg"
                                @on-sort="handleChangeSort"
                                @on-edit="handleEditText"
                                @on-delete-item="handleDeleteItem"
                            ></imgtext>
                        </el-form-item>
                    </el-form>
                    <div class="buttonbox">
                        <el-button type="primary" @click="handleUpdataShop">保存</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
 
        <pickdata 
            :title="pickTitle"
            :visible="dialogVisible"
            :pickdata="pickDataList"
            :totaldata="totalEl"
            :selected-obj="pickedData"
            :active="'shop'"
            :menus="menuList"
            @on-complete="onComplete"
            @on-search="onSearch"
            @on-loaddata="onLoadPickData"
            @on-turanpage="onTurnPage"
            @on-cancle="onCancle">
        </pickdata>

        <el-dialog
        title="添加文字"
        :visible.sync="detailDialogVisible"
        :modal-append-to-body="false"
        top="50vh"
        :before-close="handleDialogClose">
            <el-input v-model="detailText" type="textarea" :autosize="textareaHeight" style="width: 500px;"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddTextComplete">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import request from '@/assets/js/request'
import uploadimg from '@/components/uploadimg'
import pickdata  from '@/components/pickdata'
import imgtext  from '@/components/imgtext'

export default {
    components: {
        uploadimg, pickdata, imgtext
    },
    data () {
        return {
            shopId: null,
            shopData: {},


            //pickdata
            pickTitle: '选择景区',
            relationContent: '',
            dialogVisible: false,
            filter: {
                key: '',
                page: 1,
                pageSize: 8,
                shopType: 'SCENIC',
            },
            pickDataList: [],
            pickedData: {},
            totalEl: 0,
            menuList: [{name: '景区',index: 'shop'}],

            //detail
            detailDialogVisible: false,
            detailText: '',
            textareaHeight: {
                minRows: 3,
                maxRows: 10 
            },
            isEdit: false,
            detailIndex: null,

            shopform:{
                id: '',
                imgUrl: '',
                details: [],
                imgList: [],
            },
        }
    },
    computed:{

    },
    watch: {
        
    },
    created(){
        let params = this.$router.currentRoute.params

        if(params.id){
            this.shopId = params.id
            this.shopform.id = params.id
            sessionStorage.shopId = params.id
        }

        if(sessionStorage.shopId){
            this.shopId = sessionStorage.shopId
            this.shopform.id = sessionStorage.shopId
        }

        this.loadData()
        this.$store.commit('handleDisplayMenu')
    },
    methods: {
        handleClose(){
            this.$router.history.go(-1)
        },
        handleUploadSuccess(res){
            this.shopform.imgUrl = 'http://cdn.genwoshua.com/' + res.key
        },
        handleUploadRemove(res){
            this.shopform.imgUrl = ''
        },
        handleUploadMultipleSuccess(res){
            this.shopform.imgList.push('http://cdn.genwoshua.com/' + res.key)
        },
        handleDeleteImg(index){
            this.shopform.imgList.splice(index,1)
        },
        handleEditImg(res,index,cb){
            this.shopform.imgList[index] = 'http://cdn.genwoshua.com/' + res.key
            cb && cb()
        },
        handleSelectContent(){
            this.dialogVisible = true
            this.onLoadPickData()
        },
        //pickdata
        onCancle(){
            this.dialogVisible = false
        },
        onSearch(key){
            this.filter.page = 1
            this.filter.key = key
            this.onLoadPickData()
        },
        onLoadPickData(){
            let url = '/admin/shop/webQuery'
            this.loadPickData(url)
        },       
        onTurnPage(page){
            this.filter.page = page
            this.onLoadPickData()
        },
        onComplete(selectObj){
            this.dialogVisible = false
            this.relationContent = selectObj.name
            this.shopform.relateShop = selectObj
            this.pickedData = selectObj
        },
        loadPickData(url){
            request.post(this, url, this.filter).then((res) => {
                if(res.code == 1){
                    this.pickDataList = res.data.content
                    this.totalEl = res.data.totalElements
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msg.message ? res.msg.message : res.msg,
                        showClose: true,
                    })
                }
            })
        },

        //detail
        handleAddText(){
            this.detailDialogVisible = true
        },  
        handleAddImg(res){
            let img = 'http://cdn.genwoshua.com/' + res.key
            this.shopform.details.push({type: 'img',content: img})
        },
        handleChangeSort(index,type){
            let arr = [...this.shopform.details]
            if(type == 'up'){
                arr[index] = this.shopform.details[index-1]
                arr[index-1] = this.shopform.details[index]
            }else{
                arr[index] = this.shopform.details[index+1]
                arr[index+1] = this.shopform.details[index]
            }
            this.shopform.details = []
            arr.map(item => {
                this.shopform.details.push(item)
            })
        },
        handleEditText(index){
            this.isEdit = true
            this.detailIndex = index
            this.detailDialogVisible = true
            this.detailText = this.shopform.details[index].content
        },
        handleDeleteItem(index){
            this.shopform.details.splice(index,1)
        },
        handleDialogClose(){
            this.detailDialogVisible = false
        },
        handleAddTextComplete(){
            if(this.isEdit){
                this.shopform.details[this.detailIndex].content = this.detailText
            }else{
                this.shopform.details.push({
                    type: 'text',
                    content: this.detailText
                })
            }
            this.detailDialogVisible = false
            this.isEdit = false
            this.detailText = ''
        },

        handleUpdataShop(){
            request.post(this, '/admin/shop/update', this.shopform).then((res) => {
                if(res.code == 1){
                    this.$router.history.go(-1)
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msg.message ? res.msg.message : res.msg,
                        showClose: true,
                    })
                }
            })
        },
        loadData(){
            request.get(this, '/admin/shop/' + this.shopId).then((res) => {
                if(res.code == 1){
                    this.shopData = res.data
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msg.message ? res.msg.message : res.msg,
                        showClose: true,
                    })
                }
            })
        }
    }
}
</script>
<style lang="less">
.accountadvance{
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
        box-sizing: border-box;
        padding-bottom: 60px;
    }

    .shopbaseinfo{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 100px;
        box-sizing: border-box;
        height: 120px;
        background: #E1E6E8;
        .icon{
            font-size: 45px;
            color: #8BC34A;
        }
        .shopname{
            flex: 1;
            color: #606266;
            margin-left: 20px;
        }
        .tips{
            margin-top: 5px;
        }
        .litemallqr{
            text-align: center;
            img{
                width: 80px;
                height: 80px;
                margin: 0 auto;
            }
        }
    }

    .tipbox{
        display: flex;
        align-items: center;
        height: 50px;
        padding: 0 100px;
        box-sizing: border-box;
        background: rgb(220, 231, 245);
        font-size: 14px;
        color: #606266;
        margin-bottom: 20px;
        .el-icon-warning{
            font-size: 18px;
            color: #00c8fb;
            margin-right: 10px;
        }
    }

    .buttonbox{
        display: flex;
        justify-content: center;
        margin-top: 60px;
    }
}

</style>
