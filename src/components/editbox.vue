<template>
    <div id="editbox">
        <el-form :inline="true" :model="form" label-position="left" class="demo-form-inline">
            <el-form-item :label="name" label-width="120px">
                <slot name="content"></slot>
            </el-form-item>
        </el-form>
        <div class="editbutton">
            <a v-if="isEdit" href="javascript:;" class="link" @click="handleEdit">修改</a>
        </div>
        <el-dialog
        :title="name"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        :width="width"
        top="25vh"
        :before-close="handleClose">
            <el-form :inline="true" :model="form" label-position="left" class="demo-form-inline">
                <slot name="edit"></slot>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditComplete">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import request from '@/assets/js/request'

export default{
    data(){
        return{
            dialogVisible: false,
            form: {

            }
        }
    },
    props:{
        name: String,
        width: {
            type: String,
            default: '50%'
        },
        isEdit: {
            type: Boolean,
            default: true
        },
        isCustom: {
            type: Boolean,
            default: false
        }
    },
    computed:{

    },
    watch: {

    },
    created(){

    },
    methods:{
        handleClose(){
            this.dialogVisible = false
        },
        handleEdit(){
            if(this.isCustom){
                this.$emit('on-custom')
            }else{
                this.dialogVisible = true
                this.$emit('on-edit')
            }
        },
        handleEditComplete(){
            this.$emit('on-complate')
            this.dialogVisible = false
        },
    },
}
</script>

<style lang="less">
#editbox{
    padding: 10px 20px;
    display: flex;
    border-top: 1px solid #E4E7ED;
    .demo-form-inline{
        flex: 1;
    }
    .editbutton{
        padding-top: 10px;
        width: 100px;
        text-align: right;
        font-size: 14px;
    }
    .link{
        color: #00c8fb;
        text-decoration: none;
        margin-right: 10px;
        cursor: pointer;
    }
    .link:hover{
        text-decoration: underline;
    }
}
</style>
