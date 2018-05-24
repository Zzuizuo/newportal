<template>
    <div id="map-container" :style="{height: height+'px', width: width+'px'}"></div>
</template>

<script>
export default{
    components:{},
    props:{
        width: Number,
        height: Number,
        lat: Number,
        lng: Number,
        changeOption: Function,
        address: String,
        preview:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            map: null,
            marker: null,
        }
    },
    mounted(){
        if(this.lng && this.lat){
            this.map = new AMap.Map('map-container',{
                resizeEnable: true,
                zoom: 14,
                center: [this.lng, this.lat]
            })
        }else{
            this.map = new AMap.Map('map-container',{
                resizeEnable: true,
                zoom: 14
            })  
        }

        if(!this.preview){
            AMap.plugin(['AMap.ToolBar','AMap.Scale'], ()=>{
                this.map.addControl(new AMap.ToolBar());

                this.map.addControl(new AMap.Scale());
            })
        }

        this.map.on('complete', ()=>{
            if(this.lng && this.lat){
                this.addMarker([this.lng, this.lat], this.map)
            }
            
        })

    },
    watch:{
        address(val){
            this.setMarker()
        }
    },
    methods:{
        addMarker(centerArr, mapName){
            let that = this
            if(this.marker){
                this.marker.setPosition(centerArr)
                return;
            }

            this.marker = new AMap.Marker({
                map: mapName,
                icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
                draggable: this.preview ? false : true,
                animation:'AMAP_ANIMATION_NONE',
                raiseOnDrag: this.preview ? false : true,
                position: centerArr
            })

            //点击
            AMap.event.addListener(mapName, "click", (e) => {
                let lng = e.lnglat.lng
                let lat = e.lnglat.lat
                let lnglatXY = [lng, lat];//地图上所标点的坐标
                that.marker.setPosition(lnglatXY)
                AMap.service('AMap.Geocoder',function(){//回调函数
                    //实例化Geocoder
                    let geocoder = new AMap.Geocoder({
                        city: "010"//城市，默认：“全国”
                    });

                    geocoder.getAddress(lnglatXY, function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            let adcode = result.regeocode.addressComponent.adcode
                            that.changeOption(lng, lat, result.regeocode)
                            //获得了有效的地址信息:
                            //即，result.regeocode.formattedAddress
                        }else{
                            //获取地址失败
                        }
                    });
                })
            });

            

            if(!this.preview){
                this.marker.on('dragend', ()=>{
                    let lng = that.marker.getPosition().lng
                    let lat = that.marker.getPosition().lat
                    let lnglatXY=[lng, lat];//地图上所标点的坐标
                    AMap.service('AMap.Geocoder',function(){//回调函数
                        //实例化Geocoder
                        let geocoder = new AMap.Geocoder({
                            city: "010"//城市，默认：“全国”
                        });

                        geocoder.getAddress(lnglatXY, function(status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                let adcode = result.regeocode.addressComponent.adcode
                                that.changeOption(lng, lat,result.regeocode)
                                //获得了有效的地址信息:
                                //即，result.regeocode.formattedAddress
                            }else{
                                //获取地址失败
                            }
                        });
                    })
                })
            }

            
        },

        setMarker(){
            let _this = this
            let cityName = this.address

            if(cityName==null || cityName.trim()== ''){
                return
            }

            AMap.service('AMap.Geocoder',()=>{
                let geocoder = new AMap.Geocoder({})
                geocoder.getLocation(cityName, (status, result)=>{
                    if (status === 'complete' && result.info === 'OK') {
                        let lng = result.geocodes[0].location.lng
                        let lat = result.geocodes[0].location.lat
                        //TODO:获得了有效经纬度，可以做一些展示工作
                        //比如在获得的经纬度上打上一个Marker
                        _this.map.setZoomAndCenter(14, [lng, lat]);
                        _this.map.on('complete',function () {
                            _this.addMarker([lng, lat], _this.map);
                            _this.changeOption(lng, lat, result.geocodes[0])
                        });
                    }else{
                        //获取经纬度失败
                        this.$message({
                            showClose: true,
                            message: '地址获取失败，请填写完整的地址信息',
                            type: 'error'
                        })
                    }
                })
            })
        },
    },

}
</script>