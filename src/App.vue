<template>
    <div id="app">
        <admin v-if="isShow"></admin>
        <entrance v-else/>
    </div>
</template>

<script>
import Admin from '@/components/admin'
import Entrance from '@/components/entrance'
export default {
    name: 'App',
    components: {
        Admin,Entrance
    },
    computed: {
        isShow() {
            return this.$store.state.showMenu.isShow
        }
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
