<template>
    <div class="login-form" @click="handleClick">
        23423
        lalalalla
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

    },
    
    methods: {
        handleClick(){
            this.$router.push({name: 'detail'})
        },
    }
}
</script>

<style>
.login-form{
    text-align: center;
}
</style>