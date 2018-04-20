<template>
    <div id="app">
        <admin></admin>
        <router-view></router-view>
    </div>
</template>

<script>
import admin from '@/components/admin'
export default {
    name: 'App',
    components: {
        admin
    },
    created(){

    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
