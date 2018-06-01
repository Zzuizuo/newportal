<template>
    <div id="products">
        <el-container>
            <el-header>
                <p class="headertitle">商品列表</p>
            </el-header>
            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleTabClick">
                    <el-tab-pane label="上架商品" name="ONLINE"></el-tab-pane>
                    <el-tab-pane label="下架商品" name="OFFLINE"></el-tab-pane>
                </el-tabs>
                <div class="buttonbox">
                    <div class="leftbox">
                        <el-select v-model="filter.sortBy" placeholder="请选择" @change="handleGetValue" class="margin_r">
                            <el-option
                            v-for="item in sortOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <div class="searchbox">
                            <el-input
                                placeholder="输入关键词搜索"
                                v-model="filter.key"
                                style="width: 300px">
                                <el-button slot="append" icon="el-icon-search" style="background: #00CBFB;color: #fff;border-radius: 0;border: 1px solid #00c8fb" type="primary"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <div class="rightbox">
                        <el-button type="primary" :disabled="!multipleSelection.length ? true : false" @click="handledeleteProductList">删除</el-button>
                        <el-button type="primary" :disabled="!multipleSelection.length ? true : false" @click="handleOfflineProductList">下架</el-button>
                        <el-button type="primary" @click="handleCreateProduct">创建</el-button>
                    </div>
                </div>
                <div>
                    <el-table :data="tableData" v-loading="tableLoading" style="width: 100%" :header-cell-style="{background: '#DDE6EB'}" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="id" label="编号" width="60"></el-table-column>
                        <el-table-column label="商品" >
                            <template slot-scope="scope">
                                <div class="areabox">
                                    <img :src="scope.row.imgUrl + '?imageMogr2/thumbnail/!90x70r/gravity/Center/crop/90x70'" alt="">
                                    <div>{{scope.row.name}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="priceDesc" label="价格" ></el-table-column>
                        <el-table-column label="所属景区">
                            <template slot-scope="scope">
                                {{scope.row.shop ? scope.row.shop.name : ''}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="contact" label="总销量"></el-table-column>
                        <el-table-column prop="contactPhone" label="库存" ></el-table-column>
                        <el-table-column prop="sortIndex" label="推荐值" ></el-table-column>
                        <el-table-column prop="contactPhone" label="评分" >
                            <template slot-scope="scope">
                                {{scope.row.scoreCommentList.length}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="createDate" label="创建时间" ></el-table-column>
                        <el-table-column label="操作" >
                            <template slot-scope="scope">
                                <a href="javascript:;" @click="handleToDetail(scope.row.id)" class="link">详情</a>
                                <a href="javascript:;" @click="handleOfflineProduct(scope.row.id)" class="link">下架</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        layout="prev, pager, next"
                        @current-change="handlePageChange"
                        @size-change="handleSizeChange"
                        :current-page="filter.page"
                        :page-sizes="[10, 15, 20, 30]"
                        :page-size="10"
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
            tableLoading: false,
            activeName: 'ONLINE',
            filter: {
                key: '',
                page: 1,
                pageSize: 10,
                productStatus: 'ONLINE',
                sortBy: 'createDate'
            },
            sortOptions: [
                {label: '按推荐值排序',value: 'sortindex'},
                {label: '按时间排序',value: 'createDate'},
            ],
            multipleSelection: [],
            tableData: [],
            totalEl: 0,
        }
    },
    computed:{

    },
    watch: {
        
    },
    created(){
        this.$store.commit('handleShowMenu')
        this.loadData()
    },
    methods: {
        handleTabClick(tab){
            this.filter.page = 1
            this.filter.productStatus = tab.name
            this.loadData()
        },
        handleGetValue(val){
            this.loadData()
        },

        handledeleteProductList(){

        },
        handleOfflineProductList(){

        },
        handleCreateProduct(){
            this.$router.push({name: 'product/create'})
        },

        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        handleToDetail(id){
            this.$router.push({name: 'shop/detail',params: {shopDetailId: id}})
        },
        handleOfflineProduct(id){

        },
        loadData(){
            request.post(this, '/admin/product/webQuery', this.filter).then((res) => {
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
#products{
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
        margin-right: 10px;
        cursor: pointer;
    }
    .link:hover{
        text-decoration: underline;
    }

    .areabox{
        display: flex;
        align-items: center;
        img{
            width: 90px;
            height: 70px;
            margin-right: 10px;
        }
        div{
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }

    .margin_r{
        margin-right: 20px;
    }

    .el-pagination{
        text-align: right;
    }
}

</style>
