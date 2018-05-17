export default {
    state:{
        isShow: false
    },
    mutations: {
        handleShowMenu (state) {
            state.isShow = true
        },
        handleDisplayMenu (state){
            state.isShow = false
        }
    },
}