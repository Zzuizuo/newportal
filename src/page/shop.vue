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
                            v-model="filterKey"
                            style="width: 240px">
                            <el-button icon="el-icon-search" style="background: #00CBFB;color: #fff;border-radius: 0" type="primary"></el-button>
                        </el-input>
                        
                    </div>
                    <el-button type="primary" @click="handleCreateShop">创建</el-button>
                </div>
                <div>
                    <el-table :data="tableData" v-loading="tableLoading" style="width: 100%" :header-cell-style="{background: '#DDE6EB'}">
                        <el-table-column prop="id" label="编号" ></el-table-column>
                        <el-table-column prop="id" label="景区" ></el-table-column>
                        <el-table-column prop="id" label="商品数量" ></el-table-column>
                        <el-table-column prop="id" label="类型" ></el-table-column>
                        <el-table-column prop="id" label="联系人" ></el-table-column>
                        <el-table-column prop="id" label="联系电话" ></el-table-column>
                        <el-table-column label="操作" >
                            <template slot-scope="scope">
                                <a href="javascript:;" @click="handleMerchantEdit(scope)" class="link">详情</a>
                                <a href="javascript:;" @click="handleMerchantEdit(scope)" class="link">相关商品</a>
                            </template>
                        </el-table-column>
                    </el-table>
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
                pageSize: 50,
            },
            tableData: [{
                id: 0,
            }]
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
        loadData(){
            
        }
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
        padding: 7.5px 20px;
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
}

</style>
