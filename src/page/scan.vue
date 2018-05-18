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
        this.$store.commit('handleDisplayMenu')
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
                // redirect_uri: encodeURIComponent(config.host+"/wx/scan/login"),
                redirect_uri: encodeURIComponent(config.host+"/#/scan/transit"),
                state: Math.ceil(Math.random() * 1000),
                style: "black",
                href: ""
            })
        }
    }
}
</script>

<style>
.login-form iframe{
    margin: 80px auto;
}
</style>