<template>
    <div class="account">
        <el-container>
            <el-header>
                <p class="headertitle">账号管理</p>
            </el-header>
            <el-main>
                <p class="tips"><i class="el-icon-warning"></i> 管理员最多添加50人</p>
                <div class="bigbox">
                    <el-card class="box-card">
                        <div class="addAccount">
                            <i class="el-icon-plus"></i>
                            <p>添加账户</p>
                        </div>
                    </el-card>
                    <el-card class="box-card">
                        <div class="userInfo">
                            <img src="" alt="">
                            <p class="username">哈哈哈</p>
                            <p class="text">项管理权限</p>
                            <p class="time">12378</p>
                        </div>
                    </el-card>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    
</script>
<style lang="less">
.account{
    .el-header{
        box-sizing: border-box;
        background: #f0f0f2;
    }
    .headertitle{
        height: 60px;
        line-height: 60px;
    }
    .tips{
        color: #909399;
        font-size: 12px;
    }
    .bigbox{
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
    }
    .box-card{
        position: relative;
        width: 200px;
        height: 248px;
        text-align: center;
        color: #909399;
        margin-right: 20px;;
    }
    .addAccount{
        position: absolute;
        top: 120px;
        left: 50%;
        transform: translate(-50%,-50%);
        i{
            margin-bottom: 20px;
            font-size: 20px;
        }
    }
    .userInfo{
        text-align: left;
        color: #303133;
        img{
            width: 80px;
            height: 80px;
            border-radius: 100%;
            margin: 0 auto 30px;
        }
        .text{
            margin-top: 12px;
            font-size: 12px;
        }
        .username{
            font-size: 12px;
        }
        .time{
            font-size: 12px;
        }
    }
}

</style>
