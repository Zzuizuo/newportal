<template>
    <div class="tapbox">
        <div class="boxtop">
            <div v-if="!isData" class="nodata">暂无数据，请先添加</div>
            <div v-else>
                <slot  name="complete"></slot>
            </div>
        </div>
        <div class="boxbottom" v-if="!isAddComplate">
            <a v-if="!isAdd" href="javascript:;" @click="handleAdd" class="link">添加</a>
            <div v-else>
                <slot name="create"></slot>
                <div style="margin-top: 20px">
                    <el-button size="small" @click="handleCancle">取消</el-button>
                    <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    components: {

    },
    data () {
        return {
            isAdd: false,
            isData: false,
            isAddComplate: false,
        }
    },
    props: {
        hasData: {
            type: Boolean
        },
    },
    computed:{

    },
    watch: {
        hasData(val){
            this.isData = val
            if(!val){
                this.isAddComplate = false
            }
        }
    },
    created(){
        this.isData = this.hasData
    },
    methods: {
        handleAdd(){
            this.isAdd = true
            this.$emit('on-add',this.handleCancle)
        },
        handleCancle(){
            this.isAdd = false
        },
        handleConfirm(){
            this.isAdd = false
            this.$emit('on-success',this.handleComplate)
        },
        handleComplate(){
            this.isAddComplate = true
        }
    }
}
</script>
<style lang="less" scoped>
@colorBlue: #00c8fb;
.tapbox{
    width: 1000px;
    border: 1px solid #ccc;
    background: #F4F5F9;
    .boxtop{
        padding: 12px 20px;
        .nodata{
            color: #909399;
            font-size: 14px;
        }
    }
    .boxbottom{
        border-top: 1px solid #ccc;
        padding: 12px 20px;
    }

    .link{
        color: @colorBlue;
        text-decoration: none;
        margin-right: 10px;
        cursor: pointer;
    }
    .link:hover{
        text-decoration: underline;
    }
    .buttonbox{
        margin-top: 20px;
    }
}
</style>
