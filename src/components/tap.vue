<template>
    <div class="tapbox">
        <div class="boxtop">
            <div class="nodata">没有任何数据</div>
        </div>
        <div class="boxbottom">
            <a href="javascript:;" @click="handleMerchantEdit(scope)" class="link">添加</a>
            <slot name="create"></slot>
            <div style="margin-top: 20px">
                <el-button size="small">取消</el-button>
                <el-button type="primary" size="small">确定</el-button>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style lang="less" scoped>
@colorBlue: #00c8fb;
.tapbox{
    width: 800px;
    border: 1px solid #ccc;
    background: #F4F5F9;
    .boxtop{
        padding: 12px 20px;
        border-bottom: 1px solid #ccc;
        .nodata{
            color: #909399;
            font-size: 14px;
        }
    }
    .boxbottom{
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
