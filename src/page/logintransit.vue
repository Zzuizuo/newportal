<template>
    <div class="logintransit">
        <i class="el-icon-loading"></i> 
        <div>{{message}}</div>
    </div>
</template>

<script>
import {getQueryString} from '@/assets/js/tool'
import request from '@/assets/js/request'

export default{
    data(){
        return {
            message: '登录中'
        }
    },
    created(){
        this.$store.commit('handleDisplayMenu')
        let query = getQueryString('code')
        this.handleLogin(query)
    },
    mounted(){

    },
    methods: {
        handleLogin(query){
            request.get(this, '/wx/scan/login?' +query).then((res) => {
                if(res.code == 1){
                    this.$router.push({name: 'accounts'})
                    sessionStorage.user = JSON.stringify(res.data)
                }else{
                    this.message = '登录失败,请联系管理员'
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

<style <style lang="less">
.logintransit{
    padding: 100px;
    font-size: 20px;
    text-align: center;
    .el-icon-loading{
        font-size: 40px;
    }
    div{
        margin-top: 20px;
    }
}
</style>