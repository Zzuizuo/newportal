<template>
    <div>
        <el-row class="tac">
            <el-col :span="4" class="menu">
                <div class="admin">
                    <p>成都人在旅途智慧旅游</p>
                    <img class="userimg" :src="userData.headimgurl" alt="">
                    <div class="username">
                        <span>{{userData.nickname}}</span>
                        <i @click="handleLogout" class="iconfont icon-tuichu"></i>
                    </div>
                </div>
                <el-menu
                    :default-active="menuActive"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    @select="handleSelect"
                    background-color="#f2f2f2"
                    text-color="#485f6a"
                    active-text-color="#00c8fb"
                    :router="true">
                        <el-menu-item index="/admin/accounts">
                            <i class="el-icon-menu"></i>
                            <span slot="title">账号管理</span>
                        </el-menu-item>

                        <el-menu-item index="/admin/shop">
                            <i class="el-icon-printer"></i>
                            <span slot="title">景区/酒店</span>
                        </el-menu-item>

                        <el-menu-item index="/admin/products">
                            <i class="el-icon-goods"></i>
                            <span slot="title">商品管理</span>
                        </el-menu-item>

                        <el-menu-item index="5">
                            <i class="el-icon-document"></i>
                            <span slot="title">首页推荐</span>
                        </el-menu-item>

                        <el-menu-item index="6">
                            <i class="el-icon-tickets"></i>
                            <span slot="title">订单管理</span>
                        </el-menu-item>

                        <el-menu-item index="7">
                            <i class="el-icon-news"></i>
                            <span slot="title">核销记录</span>
                        </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" style="background: #fff;min-height: 100vh">
                <Entrance/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Entrance from '@/components/entrance'
import request from '@/assets/js/request'

export default {
    name: 'HelloWorld',
    components: {
        Entrance
    },
    data () {
        return {
            menuActive: null,
            userData: null,
            name: 'toothless',
        }
    },
    computed:{

    },
    watch: {
        
    },
    created(){
        //active
        if(sessionStorage.menuActive){
            this.menuActive = sessionStorage.menuActive 
        }else{
            this.menuActive = this.$router.history.current.path
        }

        //scan
        if(sessionStorage.user){
            this.userData = JSON.parse(sessionStorage.user)
        }else{
            this.$router.push({name: 'scan'})
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleSelect(key, keyPath){
            this.menuActive = key
            sessionStorage.menuActive = key
        },
        handleLogout(){
            request.get(this, '/logout').then((res) => {
                if(res.code == 1){
                    this.$store.commit('handleDisplayMenu')
                    this.$router.push({name: 'scan'})
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.tac{
    min-height: 100vh;
    background: #f0f0f2;
}
.menu{
    // min-width: 200px;
    min-height: 100vh;
}
.admin{
    text-align: center;
    padding: 30px 0;
    .userimg{
        width: 76px;
        height: 76px;
        border-radius: 100%;
        margin: 20px auto;
    }
    .username{
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-tuichu{
            width: 20px;
            margin-left: 20px;
            color: #00c8fb;
        }
    }
}
</style>
