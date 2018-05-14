<template>
    <div>
        <el-row class="tac">
            <el-col :span="3" class="menu">
                <div class="admin">
                    <p>成都人在旅途智慧旅游</p>
                    <img src="" alt="">
                    <p>{{name}}</p>
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

                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-printer"></i>
                                <span>内容管理</span>
                            </template>
                        </el-submenu>

                        <el-submenu index="/admin/board">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>景区/酒店</span>
                            </template>
                        </el-submenu>

                        <el-menu-item index="/admin/board">
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
            <el-col :span="21">
                <Entrance/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Entrance from '@/components/entrance'
export default {
    name: 'HelloWorld',
    components: {
        Entrance
    },
    data () {
        return {
            menuActive: null,

            name: 'toothless'
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.menu{
    min-width: 200px;
    min-height: 100vh;
    background: #f0f0f2;
}
.admin{
    text-align: center;
    padding: 30px 0;
    img{
        width: 76px;
        height: 76px;
        border-radius: 100%;
    }
}
</style>
