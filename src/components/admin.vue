<template>
    <div>
        <el-row class="tac">
            <el-col :span="3">
                <h5>mine portal</h5>
                <el-menu
                    :default-active="menuActive"
                    class="el-menu-vertical-demo menuList"
                    @open="handleOpen"
                    @close="handleClose"
                    @select="handleSelect"
                    background-color="#fff"
                    text-color="#485f6a"
                    active-text-color="#00c8fb"
                    :router="true">
                        <el-menu-item index="1">
                            <i class="el-icon-document"></i>
                            <span slot="title">账号管理</span>
                        </el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>内容管理</span>
                            </template>
                        </el-submenu>
                        <el-submenu index="/admin/board">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>app管理</span>
                            </template>
                        </el-submenu>
                        <el-menu-item index="/admin/board">
                            <i class="el-icon-menu"></i>
                            <span slot="title">营销管理</span>
                        </el-menu-item>
                        <el-menu-item index="5" disabled>
                            <i class="el-icon-document"></i>
                            <span slot="title">交易管理</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <i class="el-icon-setting"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="7">
                            <i class="el-icon-setting"></i>
                            <span slot="title">设置</span>
                        </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="21">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>商品</el-breadcrumb-item>
                    <el-breadcrumb-item>详情</el-breadcrumb-item>
                </el-breadcrumb>
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
<style scoped>
.menuList{
    min-width: 200px;
}
</style>
