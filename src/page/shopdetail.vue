<template>
    <div id="shopdetail">
        <el-container>
            <el-header>
                <div class="header">
                    <p class="headertitle">{{shopData.shopType == 'SCENIC' ? '景区详情' : '酒店详情'}}</p>
                    <i class="el-icon-close close" @click="handleClose"></i>
                </div>
              
            </el-header>
            <el-main>
                <div class="bigbox">
                    <p class="number">商家编号：{{shopData.id}}</p>
                    <div class="baseinfo">
                        <div class="title">基本信息</div>
                        <editbox :name="'景区名称'" @on-complate="handleEditName">
                            <template slot="content">
                                <div>{{shopData.name}}</div>
                            </template>
                            <template slot="edit">
                                <el-form-item label="景区名称" label-width="120px">
                                    <el-input v-model="editFrom.name"></el-input>
                                    <p class="tips">限16字以内</p>
                                </el-form-item>
                            </template>
                        </editbox>

                        <editbox :name="'店铺小程序码'" :is-edit="false">
                            <template slot="content">
                                <img class="litemallimg" :src="shopData.liteMallQr" alt="">
                                <p class="tips">tips: 右键图标保存哦！</p>
                            </template>
                        </editbox>

                        <editbox :name="'联系方式'" @on-complate="handleEditContact">
                            <template slot="content">
                                <div>联系人：{{shopData.contact}}</div>
                                <div>联系电话：{{shopData.contactPhone}}</div>
                            </template>
                            <template slot="edit">
                                <el-form-item label="联系人" label-width="120px">
                                    <el-input v-model="editFrom.contact"></el-input>
                                    <p class="tips">建议填写景区联系人</p>
                                </el-form-item>
                                <el-form-item label="联系电话" label-width="120px">
                                    <el-input v-model="editFrom.contactPhone"></el-input>
                                    <p class="tips">固定电话需加区号：区号均用 '—' 连接</p>
                                </el-form-item>
                            </template>
                        </editbox>

                        <editbox :name="'客服电话'" @on-complate="handleEditHotLinePhone">
                            <template slot="content">
                                <div>{{shopData.hotLinePhone}}</div>
                            </template>
                            <template slot="edit">
                                <el-form-item label="客服电话" label-width="120px">
                                    <el-input v-model="editFrom.hotLinePhone"></el-input>
                                </el-form-item>
                            </template>
                        </editbox>

                        <editbox :name="'所在地址'" :width="'60%'" @on-complate="handleEditAddress" @on-edit="handleGetAddress">
                            <template slot="content">
                                <div>{{shopData.address ? shopData.address.province+shopData.address.city+shopData.address.district+shopData.address.address : ''}}</div>
                            </template>

                            <template slot="edit">
                                <el-form-item label="所在地址" label-width="120px">
                                    <div class="areabox">
                                        <el-cascader
                                            size="large"
                                            :options="options"
                                            v-model="selectedOptions"
                                            auto-complete='address-line2'
                                            @change="handleSelectedArea">
                                        </el-cascader>
                                        <el-input v-model="editFrom.address.address"  auto-complete='address-line2' placeholder="详细地址" style="width: 400px;margin: 0 20px"></el-input>
                                        <el-button @click="handleSearchMark">搜索标注</el-button>
                                    </div>
                                    <Map class="map" :id="'detailmap'" :address="mapAddress" 
                                    :change-option="handleMapChange" :width="800" :height="400" 
                                    :lng="editFrom.address ? editFrom.address.lng : 0" :lat="editFrom.address ? editFrom.address.lat : 0"></Map>
                                </el-form-item>
                            </template>
                        </editbox>
                    </div>
                    <div class="manager">
                        <div class="title">管理信息</div>
                        <editbox :name="'管理情况'">
                            <template slot="content">
                                <div>{{shopData.name}}</div>
                            </template>
                            <template slot="edit">
                                <el-form-item label="" label-width="120px">
                                    <el-input></el-input>
                                </el-form-item>
                            </template>
                        </editbox>
                    </div>
                    <div class="detailinfo">
                        <div class="title">详细信息</div>
                        <editbox :name="'商家图片'" @on-complate="handleEditImg">
                            <template slot="content">
                                <div class="shopimg">
                                    <img :src="shopData.imgUrl+ '?imageMogr2/thumbnail/!160x120r/gravity/Center/crop/160x120'" alt="">
                                </div>
                            </template>
                            <template slot="edit">
                                <el-form-item label="" label-width="120px">
                                    <uploadimg :image-url="editFrom.imgUrl ? editFrom.imgUrl + '?imageMogr2/thumbnail/!120x120r/gravity/Center/crop/120x120' : ''" 
                                    :is-show-file-list="true"
                                    @on-success="handleUploadSuccess" 
                                    @on-remove="handleUploadRemove"/>
                                </el-form-item>
                            </template>
                        </editbox>

                        <editbox :name="'所属景点'" v-if="shopData.shopType != 'SCENIC'" @on-complate="handleEditRelateShop">
                            <template slot="content">
                                <div>{{shopData.relateShop ? shopData.relateShop.name : ''}}</div>
                            </template>
                            <template slot="edit">
                                <el-form-item label="所属景点" label-width="120px">
                                    <el-input :disabled="true" :value="relationContent" placeholder="请选择相关联内容" style="width: 400px;">
                                        <el-button slot="append" style="background: #fff" @click="handleSelectContent">关联内容</el-button>
                                    </el-input>
                                    <p class="tips">用户可以通过景点找到您的酒店</p>
                                </el-form-item>
                            </template>
                        </editbox>

                        <editbox :name="'其他图片'" @on-complate="handleEditImglist" @on-edit="handleGetImgList">
                            <template slot="content">
                                <div class="shopimglist">
                                    <img v-for="item in shopData.imgList" :key="item" 
                                    :src="item + '?imageMogr2/thumbnail/!120x120r/gravity/Center/crop/120x120'" alt="">
                                </div>
                            </template>
                            <template slot="edit">
                                <el-form-item label="其他图片" label-width="120px">
                                    <uploadimg :image-list="editFrom.imgList" 
                                    :is-multiple="true" 
                                    :width="800"
                                    @on-delete="handleDeleteImg"
                                    @on-edit-success="handleEditImg"
                                    @on-success="handleUploadMultipleSuccess"/>
                                </el-form-item>
                            </template>
                        </editbox>

                        <editbox :name="'简介'" @on-complate="handleEditIntro">
                            <template slot="content">
                                <div>{{shopData.intro}}</div>
                            </template>
                            <template slot="edit">
                                <el-form-item label="简介" label-width="120px">
                                    <el-input v-model="editFrom.intro" type="textarea" style="width: 500px"></el-input>
                                    <p class="tips">限200字以内</p>
                                </el-form-item>
                            </template>
                        </editbox>

                        <editbox :name="'详细介绍'" @on-complate="handleEditDetails" @on-edit="handleGetDetails">
                            <template slot="content">
                                <imgtext
                                    v-if="shopData.details && shopData.details.length"
                                    :data-list="shopData.details"
                                    :is-show-edit="false"
                                ></imgtext>
                            </template>
                            <template slot="edit">
                                <el-form-item label="详细介绍" label-width="120px">
                                    <imgtext
                                        :data-list="editFrom.details"
                                        @on-add-text="handleAddText"
                                        @on-add-img="handleAddImg"
                                        @on-sort="handleChangeSort"
                                        @on-edit="handleEditText"
                                        @on-delete-item="handleDeleteItem"
                                    ></imgtext>
                                </el-form-item>
                            </template>
                        </editbox>
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
        :before-close="handleClose">
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
import editbox  from '@/components/editbox'
import Map from '@/components/map'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'

export default {
    components: {
        uploadimg, pickdata, imgtext, editbox, Map
    },
    data () {
        return {
            shopData: {

            },
            editFrom: {
                imgList: [],
                details: [],
                address: {

                }
            },

            //map
            options: regionData,
            selectedOptions: [],
            mapAddress: '',


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

        if(params.shopDetailId){
            this.shopId = params.shopDetailId
            sessionStorage.shopDetailId = params.shopDetailId
        }

        if(sessionStorage.shopDetailId){
            this.shopId = sessionStorage.shopDetailId
        }

        this.loadData()
        this.$store.commit('handleDisplayMenu')
    },
    methods: {
        handleClose(){
            this.$router.history.go(-1)
        },
        handleEditName(){
            this.shopUpdata()
        },
        handleEditContact(){
            this.shopUpdata()
        },
        handleEditContact(){
            this.shopUpdata()
        },
        handleEditHotLinePhone(){
            this.shopUpdata()
        },

        handleGetAddress(){
            this.editFrom.address = {...res.data.address}
        },
        handleEditAddress(){
            this.shopUpdata()
        },

        handleEditImg(){
            this.shopUpdata()
        },
        handleEditRelateShop(){
            this.shopUpdata()
        },

        handleGetImgList(){
            this.editFrom.imgList = [...this.shopData.imgList]
        },
        handleEditImglist(){
            this.shopUpdata()
        },

        handleEditIntro(){
            this.shopUpdata()
        },

        handleGetDetails(){
            let details = this.shopData.details ? this.shopData.details : []
            this.editFrom.details = [...this.shopData.details]
        },
        handleEditDetails(){
            this.shopUpdata()
        },

        //img
        handleUploadSuccess(res){
            this.editFrom.imgUrl = 'http://cdn.genwoshua.com/' + res.key
        },
        handleUploadRemove(res){
            this.editFrom.imgUrl = ''
        },
        handleUploadMultipleSuccess(res){
            this.editFrom.imgList.push('http://cdn.genwoshua.com/' + res.key)
        },
        handleDeleteImg(index){
            this.editFrom.imgList.splice(index,1)
        },
        handleEditImg(res,index,cb){
            this.editFrom.imgList[index] = 'http://cdn.genwoshua.com/' + res.key
            cb && cb()
        },

        //map
        handleSelectedArea(){
            this.editFrom.address.province = CodeToText[this.selectedOptions[0]]
            this.editFrom.address.city = CodeToText[this.selectedOptions[1]]
            this.editFrom.address.district = CodeToText[this.selectedOptions[2]]
        },
        handleSearchMark(){
            let province = this.editFrom.address.province
            let city = this.editFrom.address.city
            let district = this.editFrom.address.district
            let address = this.editFrom.address.address
            this.mapAddress = ''
            this.mapAddress = province + city + district + address
        },
        handleMapChange(lng, lat, res){
            let province = res.addressComponent.province
            let city = res.addressComponent.city 
            let district = res.addressComponent.district
            
            if(province == city || !city){
                city = '市辖区'
            }

            let provinceCode = TextToCode[province] && TextToCode[province].code
            let cityCode = TextToCode[province][city] && TextToCode[province][city].code
            let districtCode = TextToCode[province][city][district] && TextToCode[province][city][district].code
            this.editFrom.address = {
                adCode: res.adcode ||  res.addressComponent.adcode,
                lat: lat,
                lng: lng,
                province: province,
                city: city,
                district: district,
                address: res.formattedAddress.split(district)[1],
            }
            this.selectedOptions = [provinceCode,cityCode,districtCode]
        },
        //relateshop
        handleSelectContent(){
            this.dialogVisible = true
            this.onLoadPickData()
        },
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
            this.editFrom.relateShop = selectObj
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
            this.editFrom.details.push({type: 'img',content: img})
        },
        handleChangeSort(index,type){
            let arr = [...this.editFrom.details]
            if(type == 'up'){
                arr[index] = this.editFrom.details[index-1]
                arr[index-1] = this.editFrom.details[index]
            }else{
                arr[index] = this.editFrom.details[index+1]
                arr[index+1] = this.editFrom.details[index]
            }
            this.editFrom.details = []
            arr.map(item => {
                this.editFrom.details.push(item)
            })
        },
        handleEditText(index){
            this.isEdit = true
            this.detailIndex = index
            this.detailDialogVisible = true
            this.detailText = this.editFrom.details[index].content
        },
        handleDeleteItem(index){
            this.editFrom.details.splice(index,1)
        },
        handleDialogClose(){
            this.detailDialogVisible = false
        },
        handleAddTextComplete(){
            if(this.isEdit){
                this.editFrom.details[this.detailIndex].content = this.detailText
            }else{
                this.editFrom.details.push({
                    type: 'text',
                    content: this.detailText
                })
            }
            this.detailDialogVisible = false
            this.isEdit = false
            this.detailText = ''
        },



        shopUpdata(){
            request.post(this, '/admin/shop/update', this.editFrom).then((res) => {
                if(res.code == 1){
                    this.loadData()
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
                    this.editFrom.id = res.data.id
                    this.editFrom.address = res.data.address
                    this.editFrom.imgList = res.data.imgList
                    this.editFrom.details = res.data.details
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
#shopdetail{
    @maincolor: #606266;
    @minorcolor: #909399;
    min-height: 100vh;
    .el-header{
        box-sizing: border-box;
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
        font-size: 14px;
        .title{
            padding: 8px 20px;
            background: #f4f4f4;
        }
        .number{
            padding: 10px 0;
            color: @minorcolor
        }
        .baseinfo{
            border: 1px solid #E4E7ED;
            color: @maincolor;
            .litemallimg{
                width: 80px;
                height: 80px;
            }
        }
        .manager{
            border: 1px solid #E4E7ED;
            color: @maincolor;
            margin-top: 20px;
        }
        .detailinfo{
            border: 1px solid #E4E7ED;
            color: @maincolor;
            margin-top: 20px;
        }
        .areabox{
            display: flex;
            overflow: visible
        }
        .map{
            margin-top: 40px;
        }
        .shopimg{
            width: 160px;
            height: 120px;
        }
        .shopimglist{
            display: flex;
            flex-wrap: wrap;
            img{
                margin: 0 10px 10px 0;
            }
        }
    }
    .el-form-item{
        margin-bottom: 10px;
        display: block;
    }
}

</style>
