<template>
    <div class="box">
        <div class="calendarBox">
            <div class="Date">
                <div class="icon el-icon-arrow-left" :style="{'font-size':'12px','width': '20px','height': '20px','cursor':'pointer',
                'display': 'inline-block','color': currentTime.currentMonth != time.month ? '#00c8fb' : '#dfdfdf'}" @click="prevMonth"></div>
                <span style="margin: 0 12px 0 12px">{{time.year+'年'+time.month+'月'}}</span>
                <div class="icon el-icon-arrow-right" :style="{'font-size':'12px','width': '20px','height': '20px','cursor':'pointer',
                'display': 'inline-block','color': currentTime.currentMonth + 1 != time.month ? '#00c8fb' : '#dfdfdf'}" @click="nextMonth"></div>
            </div>
            <div class="week">
                <div style="color: #00c8fb;">日</div> 
                <div>一</div>
                <div>二</div>
                <div>三</div>
                <div>四</div>
                <div>五</div>
                <div style="color: #00c8fb;">六</div>
            </div>
            <div class="calendar">
                <div class="day" v-for="(item,index) in calendarList" :key="index"
                :style="{'background': (item.day == time.day && (time.month == currentTime.currentMonth)) ? '#00c8fb' : '#fff'}"
                @click="showBorder(index,item)">
                    <div class="border" v-if="index == currentIndex"></div>
                    <div class="rest" v-if="item.isRest">休</div>
                    <div  class="date" 
                    :style="{'color': (item.day < time.day && (time.month == currentTime.currentMonth)) ?
                    '#919191' : (item.day == time.day && (time.month == currentTime.currentMonth)) ? '#fff' : '#101010'}">
                        {{item.day | handleCurrentDay(time,currentTime)}}
                    </div>
                    <p v-if="isHotel && item.day && item.day >= time.day" class="price" 
                    :style="{'color': item.day == time.day && time.month == currentTime.currentMonth ? '#adebff' : (index % 7) == 6 || (index % 7) == 5? '#00c8fb' : '#adadad' }">
                        <span>{{'￥' + item.price}}</span>
                    </p>
                    <p v-if="!isHotel && item.day && item.day >= time.day" class="price" 
                    :style="{'color': item.day == time.day && time.month == currentTime.currentMonth ? '#adebff' : (index % 7) == 6 || (index % 7) == 0? '#00c8fb' : '#adadad' }">
                        <span>{{'￥' + item.price}}</span>
                    </p>
                    <p v-if="item.day  && item.day >= time.day && isHotel && item.amount !== null" class="scaleAmount" 
                    :style="{'background': (item.day == time.day && (time.month == currentTime.currentMonth)) ? '#fff' : '#00c8fb',
                    'color': (item.day == time.day && (time.month == currentTime.currentMonth)) ? '#00c8fb' : '#fff' }">
                        库存<span>{{item.amount}}</span>
                    </p>
                    <p v-if="item.day  && item.day >= time.day && !isHotel && item.amount !== null" class="scaleAmount" 
                    :style="{'background': (item.day == time.day && (time.month == currentTime.currentMonth)) ? '#fff' : '#00c8fb',
                    'color': (item.day == time.day && (time.month == currentTime.currentMonth)) ? '#00c8fb' : '#fff' }">
                        库存<span>{{item.amount}}</span>
                    </p>
                </div>
            </div>
        </div> 
        <div class="calendarDetail">
            <img src="http://cdn.genwoshua.com/rili.png" alt="">
            <p>{{time.year+'年'+time.month+'月'+timing+'日'}}</p>
            <div style="display: flex;justify-content:center;align-items:center">
                <div style="height:24px">价格</div>
                <span v-if="!inputVisible" style="line-height:24px;margin-left: 10px;width: 36px">{{detailPrice}}</span>
                <el-input v-if="inputVisible" v-model="detail.price" style="height:27px; margin-left: 10px"  type="number"></el-input>
            </div>
            <div style="margin-top: 4px;display: flex; justify-content:center;align-items:center;">
                <div style="height:24px">库存</div>
                <div v-if="!inputVisible" style="line-height:24px;width: 36px;margin-left: 10px">{{detailAmount}}</div>
                <el-input v-if="inputVisible" v-model="detail.amount" style="height:27px; margin-left: 10px"  type="number"></el-input>
            </div>
            <el-button v-if="btnVisiable" type="text" style="background: #fff;" @click="reviseDetail(detailPrice,detailAmount)">{{btnText}}</el-button>
        </div>
    </div>
</template>
<script>
    import io from '@/util/io'
    let oldObj=null;
    let oldArr=[];
    
    export default{
    components:{},
    props:{
        calendarList: Array,//日历
        detail: Object,
        currentTime: Object,
        time: Object,
        btnVisiable: Boolean,//按钮？
        isHotel:Boolean,//酒店？
        inTheDetail: Boolean,//详情页？
        productId: Number,//产品id
        old: Array,
    },
    data(){
        return{
            currentIndex: '',
            timing: '',
            inputVisible: false,
            btnText: '点击修改',
            constTime: '',
            constIndex: ''
        }
    },
    computed:{
        detailPrice(){
            return this.detail.price
        },
        detailAmount(){
            return this.detail.amount
        },
    },
    filters: {
        handleCurrentDay(item,time,currentTime){
            if(item == time.day && time.month == currentTime.currentMonth){
                item = '今天'
            }
            return item
        }
    },
    created(){ 
        let amount = null
        this.timing = this.time.day
        this.constTime = this.time.day
        if(this.calendarList.length > 0){
            this.calendarList.map((item,index) => {
                if(item.day == this.currentTime.currentDay){
                    this.currentIndex = index
                    this.constIndex = index
                }
            })
        }
    },
    methods:{
        showBorder(index,item){
            if(!item.day || item.day < this.time.day  || item.day > this.monthAmount) return
            this.$emit('on-calendar-box',item)
            this.timing = item.day
            this.currentIndex = index
        },
        reviseDetail(price,amount){  
            let noCommon = false
            if(!this.inputVisible){
                this.inputVisible = true
                this.btnText = '确认修改'
                oldObj = {
                    y: this.time.year,
                    m: this.time.month,
                    d: this.timing,
                    price: price,
                    stock: amount,
                    index: this.currentIndex
                }
                if(this.old.length > 0){
                    this.old.map(item => {
                        if(item.y == oldObj.y && item.m == oldObj.m && item.d == oldObj.d){
                            noCommon = true
                        }
                    })
                    if(!noCommon){
                        this.old.push(oldObj)
                    }
                }else{
                    this.old.push(oldObj)
                }
            }else{
                if(price < 0 || amount < 0){
                    alert('输入值不能为负数')
                    return
                }
                this.inputVisible = false
                this.btnText = '点击修改'
            }
            this.$emit('on-revise',price,amount,this.currentIndex,this.old,this.timing)
        },
        prevMonth(){
            this.timing = this.constTime
            this.$emit('prev')
            this.currentIndex = this.constIndex
        },
        nextMonth(){
            this.timing = 1
            this.$emit('next')
            console.log(this.detail.index)
            this.currentIndex = this.detail.index
        },
        transformNum(num){
            num = num + ''
            if(num.length == 1){
                return '0' + num
            }else{
                return num
            }
        }
    }
}
</script>
<style scoped>
.box{
    width: auto;
    height: auto;
    display: flex;
    margin-top: 20px;
}
.calendarBox{
    width: auto;
    height: auto;
    background: #fff;
    padding-top: 20px;
    margin:0 20px;
}
.calendarDetail{
    flex: 1;
    background: #00c8fb;
    max-width: 280px;
}
.Date{
    width: 568px;
    text-align: center;
    font-size: 16px;
}
.calendar{
    border-top: 1px solid #e6e6e6;
    border-left: 1px solid #e6e6e6;
    height: auto;
    width: 568px;
    display: flex;
    flex-wrap: wrap 
}
.week{
    width: 568px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    display: flex;
}
.week div{
    width: 80px;
    height: 64px;
}

.border{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid #00c8fb;
}
.rest{
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: rgba(255,168,0,.8);
    color: #fff;
}
.day{
    position: relative;
    width: 80px;
    height: 72px;
    text-align: center;
    border-bottom: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    line-height: 1;
    cursor:pointer;
    display: flex;
    flex-direction: column;
}
.day:after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid #00c8fb;
    display: none;
}
.day:hover:after{
    display: block;
}
.date{
    font-size: 16px;

    padding-top: 8px;
}
.calendarDetail img{
    font-size: 16px;
    width: 100px;
    height: 100px;
    display: block;
    margin: 80px auto 0 auto;
}
.calendarDetail p{
    font-size: 20px;
    color: #fff;
    text-align: center;
    font-weight: 500;
    margin-top: 40px;
}
.calendarDetail div{
    color: #fff;
    text-align: center;
    font-weight: 500;
}
.price{
    color: #adadad;
    text-align: center;
    padding-top:10px;
    margin: 0;
}
.scaleAmount{
    flex: 1;
    text-align: center;
    padding-top: 3px;
    margin: 4px 0 0 0;
    font-size: 14px;
}
input{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 3px;
    border: 1px solid rgb(191, 209, 217);
    box-sizing: border-box;
    color: rgb(31, 52, 61);
    display: block;
    font-size: inherit;
    line-height: 1;
    outline: none;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    margin-top: 3px;
    width: 80px;
}
    
.el-button{
    display: block;
    padding: 10px 30px;
    margin: 70px auto;
    border-radius: 5px;
}
</style>