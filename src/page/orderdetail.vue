<template>
    <div id="orderdetail">
        <el-container>
            <el-header>
                <div class="header">
                    <p class="headertitle">订单详情</p>
                    <i class="el-icon-close close" @click="handleClose"></i>
                </div>
            </el-header>
            <el-main>
                <div class="bigbox">
                    <div class="number">
                        <p style="margin-right: 50px">订单编号：{{orderData.code}}</p>
                        <p>订单状态：{{orderData.statusDesc}}</p>
                    </div>
                    <div class="steps">
                        <el-steps :space="300" :active="activeNum" finish-status="success" :align-center="true">
                            <el-step title="提交订单" :description="orderData.createDate"></el-step>
                            <el-step title="支付订单" :description="orderData.paidTime"></el-step>
                            <el-step title="预约时间" v-if="orderData.needAppointMark == 'Y'" :description="orderData.appointTime"></el-step>
                            <el-step title="订单核销" :description="orderData.useTime"></el-step>
                        </el-steps>
                    </div>
                    
                    <div class="baseinfo">
                        <div class="title">买家信息</div>
                        <editbox :name="'买家'" :is-edit="false">
                            <template slot="content">
                                <div class="userinfo" v-if="orderData.user">
                                    <img :src="orderData.user.headimgurl" alt="">
                                    <span>{{orderData.user.nickname}}</span>
                                </div>
                            </template>
                        </editbox>
                        <editbox :name="'联系电话'" :is-edit="false">
                            <template slot="content">
                                <div>{{orderData.userTel}}</div>
                            </template>
                        </editbox>

                        <div class="title">商品信息</div>
                        <editbox :name="'商品信息'" :is-edit="false">
                            <template slot="content">
                                <div class="shopinfor" v-if="orderData.scale">
                                    <img :src="orderData.imgurl + '?imageMogr2/thumbnail/!80x60r/gravity/Center/crop/80x60'" alt="">
                                    <div>
                                        <p class="producttitle omit">{{orderData.title}}</p>
                                        <p class="scale omit">{{orderData.scale.name +'：'+ orderData.scale.unitPrice}}</p>
                                        <span class="buyamount">×{{orderData.scale.amount}}</span>
                                    </div>
                                </div>
                            </template>
                        </editbox>
                        <editbox :name="'合计'" :is-edit="false">
                            <template slot="content">
                                <p>￥{{orderData.scale ? orderData.scale.totalPrice : ''}}</p>
                            </template>
                        </editbox>
                        <editbox :name="'实付款'" :is-edit="false">
                            <template slot="content">
                                <p>￥{{orderData.totalPrice}}</p>
                            </template>
                        </editbox>
                        <editbox :name="'景区/酒店'" :is-edit="false">
                            <template slot="content">
                                <p>{{orderData.shop ? orderData.shop.name : ''}}</p>
                            </template>
                        </editbox>
                        <editbox :name="'佣金'" :is-edit="false">
                            <template slot="content">
                                <p></p>
                            </template>
                        </editbox>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import request from '@/assets/js/request'
import editbox  from '@/components/editbox'

export default {
    components: {
        editbox
    },
    data () {
        return {
            orderId: '',
            orderData: {},
            activeNum: 0,
        }
    },
    computed:{

    },
    watch: {
        
    },
    created(){
        let params = this.$router.currentRoute.params

        if(params.orderDetailId){
            this.orderId = params.orderDetailId
            sessionStorage.orderDetailId = params.orderDetailId
        }

        if(sessionStorage.orderDetailId){
            this.orderId = sessionStorage.orderDetailId
        }

        this.loadData()
        this.$store.commit('handleDisplayMenu')
    },
    methods: {
        handleClose(){
            this.$router.history.go(-1)
        },
        loadData(){
            request.get(this, '/admin/order/' + this.orderId).then((res) => {
                if(res.code == 1){
                    let data = res.data
                    this.orderData = data
                    if(data.createDate){
                        this.activeNum = 1
                    }
                    if(data.paidTime){
                        this.activeNum = 2
                    }
                    if(data.needAppointMark == 'Y'){
                        if(data.appointTime){
                            this.activeNum = 3
                        }
                        if(data.useTime){
                            this.activeNum = 4
                        }
                    }else{
                        if(data.useTime){
                            this.activeNum = 3
                        }
                    }
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
#orderdetail{
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
            display: flex;
            padding: 10px 0;
            color: @minorcolor
        }
        .steps{
            margin-top: 30px;
        }
        .baseinfo{
            margin-top: 40px;
            border: 1px solid #E4E7ED;
            color: @maincolor;
            .userinfo{
                display: flex;
                line-height: 60px;
                img{
                    width: 60px;
                    height: 60px;
                    border-radius: 100%;
                    margin-right: 20px;
                }
            }
        }
        .shopinfor{
                    display: flex;
                    line-height: 30px;
                    img{
                        width: 80px;
                        height: 60px;
                        margin-right: 10px;
                    }
                    div{
                        width: 400px;
                        position: relative;
                        .producttitle{
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                        }
                        .scale{
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                        }
                        .buyamount{
                            position: absolute;
                            right: 0;
                            bottom: 0;
                        }
                    }
                }
    }
    .el-steps{
        display: flex;
        justify-content: center;
    }
    .el-form-item{
        margin-bottom: 10px;
        display: block;
    }
}

</style>
