import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import showMenu_store from './showMenu';//引入某个store对象

export default new vuex.Store({
    modules: {
        showMenu: showMenu_store
    }
})