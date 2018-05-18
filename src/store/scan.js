export default {
    state:{
        isBind: false,
        userId: null,
    },
    mutations: {
        handleBindWx (state) {
            state.isBind = true
        },
        handleUnbindWx (state){
            state.isBind = false
        },
        handleGetUserId(state,id){
            state.userId = id
        }
    },
}