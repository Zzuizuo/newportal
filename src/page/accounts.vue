<template>
    <div class="account">
        <el-container>
            <el-header>
                <p class="headertitle">账号管理</p>
            </el-header>
            <el-main>
                <p class="tips"><i class="el-icon-warning"></i> 管理员最多添加50人</p>
                <div class="bigbox">
                    <el-card class="box-card addbox" >
                        <div class="addAccount" @click="handleAddAccount">
                            <i class="el-icon-plus"></i>
                            <p>添加账户</p>
                        </div>
                    </el-card>
                    <el-card class="box-card" v-for="item in userList" :key="item.id" >
                        <div class="userInfo" @click="handleEditAccount(item)">
                            <img :src="item.headimgurl ? item.headimgurl : defaultImg" alt="">
                            <p class="username" v-if="item.activeMark">{{item.nickname}}</p>
                            <p class="bindwx" v-else @click.stop="handleBindWx(item.id)">点击绑定微信</p>
                            <p class="text">{{item.authList.length}}项管理权限</p>
                            <p class="time">{{item.createdDate}}</p>
                            <span class="delete" @click.stop="handleDeleteUser(item.id)">删除</span>
                        </div>
                    </el-card>
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
                page: 1,
                pageSize: 50,
            },
            defaultImg: require('../../static/img/defaultheadimg.png')
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
.account{
    .el-header{
        box-sizing: border-box;
        background: #f0f0f2;
    }
    .headertitle{
        height: 60px;
        line-height: 60px;
    }
    .tips{
        color: #909399;
        font-size: 12px;
    }
    .bigbox{
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
    }
    .box-card{
        position: relative;
        width: 200px;
        height: 248px;
        text-align: center;
        color: #909399;
        margin-right: 20px;;
        margin-bottom: 20px;
    }
    .addAccount{
        cursor: pointer;
        width: 200px;
        height: 100px;
        position: absolute;
        top: 140px;
        left: 50%;
        transform: translate(-50%,-50%);
        i{
            margin-bottom: 20px;
            font-size: 20px;
        }
    }
    .userInfo{
        cursor: pointer;
        position: relative;
        text-align: left;
        color: #303133;
        img{
            width: 80px;
            height: 80px;
            border-radius: 100%;
            margin: 20px auto 30px;
        }
        .text{
            margin-top: 12px;
            font-size: 12px;
        }
        .username{
            font-size: 14px;
        }
        .bindwx{
            font-size: 14px;
            color: #00c8fb;
        }
        .time{
            font-size: 12px;
            margin-top: 6px;
        }
        .delete{
            position: absolute;
            right: 0;
            bottom: -2px;
            font-size: 14px;
            color: #00c8fb;
        }
    }
}

</style>
