<template>
    <div class="accountdetail">
        <el-container>
            <el-header>
                <div class="header">
                    <p class="headertitle">{{titleMessage}}</p>
                    <i class="el-icon-close close" @click="handleClose"></i>
                </div>
            </el-header>
            <el-main>
                <div class="bigbox">
                    <el-form ref="form" :model="form" label-width="180px" :rules="rules">
                        <el-form-item label="管理权限">
                            <el-input v-model="form.name" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="管理员">
                            <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            423534"2454325
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import request from '@/assets/js/request'
export default {
    components: {

    },
    data () {
        return {
            userList: [],
            titleMessage: '',
            filter: {
                page: 1,
                pageSize: 50,
            },
            form:{

            },
            formRules: {
                
            }
        }
    },
    computed:{

    },
    watch: {
        
    },
    created(){
        let params = this.$router.currentRoute.params

        if(params.type == 'create'){
            this.titleMessage = '创建管理员'
        }else{
            this.titleMessage = '编辑管理员'
        }

        this.$store.commit('handleDisplayMenu')
    },
    methods: {
        handleClose(){
            this.$router.history.go(-1)
        },
    }
}
</script>
<style lang="less">
.accountdetail{
    background: #f0f0f2;
    min-height: 100vh;
    .el-header{
        box-sizing: border-box;
        background: #f0f0f2;
    }
    .header{
        position: relative;
        width: 1400px;
        margin: 0 auto;
        .close{
            position: absolute;
            right: 0;
            top: 40px;
            font-size: 25px;
        }
    }
    .headertitle{
        height: 100px;
        text-align: center;
        line-height: 100px;
    }

    .bigbox{
        width: 1400px;
        min-height: calc(100vh - 100px);
        background: #fff;
        margin: 0 auto;
        padding-top: 50px;
        box-sizing: border-box;
    }
   
}

</style>
