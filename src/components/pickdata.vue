<template>
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :close-on-click-modal="false"
            width="1000px"
            >
            <div class="pickbox">
                <div class="menu">
                    <el-menu
                        :default-active="active"
                        class="el-menu-vertical-demo"
                        active-text-color="#fff"
                        text-color="#606266"
                        @select="handleSelectMenu">
                        <el-menu-item v-for="item in menus" :key="item.name" :index="item.index">{{item.name}}</el-menu-item>
                    </el-menu>
                </div>
                <div class="content">
                    <div class="contenttop">
                        <el-input
                            placeholder="输入关键词搜索"
                            v-model="filterKey"
                            style="width: 240px">
                            <el-button icon="el-icon-search" style="background: #00CBFB;color: #fff;border-radius: 0" slot="append" type="primary" @click="handleSearch"></el-button>
                        </el-input>
                        
                    </div>
                    <div class="choosebox">
                        <el-tooltip class="chooseitem" v-for="(item,index) in chooseData" :key="index" placement="bottom"
                        :content="item.name" 
                        >
                            <div @click="handleChooseItem(item)">
                                <i v-if="!multiple" :class="['el-icon-check', 'choosesign', selectObj.id == item.id ? 'choosesignActive' : '']"></i>
                                <i v-else :class="['el-icon-check', 'choosesign', checkItem(item) ? 'choosesignActive' : '']"></i>
                                <img :src="item.imgUrl" class="image">
                                <div class="text">{{item.name}}</div>
                            </div>
                        </el-tooltip>
                    </div>
                    <div class="contentbootom">
                        <el-pagination
                            layout="prev, pager, next"
                            @current-change="handlePageChange"
                            :current-page="filter.page"
                            :page-size="1"
                            :total="totaldata">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancle">取 消</el-button>
                <el-button type="primary" @click="handleComplete">确 定</el-button>
            </span>
        </el-dialog>
</template>
<script>
    export default{
        components:{},
        props: {
            visible: Boolean,
            title: String,
            totaldata: Number,
            selectedObj: Object,
            active: String,
            menus: Array,
            multiSelectedObj: {
                type: Array,
                default: ()=>{
                    return []
                }
            },
            pickdata: {
                type: Array,
                default: ()=>{
                    return []
                }
            },
            multiple: {
                type: Boolean,
                default: true
            },
        },
        data(){
            return {
                dialogVisible: false,
                filterKey: '',
                chooseData: [],

                selectObj: {},
                multiSelectObj: [],

                filter: {
                    pageSize: 1,
                    page: 1,
                },
            }
        },
        watch: {
            visible(val){
                this.dialogVisible = val
            },
            pickdata(val){
                this.chooseData = val
            }
        },
        created(){

        },
        methods:{
            handleSearch(){
                this.$emit('on-search',this.filterKey)
            },
            checkItem(item){
                let isPicked = false
                this.multiSelectObj.map(itemObj => {
                    if(itemObj.id == item.id){
                        isPicked = true
                    }
                })
                return isPicked
            },
            handleSelectMenu(key){
                this.activeColor = key
                this.$emit('on-loaddata',key)
            },
            handleCancle(){
                this.$emit('on-cancle')
            },
            handleChooseItem(item){
                if(this.multiple){
                    let current = this.checkItem(item)
                    if(current){
                        let array = []
                        for(let i in this.multiSelectObj){
                            if(this.multiSelectObj[i].id != item.id){
                                array.push(this.multiSelectObj[i])
                            }
                        }
                        this.multiSelectObj = [...array]
                    }else{
                        let array = [...this.multiSelectObj]

                        array.push({...item,...{selectedType:this.type}})

                        this.multiSelectObj = [...array]
                    }
                }else{
                    if(this.selectObj.id == item.id){
                        this.selectObj = {}
                    }else{
                        this.selectObj = {...item}
                    }
                }
            },
            handlePageChange(page){
                this.$emit('on-turanpage',page)
            },
            handleComplete(){
                this.$emit('on-complete',this.selectObj,this.multiSelectObj)
            }
        }
    }
</script>
<style lang="less">
.el-dialog__body{
    padding: 30px;
}
.pickbox{
    display: flex;
    border: solid 1px #e6e6e6;
    .menu{
        width: 150px;
        height: 480px;
        display: inline-block;
        vertical-align: top;
        .el-menu{
            height: 480px;
            border-right: solid 1px #e6e6e6;
        }
        
    }
    .content{
        flex: 1;
        .contenttop{
            display: flex;
            padding: 7.5px 20px;
            border-bottom: 1px solid #e6e6e6;
        }
    }
    .choosebox{
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
        .chooseitem{
            cursor: pointer;
            position: relative;
            width: 160px;
            height: auto;
            margin: 0 15px 15px 0;
            border: 1px solid #e6e6e6;
            .choosesign{
                position: absolute;
                top: 0;
                right: 0;
                font-size: 20px;
                border: 1px solid #e6e6e6;
                color: rgba(255,255,255,1);
            }
            .choosesignActive{
                background: #2EC1E2;
            }
            img{
                width: 100%;
                height: 120px;
            }
            .text{
                width: 100%;
                text-align: center;
                text-overflow : ellipsis; 
                white-space : nowrap; 
                overflow : hidden; 
            }
        }
    }
    .contentbootom{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        .el-pagination{
            text-align: right;
        }
    }
}

.el-menu-item.is-active{
    background: #2EC1E2;
    color: #fff;
}

</style>

    