<template>
    <div class="accountdetail">
        <el-container>
            <el-header>
                <div class="header">
                    <p class="headertitle">创建景区/酒店</p>
                    <i class="el-icon-close close" @click="handleClose"></i>
                </div>
            </el-header>
            <el-main>
                <div class="bigbox">
                    <el-form ref="shopform" :model="shopform" label-width="180px" :rules="formRules">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="shopform.name" placeholder="请输入名称" style="width: 240px"></el-input>
                            <p class="tips">限16字以内</p>
                        </el-form-item>
                        
                        <el-form-item label="类别" prop="shopType">
                            <el-radio-group v-model="shopform.shopType">
                                <el-radio label="SCENIC">景区</el-radio>
                                <el-radio label="HOTEL">酒店</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="联系人" prop="contact">
                            <el-input v-model="shopform.contact" placeholder="请输入联系人" style="width: 240px"></el-input>
                            <p class="tips">建议填写景区联系人</p>
                        </el-form-item>
                        <el-form-item label="联系人电话" prop="contactPhone">
                            <el-input v-model="shopform.contactPhone" type="number" auto-complete='tel' placeholder="请输入联系人电话" style="width: 240px"></el-input>
                            <p class="tips">固定电话需加区号：区号均用 '—' 连接</p>
                        </el-form-item>
                        <el-form-item label="客服电话" prop="hotLinePhone">
                            <el-input v-model="shopform.hotLinePhone" type="number" auto-complete='tel' placeholder="请输入客服电话" style="width: 240px"></el-input>
                            <p class="tips">用户咨询时会用的电话号码</p>
                        </el-form-item>
                        <el-form-item label="地址" prop="selectedOptions">
                            <div class="areabox">
                                <el-cascader
                                    size="large"
                                    :options="options"
                                    v-model="shopform.selectedOptions"
                                    auto-complete='address-line2'
                                    @change="handleSelectedArea">
                                </el-cascader>
                                <el-input v-model="shopform.address.address"  auto-complete='address-line2' placeholder="详细地址" style="width: 400px;margin: 0 20px"></el-input>
                                <el-button @click="handleSearchMark">搜索标注</el-button>
                            </div>
                            <Map class="map" :id="'createmap'" :address="mapAddress" :change-option="handleMapChange" :width="800" :height="400" :lng="shopform.address.lng" :lat="shopform.address.lat"></Map>
                        </el-form-item>
                    </el-form>
                    <div class="buttonbox">
                        <el-button type="primary" @click="handleCreateShop">立即创建</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import request from '@/assets/js/request'
import Map from '@/components/map'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'


export default {
    components: {
        Map
    },
    data () {
        return {
            shopform:{
                name: '',
                shopType: 'SCENIC',
                contact: '',
                contactPhone: '',
                hotLinePhone: '',
                address: {
                    adCode: '',
                    lat: 0,
                    lng: 0,
                    province: '',
                    city: '',
                    district: '',
                    address: '',
                },

                //fake
                selectedOptions: [],
            },
            formRules: {
                name: [
                    {required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                shopType: [{ required: true, message: '请选择类别联系人', trigger: 'blur' }],
                contact: [{ required: true, message: '请填写联系人', trigger: 'blur' }],
                contactPhone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }],
                hotLinePhone: [{ required: true, message: '请填写客服电话', trigger: 'blur' }],
                selectedOptions: [{ type: 'array', required: true, message: '请选择地址', trigger: 'change' }],
            },

            options: regionData,
            mapAddress: '',
        }
    },
    computed:{

    },
    watch: {
        
    },
    created(){
        this.$store.commit('handleDisplayMenu')
    },
    methods: {
        handleClose(){
            this.$router.history.go(-1)
        },
        handleSelectedArea(){
            this.shopform.address.province = CodeToText[this.shopform.selectedOptions[0]]
            this.shopform.address.city = CodeToText[this.shopform.selectedOptions[1]]
            this.shopform.address.district = CodeToText[this.shopform.selectedOptions[2]]
        },
        handleSearchMark(){
            let province = this.shopform.address.province
            let city = this.shopform.address.city
            let district = this.shopform.address.district
            let address = this.shopform.address.address
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
            this.shopform.address = {
                adCode: res.adcode ||  res.addressComponent.adcode,
                lat: lat,
                lng: lng,
                province: province,
                city: city,
                district: district,
                address: res.formattedAddress.split(district)[1],
            }

            this.shopform.selectedOptions = [provinceCode,cityCode,districtCode]
        },
        handleCreateShop(){
            let isNoNull = true
            for(let i in this.shopform){
                if(!this.shopform[i]){
                    isNoNull = false
                }
            }
            if(!isNoNull){
                this.$message({
                    type: 'error',
                    message: '请填写完整',
                    showClose: true,
                })
                return
            }
            request.post(this, '/admin/shop', this.shopform).then((res) => {
                if(res.code == 1){
                    this.$message({
                        type: 'success',
                        message: '创建成功',
                        showClose: true,
                    })
                    this.$router.replace({name: 'shop/advance',params: {id: res.data.id}})
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
        padding-bottom: 60px;
    }
    .areabox{
        display: flex;
        overflow: visible
    }
    .map{
        margin-top: 40px;
    }
    .buttonbox{
        display: flex;
        justify-content: center;
        margin-top: 60px;
    }
}
</style>
