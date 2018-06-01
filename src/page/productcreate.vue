<template>
    <div id="productcreate">
        <el-container>
            <el-header>
                <div class="header">
                    <p class="headertitle">创建商品</p>
                    <i class="el-icon-close close" @click="handleClose"></i>
                </div>
            </el-header>
            <el-main>
                <div class="bigbox">
                    <el-form ref="productform" :model="productform" label-width="180px" :rules="formRules">
                        <div class="title">基本信息</div>
                        <el-form-item label="商品名称" prop="name">
                            <el-input v-model="productform.name" placeholder="请输入名称" style="width: 240px"></el-input>
                            <p class="tips">限32字以内</p>
                        </el-form-item>
                        <el-form-item label="商品图片" prop="imgUrl">
                            <uploadimg :image-url="productform.imgUrl ? productform.imgUrl + '?imageMogr2/thumbnail/!120x120r/gravity/Center/crop/120x120' : ''" 
                            :is-show-file-list="true"
                            @on-success="handleUploadSuccess" 
                            @on-remove="handleUploadRemove"/>
                        </el-form-item>
                        <el-form-item label="商品规格" prop="productType">
                            <el-radio-group v-model="productform.productType" @change="handleProductTypeChange">
                                <el-radio label="CARD">普通类</el-radio>
                                <el-radio label="APPOINTMENT_CARD">预约类</el-radio>
                                <el-radio label="HOTEL">住宿类</el-radio>
                                <el-radio label="TRAVEL">出行类</el-radio>
                            </el-radio-group>
                            <span style="margin-left:100px" class="tips"><i class="el-icon-warning"></i> 切换后数据将清空哦</span>

                            <tap style="margin-top: 20px"
                            :has-data="hasEditData"
                            @on-add="handleAddScaleType"
                            @on-success="handleAddScale"> 
                                <template slot="complete">
                                    <div v-if="productform.productType == 'CARD' || productform.productType == 'APPOINTMENT_CARD'">
                                        <div v-for="(item,index) in productform.scaleList" :key="index" class="scale">
                                            <div class="scaleitem" v-if="!isEditScale">
                                                <div style="flex: 1">
                                                    <div>
                                                        规格名称：{{item.name}}，售卖价格：￥{{item.price}}，原始价格：￥{{item.originPrice}}，库存：￥{{item.amount}}
                                                    </div>  
                                                    <div>
                                                        日常加价：￥{{item.dailyAppointPrice}}，日常加库存：{{item.dailyAppointAmount}}；
                                                        周末加价：￥{{item.weekendAppointPrice}}，周末加库存：{{item.weekendAppointAmount}}；
                                                        假日加价：￥{{item.holidayAppointPrice}}，假日加库存：{{item.holidayAppointAmount}}；
                                                    </div>
                                                </div>
                                                <div style="width: 100px">
                                                    <a href="javascript:;" style="margin-left:20px" class="link" @click="handleDeleteScale(index)">删除</a>
                                                    <a href="javascript:;" class="link" @click="handleEditScale(index,'normal')">编辑</a>
                                                </div>
                                            </div> 
                                            <div v-if="index == currentEditIndex" class="createbox">
                                                <el-form-item label="规格名称" label-width="90px">
                                                    <el-input v-model="scale.name" placeholder="请输入规格名称" maxlength="16" style="width: 400px"></el-input>
                                                </el-form-item>
                                                <el-form-item label="售卖价格" label-width="90px">
                                                    <el-input v-model="scale.price" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                </el-form-item>
                                                <el-form-item label="原始价格" label-width="90px">
                                                    <el-input v-model="scale.originPrice" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                </el-form-item>
                                                <el-form-item label="库存" label-width="90px">
                                                    <el-input v-model="scale.amount" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                </el-form-item>
                                                <div v-if="productform.productType != 'CARD'"> 
                                                    <p class="tips">预约</p>
                                                    <el-form-item label="日常" label-width="90px">
                                                        <div class="createedititem">
                                                            <div class="item">
                                                                <div class="itemtitle">加价</div>     
                                                                <el-input v-model="scale.dailyAppointPrice" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                            </div>
                                                            <div class="item">
                                                                <div class="itemtitle">加库存</div>     
                                                                <el-input v-model="scale.dailyAppointAmount" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                            </div>
                                                        </div>
                                                    </el-form-item>

                                                    <el-form-item label="周末" label-width="90px">
                                                        <div class="createedititem">
                                                            <div class="item">
                                                                <div class="itemtitle">加价</div>     
                                                                <el-input v-model="scale.weekendAppointPrice" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                            </div>
                                                            <div class="item">
                                                                <div class="itemtitle">加库存</div>     
                                                                <el-input v-model="scale.weekendAppointAmount" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                            </div>
                                                        </div>
                                                    </el-form-item>

                                                    <el-form-item label="假日" label-width="90px">
                                                        <div class="createedititem">
                                                            <div class="item">
                                                                <div class="itemtitle">加价</div>     
                                                                <el-input v-model="scale.holidayAppointPrice" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                            </div>
                                                            <div class="item">
                                                                <div class="itemtitle">加库存</div>     
                                                                <el-input v-model="scale.holidayAppointAmount" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                            </div>
                                                        </div>
                                                    </el-form-item>
                                                </div>
                                                
                                                <div class="scalesave">
                                                    <el-button type="primary" style="margin-right:30px" size="small" @click="handleSaveScale">保存</el-button>
                                                    <el-button size="small" style="margin-right:30px" @click="handleEditScaleCancle">取消</el-button>
                                                </div>
                                            </div>

                                            <new-cal v-if="showCalendar" slot="calendar" :calendar-list="calendarArr" :detail="detailObj" :current-time="currentTime" :time="time"
                                            :btn-visiable="true" @next="handleNext" @prev="handlePrev" @on-calendar-box="handleClick" @on-revise="reviseDetail" :old="oldArr"
                                            ></new-cal>
                                        </div>
                                    </div>
                                    <div v-else></div>
                                </template>
                                <template slot="create">
                                    <div class="createbox">
                                        <el-form-item label="规格名称" label-width="90px">
                                            <el-input v-model="scale.name" placeholder="请输入规格名称" maxlength="16" style="width: 400px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="售卖价格" label-width="90px">
                                            <el-input v-model="scale.price" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="原始价格" label-width="90px">
                                            <el-input v-model="scale.originPrice" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="库存" label-width="90px">
                                            <el-input v-model="scale.amount" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                        </el-form-item>
                                        <div v-if="productform.productType != 'CARD'"> 
                                            <p class="tips">预约</p>
                                            <el-form-item label="日常" label-width="90px">
                                                <div class="createedititem">
                                                    <div class="item">
                                                        <div class="itemtitle">加价</div>     
                                                        <el-input v-model="scale.dailyAppointPrice" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                    </div>
                                                    <div class="item">
                                                        <div class="itemtitle">加库存</div>     
                                                        <el-input v-model="scale.dailyAppointAmount" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                    </div>
                                                </div>
                                            </el-form-item>

                                            <el-form-item label="周末" label-width="90px">
                                                <div class="createedititem">
                                                    <div class="item">
                                                        <div class="itemtitle">加价</div>     
                                                        <el-input v-model="scale.weekendAppointPrice" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                    </div>
                                                    <div class="item">
                                                        <div class="itemtitle">加库存</div>     
                                                        <el-input v-model="scale.weekendAppointAmount" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                    </div>
                                                </div>
                                            </el-form-item>

                                            <el-form-item label="假日" label-width="90px">
                                                <div class="createedititem">
                                                    <div class="item">
                                                        <div class="itemtitle">加价</div>     
                                                        <el-input v-model="scale.holidayAppointPrice" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                    </div>
                                                    <div class="item">
                                                        <div class="itemtitle">加库存</div>     
                                                        <el-input v-model="scale.holidayAppointAmount" type="number" placeholder="请输入规格名称" style="width: 240px"></el-input>
                                                    </div>
                                                </div>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </template>
                            </tap>
                        </el-form-item>


                        <!-- <el-form-item label="卡券有效期">
                            <el-input :disabled="true" :value="relationContent" placeholder="请选择相关联内容" style="width: 400px;">
                                <el-button slot="append" style="background: #fff" @click="handleSelectContent">关联内容</el-button>
                            </el-input>
                            <p class="tips">用户可以通过景点找到您的酒店</p>
                        </el-form-item>
                        <el-form-item label="景区/酒店">
                            <uploadimg :image-url="productform.imgUrl ? productform.imgUrl + '?imageMogr2/thumbnail/!120x120r/gravity/Center/crop/120x120' : ''" 
                            :is-show-file-list="true"
                            @on-success="handleUploadSuccess" 
                            @on-remove="handleUploadRemove"/>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <uploadimg :image-list="productform.imgList" 
                            :is-multiple="true" 
                            :width="800"
                            @on-delete="handleDeleteImg"
                            @on-edit-success="handleEditImg"
                            @on-success="handleUploadMultipleSuccess"/>
                        </el-form-item>
                        <el-form-item label="简介">
                            <el-input v-model="productform.intro" type="textarea" style="width: 500px"></el-input>
                            <p class="tips">限200字以内</p>
                        </el-form-item>
                        <el-form-item label="详细介绍">
                            <imgtext
                                :data-list="productform.details"
                                @on-add-text="handleAddText"
                                @on-add-img="handleAddImg"
                                @on-sort="handleChangeSort"
                                @on-edit="handleEditText"
                                @on-delete-item="handleDeleteItem"
                            ></imgtext>
                        </el-form-item> -->
                    </el-form>
                    <div class="buttonbox">
                        <el-button type="primary" @click="handleUpdataShop">保存</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
 
        <!-- <pickdata 
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
        </el-dialog> -->
    </div>
</template>

<script>
import request from '@/assets/js/request'
import uploadimg from '@/components/uploadimg'
import pickdata  from '@/components/pickdata'
import imgtext  from '@/components/imgtext'
import tap from '@/components/tap'
import calendar from '@/components/calendar'

export default {
    components: {
        uploadimg, pickdata, imgtext, tap
    },
    data () {
        return {
            productform:{
                productType: 'CARD',
                scaleList: [],
            },
            formRules: {
                name: [
                    {required: true, message: '请输入商品名称', trigger: 'blur' },
                    { min: 1, max: 32, message: '长度在 32 个字符以内', trigger: 'blur' }
                ],
                imgUrl: [
                    {required: true, message: '请上传商品主图', trigger: 'change' },
                ],
                productType: [
                    {required: true, message: '请填写规格' },
                ],
            },
            scale: {
                name: '',
                price: '',
                originPrice: '',
                amount: '',
            },
            isEditScale: false,
            currentEditIndex: null,
            isAddScale: false,
            hasEditData: false,

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
            this.productform.id = params.id
            sessionStorage.shopId = params.id
        }

        if(sessionStorage.shopId){
            this.shopId = sessionStorage.shopId
            this.productform.id = sessionStorage.shopId
        }

        // this.loadData()
        this.$store.commit('handleDisplayMenu')
    },
    methods: {
        handleClose(){
            this.$router.history.go(-1)
        },
        handleUploadSuccess(res){
            this.productform.imgUrl = 'http://cdn.genwoshua.com/' + res.key
        },
        handleUploadRemove(res){
            this.productform.imgUrl = ''
        },

        //scale
        handleProductTypeChange(){
            this.scale = []
            this.hasEditData = false
            this.productform.scaleList = []
            this.productform.calendarScale = {}
        },
        handleAddScaleType(cb){
            if(this.hasEditData && this.isEditScale){
                this.$message({type: 'error',message: '请先编辑完规格',showClose: true,})
                cb && cb()
                return
            }
            this.isAddScale = true
        },
        handleAddScale(cb){
            let type = this.productform.productType
            if(!this.scale.name){
                this.$message({type: 'error',message: '请填写规格名称',showClose: true,})
                return
            }   
            if(!this.scale.price){
                this.$message({type: 'error',message: '请填写售卖价格',showClose: true,})
                return
            }   
            if(!this.scale.originPrice){
                this.$message({type: 'error',message: '请填写原始价格',showClose: true,})
                return
            }   
            if(!this.scale.amount){
                this.$message({type: 'error',message: '请填写库存',showClose: true,})
                return
            }   
            if(type == 'CARD' || type == 'APPOINTMENT_CARD'){
                this.productform.scaleList.push({...this.scale})
            }else{
                this.productform.calendarScale = {...this.scale}
            }
            this.scale = {}
            this.isAddScale = false
            this.hasEditData = true
            if(this.productform.productType != 'CARD'){
                cb && cb()
            }
        },
        handleEditScale(index,type){
            if(this.isAddScale){
                this.$message({type: 'error',message: '请先将添加规格完成',showClose: true,})
                return 
            }
            this.isEditScale = true
            this.currentEditIndex = index
            if(type == 'normal'){
                this.scale = {...this.productform.scaleList[index]}
            }
        },
        handleDeleteScale(index){
            this.productform.scaleList.splice(index,1)
            if(!this.productform.scaleList.length){
                this.hasEditData = false
            }
        },
        handleSaveScale(){
            console.log(this.scale)
            this.productform.scaleList[this.currentEditIndex] = {...this.scale}
            console.log(this.productform.scaleList[this.currentEditIndex])
            this.isEditScale = false
            this.currentEditIndex = null
            this.scale = {}
        },
        handleEditScaleCancle(){
            this.isEditScale = false
            this.currentEditIndex = null
            this.isAddScale = false
            this.scale = {}
        },

        handleUploadMultipleSuccess(res){
            this.productform.imgList.push('http://cdn.genwoshua.com/' + res.key)
        },
        handleDeleteImg(index){
            this.productform.imgList.splice(index,1)
        },
        handleEditImg(res,index,cb){
            this.productform.imgList[index] = 'http://cdn.genwoshua.com/' + res.key
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
            this.productform.relateShop = selectObj
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
            this.productform.details.push({type: 'img',content: img})
        },
        handleChangeSort(index,type){
            let arr = [...this.productform.details]
            if(type == 'up'){
                arr[index] = this.productform.details[index-1]
                arr[index-1] = this.productform.details[index]
            }else{
                arr[index] = this.productform.details[index+1]
                arr[index+1] = this.productform.details[index]
            }
            this.productform.details = []
            arr.map(item => {
                this.productform.details.push(item)
            })
        },
        handleEditText(index){
            this.isEdit = true
            this.detailIndex = index
            this.detailDialogVisible = true
            this.detailText = this.productform.details[index].content
        },
        handleDeleteItem(index){
            this.productform.details.splice(index,1)
        },
        handleDialogClose(){
            this.detailDialogVisible = false
        },
        handleAddTextComplete(){
            if(this.isEdit){
                this.productform.details[this.detailIndex].content = this.detailText
            }else{
                this.productform.details.push({
                    type: 'text',
                    content: this.detailText
                })
            }
            this.detailDialogVisible = false
            this.isEdit = false
            this.detailText = ''
        },

        handleUpdataShop(){
            request.post(this, '/admin/shop/update', this.productform).then((res) => {
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
#productcreate{
    background: #f0f0f2;
    min-height: 100vh;
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
        .headertitle{
            height: 100px;
            text-align: center;
            line-height: 100px;
        }
    }
    

    .bigbox{
        width: 1400px;
        min-height: calc(100vh - 150px);
        background: #fff;
        margin: 0 auto;
        box-sizing: border-box;
        padding-bottom: 60px;
        .title{
            padding: 60px 0 40px 80px;
            font-size: 16px;
        }

        .createbox{
            .el-form-item__label{
                text-align: left;
                margin-bottom: 22px;
            }
        }
        .scale{
            color:#606266;
        }
        .scalesave{
            display: flex;
            width: 100%;
            flex-direction: row-reverse;
        }
        .scaleitem{
            display: flex;
        }
        .createedititem{
            display: flex;
            justify-content: space-between;
            .item{
                display: flex;
                .itemtitle{
                    margin-right: 20px;
                }
            }
        }
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
        .scaleitem{
            width: 100px
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
