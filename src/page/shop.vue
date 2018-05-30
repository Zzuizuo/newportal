<template>
    <div class="shop">
        <el-container>
            <el-header>
                <p class="headertitle">景区/酒店</p>
            </el-header>
            <el-main>
                <div class="buttonbox">
                    <div class="searchbox">
                        <el-input
                            placeholder="输入关键词搜索"
                            v-model="filter.key"
                            style="width: 300px">
                            <el-button slot="append" icon="el-icon-search" style="background: #00CBFB;color: #fff;border-radius: 0;border: 1px solid #00c8fb" type="primary"></el-button>
                        </el-input>
                        
                    </div>
                    <el-button type="primary" @click="handleCreateShop">创建</el-button>
                </div>
                <div>
                    <el-table :data="tableData" v-loading="tableLoading" style="width: 100%" :header-cell-style="{background: '#DDE6EB'}">
                        <el-table-column prop="id" label="编号" width="60"></el-table-column>
                        <el-table-column label="景区" >
                            <template slot-scope="scope">
                                <div class="areabox">
                                    <img :src="scope.row.imgUrl + + '?imageMogr2/thumbnail/!90x70r/gravity/Center/crop/90x70'" alt="">
                                    <div>{{scope.row.name}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="id" label="商品数量" ></el-table-column>
                        <el-table-column label="类型" >
                            <template slot-scope="scope">
                                {{scope.row.shopType == 'SCENIC' ? '景区' : '酒店'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="contact" label="联系人"></el-table-column>
                        <el-table-column prop="contactPhone" label="联系电话" ></el-table-column>
                        <el-table-column label="操作" >
                            <template slot-scope="scope">
                                <a href="javascript:;" @click="handleToDetail(scope.row.id)" class="link">详情</a>
                                <a href="javascript:;" @click="handleContcatProduct(scope.row.id)" class="link">相关商品</a>
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
            userList: [],
            filter: {
                key: '',
                page: 1,
                pageSize: 10,
            },
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
        handleCreateShop(){
            this.$router.push({name: 'shop/create'})
        },
        handleToDetail(id){
            this.$router.push({name: 'shop/detail',params: {shopDetailId: id}})
        },
        handleContcatProduct(index){

        },
        loadData(){
            request.post(this, '/admin/shop/webQuery', this.filter).then((res) => {
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
.shop{
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

    .el-pagination{
        text-align: right;
    }
}

</style>
