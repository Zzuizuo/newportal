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
            message: ''
        }
    },
    created(){
        let query = getQueryString('code')
        let url = ''
        this.$store.commit('handleDisplayMenu')
        
        if(this.$store.state.scan.isBind){
            this.message = '绑定中'
            url = '/admin/user/bind?userId='+ this.$store.state.scan.userId+'&'+query
            this.handleScan(url)
        }else{
            this.message = '登录中'
            url = '/wx/scan/login?' + query
            this.handleScan(url)
        }
    },
    mounted(){

    },
    methods: {
        handleScan(url){
            request.get(this, url).then((res) => {
                if(res.code == 1){
                    this.$router.push({name: 'accounts'})
                    if(!this.$store.state.scan.isBind){
                        sessionStorage.user = JSON.stringify(res.data)
                    }
                }else{
                    if(this.$store.state.scan.isBind){
                        this.message = '绑定失败,请联系管理员'
                    }else{
                        this.message = '登录失败,请联系管理员'
                    }
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