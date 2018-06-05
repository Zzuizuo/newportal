<template>
    <div id="orders">
        <el-container>
            <el-header>
                <p class="headertitle">订单列表</p>
            </el-header>
            <el-main>
                <div class="buttonbox">
                    <div class="leftbox">
                        <el-select v-model="filter.status" placeholder="请选择" style="margin-right: 20px;width: 120px">
                            <el-option
                            v-for="item in statusOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
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
                        <el-button type="primary" @click="handlePutout">导出表格</el-button>
                    </div>
                </div>
                <div>
                    <div class="title">
                        <el-row>
                            <el-col :span="12"><div>订单信息</div></el-col>
                            <el-col :span="4"><div>买家信息</div></el-col>
                            <el-col :span="4"><div>实收款</div></el-col>
                            <el-col :span="4"><div>状态</div></el-col>
                        </el-row>
                    </div>
                    <div>
                        <div v-for="item in tableData" :key="item.id" class="orderitem">
                            <div class="itemtop">
                                <div style="width: 400px">订单编号：{{item.code}}</div>
                                <div>提交时间：{{item.createDate}}</div>
                            </div>
                            <div class="itembottom">
                                <el-row>
                                    <el-col :span="12" class="shopinfo">
                                        <div class="shopinfol">
                                            <p>{{item.shop.name}}</p>
                                            <p>{{item.shop.contactPhone}}</p>
                                        </div>
                                        <div class="shopinfor">
                                            <img :src="item.imgurl + '?imageMogr2/thumbnail/!80x60r/gravity/Center/crop/80x60'" alt="">
                                            <div>
                                                <p class="producttitle omit">{{item.title}}</p>
                                                <p class="scale omit">{{item.scale.name +'：'+ item.scale.unitPrice}}</p>
                                                <span class="buyamount">×{{item.scale.amount}}</span>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="userinfo">
                                            <img :src="item.user.headimgurl + '?imageMogr2/thumbnail/!80x60r/gravity/Center/crop/80x60'" alt="">
                                            <div>
                                                <p class="username omit">{{item.user.nickname}}</p>
                                                <p class="userphone omit">{{item.userTel}}</p>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="totalPrice">
                                            <p>实付款：￥{{item.totalPrice}}</p>
                                            <!-- <p></p> todo 耍客-->
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="status">
                                            <p>{{item.statusDesc}}</p>
                                            <a href="javascript:;" class="link" @click="handleToDetail(item.id)">详情</a>
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
                status: null,
                createFromDate: '',
                createToDate: '',
            },
            pickerDate: '',
            statusOption: [
                {label: '全部',value: null},
                {label: '待付款',value: 'TO_PAY'},
                {label: '已付款',value: 'PAID'},
                {label: '待评论',value: 'TO_COMMENT'},
                {label: '已评价',value: 'COMMENTED'},
                {label: '已关闭',value: 'CLOSE'},
            ],

            tableLoading: false,
            activeName: 'ONLINE',
            
            multipleSelection: [],
            tableData: [],
            totalEl: 0,


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
        handlePutout(){

        },
        handleSearchOrder(val){
            this.filter.key = val
            this.filter.page = 1
            this.loadData()
        },
        handleToDetail(id){
            this.$router.push({name: 'order/detail',params: {orderDetailId: id}})
        },
        loadData(){
            request.post(this, '/admin/order/webQuery', this.filter).then((res) => {
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
#orders{
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
            .shopinfo{
                display: flex;
                font-size: 14px;
                .shopinfol{
                    flex: 3;
                    width: 200px;
                    padding: 20px;
                    box-sizing: border-box;
                    border-right: @border;
                    line-height: 20px;
                }
                .shopinfor{
                    flex: 5;
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
