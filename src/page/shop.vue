<template>
    <div class="shop">
        <el-container>
            <el-header>
                <p class="headertitle">景区/酒店</p>
            </el-header>
            <el-main>
                <div class="buttonbox">
                    <el-input
                        placeholder="输入关键词搜索"
                        v-model="filter.key"
                        style="width: 200px">
                        <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <el-button type="primary">创建</el-button>
                </div>
                <div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="date" label="编号" width="180"></el-table-column>
                        <el-table-column prop="date" label="景区" width="180"></el-table-column>
                        <el-table-column prop="date" label="商品数量" width="180"></el-table-column>
                        <el-table-column prop="date" label="类型" width="180"></el-table-column>
                        <el-table-column prop="date" label="联系人" width="180"></el-table-column>
                        <el-table-column prop="date" label="联系电话" width="180"></el-table-column>
                        <el-table-column prop="date" label="操作" width="180"></el-table-column>
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
            userList: [],
            filter: {
                key: '',
                page: 1,
                pageSize: 50,
            },
        }
    },
    computed:{

    },
    watch: {
        
    },
    created(){
        this.$store.commit('handleUnbindWx')
        this.$store.commit('handleShowMenu')
        this.loadAccountsData()
    },
    methods: {
        handleAddAccount(){
            this.$router.push({name: 'account/detail',params: {type: 'create'}})
        },
        handleEditAccount(item){
            if(item.activeMark){
                this.$router.push({name: 'account/detail',params: {type: 'edit',userId: item.id}})
            }else{
                return
            }
        },
        handleBindWx(id){
            this.$store.commit('handleBindWx')
            this.$store.commit('handleGetUserId',id)
            this.$router.push({name: 'scan'})
        },
        handleDeleteUser(id){
            request.get(this, '/admin/user/del/'+ id).then((res) => {
                if(res.code == 1){
                    this.loadAccountsData()
                }else{
                    this.$message({
                        type: 'error',
                        message: res.msg.message ? res.msg.message : res.msg,
                        showClose: true,
                    })
                }
            })
        },
        loadAccountsData(){
            request.post(this, '/admin/user/webQuery',this.filter).then((res) => {
                if(res.code == 1){
                    this.userList = res.data.content
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
}

</style>
