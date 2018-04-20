<template>
    <div class="login-form">
        <div id="scanlogin"></div>
    </div>
</template>

<script>
import config from '@/assets/js/loginBase'

export default{
    data(){
        return {
            
        }
    },
    created(){
        
    },
    mounted(){
        this.loadQRcode()
    },
    
    methods: {
        loadQRcode(){
            new WxLogin({
                id: "scanlogin",
                appid: config.wxAppid,
                scope: "snsapi_login",
                redirect_uri: encodeURIComponent(config.host+"/alpha/api/wechatscan/login"),
                state: Math.ceil(Math.random() * 1000),
                style: "black",
                href: ""
            })
        }
    }
}
</script>

<style>
.login-form{
    text-align: center;
}
</style>