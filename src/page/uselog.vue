<template>
    <div id="uselog">
        <el-container>
            <el-header>
                <p class="headertitle">订单列表</p>
            </el-header>
            <el-main>
                <div class="buttonbox">
                    <div class="leftbox">
                        <el-date-picker
                            style="margin-right: 20px"
                            v-model="pickerDate"
                            type="daterange"
                            align="right"
                            unlink-panels
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                        <div class="searchbox">
                            <el-input
                                placeholder="输入关键词搜索"
                                v-model="filter.key"
                                @change="handleSearchOrder"
                                style="width: 300px">
                                <el-button slot="append" icon="el-icon-search" style="background: #00CBFB;color: #fff;border-radius: 0;border: 1px solid #00c8fb" type="primary"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <div class="rightbox">
                        <el-button type="primary" @click="handleExport">导出表格</el-button>
                    </div>
                </div>
                <div>
                    <div class="title">
                        <el-row>
                            <el-col :span="5"><div>所属商家</div></el-col>
                            <el-col :span="7"><div>卡券信息</div></el-col>
                            <el-col :span="6"><div>买家信息</div></el-col>
                            <el-col :span="6"><div>核销人/核销时间</div></el-col>
                        </el-row>
                    </div>
                    <div>
                        <div v-for="item in tableData" :key="item.id" class="orderitem">
                            <div class="itemtop">
                                <div style="width: 400px">订单编号：{{item.orderCode}}</div>
                                <div>提交时间：{{item.orderCreateTime}}</div>
                            </div>
                            <div class="itembottom">
                                <el-row>
                                    <el-col :span="5">
                                        <div class="shopinfol">
                                            <p>{{item.shopName}}</p>
                                            <p>{{item.shopTelNum}}</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="7">
                                        <div class="productinfo">
                                            <img :src="item.productImgUrl + '?imageMogr2/thumbnail/!80x60r/gravity/Center/crop/80x60'" alt="">
                                            <div>
                                                <p class="producttitle omit">{{item.orderTitle}}</p>
                                                <p class="scale omit">{{item.scale.name +'：'+ item.scale.unitPrice}}</p>
                                                <span class="buyamount">×{{item.scale.amount}}</span>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="userinfo">
                                            <img :src="item.user.headimgurl + '?imageMogr2/thumbnail/!80x60r/gravity/Center/crop/80x60'" alt="">
                                            <div>
                                                <p class="username omit">{{item.user.nickname}}</p>
                                                <p class="userphone omit">{{item.userTel}}</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div class="userinfo">
                                            <img :src="item.checkUser.headimgurl + '?imageMogr2/thumbnail/!80x60r/gravity/Center/crop/80x60'" alt="">
                                            <div>
                                                <p class="username omit">{{item.checkUser.nickname}}</p>
                                                <p class="time">{{item.createDate}}</p>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>


                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handlePageChange"
                    :current-page="filter.page"
                    :page-sizes="[6, 10, 20]"
                    :page-size="6"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalEl">
                    </el-pagination>
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
            filter: {
                key: '',
                page: 1,
                pageSize: 6,
                createFromDate: '',
                createToDate: '',
            },
            tableLoading: false,
            tableData: [],
            totalEl: 0,

            pickerDate: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
            },
        }
    },
    computed:{

    },
    watch: {
        pickerDate(val){
            this.filter.createFromDate = val[0]
            this.filter.createToDate = val[1]
        }
    },
    created(){
        this.$store.commit('handleShowMenu')
        this.loadData()
    },
    methods: {
        handleExport(){

        },
        handleSearchOrder(val){
            this.filter.key = val
            this.filter.page = 1
            this.loadData()
        },
        loadData(){
            request.post(this, '/admin/card/uselog/webQuery', this.filter).then((res) => {
                if(res.code == 1){
                    this.tableData = res.data.content
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
        handlePageChange(val){
            this.filter.page = val
            this.loadData()
        },
        handleSizeChange(val){
            this.filter.pageSize = val
            this.loadData()
        },
    }
}
</script>
<style lang="less">
@colorBlue: #00c8fb;
@border: 1px solid #E4E7ED;
#uselog{
    .el-header{
        box-sizing: border-box;
        background: #f0f0f2;
    }
    .headertitle{
        height: 60px;
        line-height: 60px;
    }
    .buttonbox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        .leftbox{
            display: flex;
        }
        .rightbox{
            display: flex;
        }
    }
    .searchbox{
        display: flex;
    }
    .link{
        color: @colorBlue;
        text-decoration: none;
        cursor: pointer;
    }
    .link:hover{
        text-decoration: underline;
    }
    .title{
        font-size: 14px;
        color: #909399;
        margin-top: 20px;
        padding: 5px 0;
        div{
            padding: 0 5px;
        }
    }
    .orderitem{
        border: @border;
        margin-bottom: 20px;
        color: #606266;
        font-size: 15px;
        .itemtop{
            padding: 10px 10px;
            display: flex;
            background: #f4f4f4;
        }
        .itembottom{
            font-size: 14px;
            .shopinfol{
                padding: 20px;
                box-sizing: border-box;
                border-right: @border;
                line-height: 30px;
            }
            .productinfo{
                display: flex;
                padding: 20px;
                border-right: @border;
                img{
                    width: 80px;
                    height: 60px;
                    margin-right: 10px;
                }
                div{
                    width: 100%;
                    position: relative;
                    .producttitle{
                        position: absolute;
                        top: 2px;
                        left: 0;
                        right: 0;
                    }
                    .scale{
                        position: absolute;
                        bottom: 2px;
                        left: 0;
                        right: 20px;
                    }
                    .buyamount{
                        position: absolute;
                        right: 0;
                        bottom: 2px;
                    }
                }
            }
            .userinfo{
                padding: 20px;
                display: flex;
                font-size: 14px;
                border-right: @border;
                img{
                    width: 60px;
                    height: 60px;
                    border-radius: 100%;
                    margin-right: 10px;
                }
                div{
                    width: 100%;
                    position: relative;
                    line-height: 30px;
                }
                .time{
                    color: #909399;
                    font-size: 13px;
                }
            }
            .totalPrice{
                height: 100px;
                padding: 20px;
                font-size: 14px;
                border-right: @border;
                line-height: 30px;
            }
            .status{
                padding: 20px;
                line-height: 30px;
                font-size: 14px;
                text-align: center;
            }
        }

    }
    .el-date-editor .el-range-separator{
        padding: 0;
    }
    .el-pagination{
        text-align: right;
    }
}

</style>
