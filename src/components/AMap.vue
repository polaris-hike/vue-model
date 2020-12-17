<template>
    <div>
        <div id="echarts-amap">
        </div>
        <div class="second-wrapper" v-show="isSecondShow">
            <div class="list" v-for="(item, index) in secondList" :key="index">
                <img :src="item.img" alt=""/>
                <span>{{ item.name }}</span>
            </div>
        </div>
        <div class="box" :class="currentBoxType" v-show="boxShow" :style="{left,top}">
            <div class="close" @click="boxShow = false">
                <img src="@/assets/index/close.png" alt="">
            </div>
            <h1>消火栓信息</h1>
            <ul>
                <li v-for="(val, key, index) in boxInfo">{{boxInfoNameList[index]}}: {{val}}</li>
            </ul>
            <div class="seeDetail" @click="toDevice">
                查看详情
            </div>
        </div>
    </div>
    <!--<el-amap vid="amapDemo" :zoom="zoom" :center="center">
    </el-amap>-->
</template>

<script>
    import echarts from "echarts";
    import "echarts/lib/chart/effectScatter";
    import vECharts from "vue-echarts";
    import "echarts-extension-amap";
    import AMapLoader from '@amap/amap-jsapi-loader';
    import {convertData, data} from "./mapPoint";
    const img = {
        error: require("@/assets/index/error.png"),
        warn: require("@/assets/index/warn.png"),
        stop: require("@/assets/index/stop.png"),
        normal: require("@/assets/index/normal.png"),
    };
    export default {
        components: {
            "v-chart": vECharts,
        },
        data() {
            return {
                boxShow:false,
                boxInfo:{
                    listing_number:'AD321561',
                    sn:'AD321561',
                    status:"正常",
                    name:'李工',
                    phone:'123456',
                    city:'广东省深圳市南山区',
                    address:'南山区粤海街道100米左侧',
                },
                boxInfoNameList:['挂牌编号','SN码','状况','联系人','联系方式','城市','地址'],
                isSecondShow: true,
                secondList: [
                    {
                        name: "正常",
                        img: img.normal,
                    },
                    {
                        name: "故障",
                        img: img.warn,
                    },
                    {
                        name: "告警",
                        img: img.error,
                    },
                    {
                        name: "停用",
                        img: img.stop,
                    },
                ],
                zoom: 12,
                center: [114.05571, 22.52245],
                options: {
                    amap: {
                        viewMode: "3D",

                        center: [114.05571, 22.52245],
                        zoom: 12,

                        resizeEnable: true,

                        mapStyle: "amap://styles/a16a47c4d16c0ba993e9d72f6a46b8b9",

                        renderOnMoving: true,

                        echartsLayerZIndex: 2019,
                    },
                    tooltip: {
                        trigger: "item",
                    },
                    //animation:"AMAP_ANIMATION_BOUNCE",
                    series: [
                        {
                            name: "聚合数据",
                            type: "effectScatter",

                            coordinateSystem: "amap",

                            data: [],
                            symbolSize: function (val) {
                                return val[2] / 10;
                            },
                            encode: {
                                value: 2,
                            },
                            label: {
                                formatter: "{@[2]}",
                                position: "inside",
                                show: true,
                            },
                            itemStyle: {
                                color: "#25a48e",
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                },
                            },
                        },
                    ],
                },
                mapInstance: null,
                chart: null,
                left:'',
                top:'',
                isMobile:false,
                currentBoxType:''
            };
        },
        mounted() {
            this.initMap()
            this.isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
        },
        destroyed() {
            this.mapInstance.destroy();
        },
        methods: {
            toDevice(){
                this.$router.push('/device')
            },
            handleMapClick(zoom, center) {
              this.$store.commit('setZoom', zoom)
              this.isSecondShow = zoom >= 15;
            },
            init(AMap) {

                var cluster;

                this.mapInstance = new AMap.Map("echarts-amap", {
                    viewMode: "3D",
                    center: [114.05571, 22.52245],
                    zoom: 12,

                    resizeEnable: true,

                    mapStyle: "amap://styles/a16a47c4d16c0ba993e9d72f6a46b8b9",

                    renderOnMoving: true,

                    echartsLayerZIndex: 2019,
                });
                this.mapInstance.on('zoomend', (e) => {
                    this.handleMapClick(this.mapInstance.getZoom(), this.mapInstance.getCenter())
                })
              this.mapInstance.on('click', (e) => {
                if(!e.clusterData) {
                  this.boxShow = false;
                }
              })
                this.$get('/api/v1/map').then(res=>{
                  res.data.base.forEach(item=>{
                    item.lnglat = item.lnglat.map(i=>{
                      if(i){return Number(i)}
                    })
                  })
                    const mapPoint = res.data.base
                    const gridSize = 60
                    const count = mapPoint.length;

                  const _renderClusterMarker = function (context) {
                        var factor = Math.pow(context.count / count, 1 / 18);
                        var div = document.createElement('div');
                        div.style.boxSizing='border-box';
                        // div.style.backgroundColor = '#26a58f';
                        var size = Math.round(50 + Math.pow(context.count / count, 1 / 4) * 20);
                        div.style.width = div.style.height = size + 'px';
                        // div.style.border = 'solid 5px #10353b';
                        // div.style.border = 'solid 10px red';
                        div.style.borderRadius = size / 2 + 'px';
                        div.innerHTML = context.count;
                        div.style.lineHeight = size + 'px';
                        div.style.color = '#fff';
                        div.style.fontSize = '16px';
                        div.style.textAlign = 'center';
                        div.style.backgroundImage = "url('https://wedge.oss-cn-shenzhen.aliyuncs.com/static/icon/dian1.gif')";//设置背景图的的地址
                        div.style.backgroundRepeat = "no-repeat";//设置背景不平铺
                        div.style.backgroundPosition = "center";//设置背景图的位置
                        div.style.backgroundSize = "100%";//设置背景图像的尺寸
                        div.style.className="mapstyle"
                        context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
                        context.marker.setContent(div)
                    };
                  const _renderMarker = function (context) {
                        var content
                      if (context.data[0].isonline === 0) {
                            content = `<div style="background-image: url('https://wedge.oss-cn-shenzhen.aliyuncs.com/static/icon/normal1.png');background-size:100% 100%;  height: 36px; width: 30px;"></div>`;
                            // content = '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>';
                        }
                        if (context.data[0].isonline === 1) {
                            content = `<div style="background-image: url('https://wedge.oss-cn-shenzhen.aliyuncs.com/static/icon/warn.png');background-size:100% 100%;  height: 36px; width: 30px;"></div>`;
                        }
                        if (context.data[0].isonline === 2) {
                            content = `<div style="background-image: url('https://wedge.oss-cn-shenzhen.aliyuncs.com/static/icon/stop.png');background-size:100% 100%; height: 36px; width: 30px;"></div>`;
                        }
                        if (context.data[0].isonline === 3) {
                            content = `<div style="background-image: url('https://wedge.oss-cn-shenzhen.aliyuncs.com/static/icon/error.png');background-size:100% 100%;  height: 36px; width: 30px;"></div>`;
                        }

                        var offset = new AMap.Pixel(-9, -9);
                        context.marker.setContent(content)
                        context.marker.setOffset(offset)
                    }


                    cluster = new AMap.MarkerCluster(this.mapInstance, mapPoint, {
                        gridSize, // 设置网格像素大小
                        maxZoom: 15,
                        minClusterSize:1,
                        renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
                        renderMarker: _renderMarker, // 自定义非聚合点样式
                    });
                    cluster.on('click',(e)=>{
                        if(this.isMobile) return
                      if(e.clusterData[0].isonline === 0){
                            this.currentBoxType = 'normal'
                        }
                        if(e.clusterData[0].isonline === 1){
                            this.currentBoxType = 'warn'
                        }
                        if(e.clusterData[0].isonline === 2){
                            this.currentBoxType = 'stop'
                        }
                        if(e.clusterData[0].isonline === 3){
                            this.currentBoxType = 'error'
                        }
                        this.boxShow = true;
                        const left = Number(e.marker.dom.style.left.split('px')[0])
                        const top = Number(e.marker.dom.style.top.split('px')[0])
                        this.left = left + 150+'px'
                        this.top = top-50+'px'
                    })
                })
            },
            initMap() {
                AMapLoader.load({
                    "key": "852b4331fa1629f5c4722b5cab98a8c6",              // 申请好的Web端开发者Key，首次调用 load 时必填
                    "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                    "plugins": ['AMap.MarkerCluster'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                    "AMapUI": {             // 是否加载 AMapUI，缺省不加载
                        "version": '1.1',   // AMapUI 缺省 1.1
                        "plugins": [],       // 需要加载的 AMapUI ui插件
                    },
                }).then((AMap) => {
                    this.init(AMap)
                    return
                    this.chart = echarts.init(document.getElementById("echarts-amap"));
                    this.chart.setOption(this.options);
                    this.mapInstance = this.chart.getModel().getComponent("amap").getAMap();
                    this.mapInstance.on('zoomend', (e) => {
                        this.handleMapClick(this.mapInstance.getZoom(), this.mapInstance.getCenter())
                    })
                }).catch(e => {
                    console.log(e);
                })
            },
        },
    };
</script>

<style lang="scss" scoped>
    .map,
    #echarts-amap {
        position: fixed !important;
        top: 0;
        z-index: 1;
        width: 100vw;
        height: 100vh;
    }
	.mapstyle{
		color:red
	}
    .second-wrapper {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 2.2vh;
        display: flex;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 0.5vw 1vw;

        .list {
            display: flex;
            align-items: center;
            margin-right: 2.5vw;

            &:last-child {
                margin: 0;
            }

            img {
                width: 1.1vw;
                height: 1.4vw;
                margin-right: 0.4vw;
            }
        }
    }
    .box {
        position: fixed;
        z-index: 2;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
        background: #192a37;
        padding: 1vw;
        &.normal {
            box-shadow: #36ba75 0 0 8px inset;
            border-top: 1px solid #36ba75;
            border-bottom: 1px solid #36ba75;
        }
        &.error {
            box-shadow: #e54e4e 0 0 8px inset;
            border-top: 1px solid #e54e4e;
            border-bottom: 1px solid #e54e4e;
        }
        &.warn {
            box-shadow: #e99002 0 0 8px inset;
            border-top: 1px solid #e99002;
            border-bottom: 1px solid #e99002;
        }
        &.stop {
            box-shadow: #999999 0 0 8px inset;
            border-top: 1px solid #999999;
            border-bottom: 1px solid #999999;
        }
        .close {
            position: absolute;
            right: 1vw;
            top: 1vw;
            width: 1.5vw;
            height: 1.5vw;
            cursor: pointer;
            img {
                width: 100%;
                height: 100%;
            }
        }
        h1 {
            font-size: 1vw;
            margin-bottom: 1vh;
        }
        li {
            margin-bottom: 1vh;
        }
        .seeDetail {
            width: 5.9vw;
            height: 3.7vh;
            line-height: 3.7vh;
            text-align: center;
            background-color: #1e4b6d;
            border: 1px solid #17fff3;
            font-size: 0.7vw;
            cursor: pointer;
            margin: 0 auto;
        }
    }
</style>
<style>
    .amap-logo {
        display: none !important;
    }

    .amap-copyright {
        display: none !important;
    }
</style>