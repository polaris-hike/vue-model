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

        <!--<v-chart
                style="width: 100vw; height: 100vh"
                class="map"
                id="echarts-amap"
                autoresize
                ref="instance"
                :options="options"
        ></v-chart>-->
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

    const shenzhen = [
        {
            name: "宝安区",
            value: [113.890267, 22.557764, 270],
        },
        {
            name: "龙岗区",
            value: [114.24771, 22.71986, 270],
        },
        {
            name: "南山区",
            value: [113.93029, 22.53291, 270],
        },
        {
            name: "福田区",
            value: [114.05571, 22.52245, 270],
        },
    ];
    const shenzhen1 = [
        {
            id: "1",
            lnglat: [113.890267, 22.557764],
        },
        {
            id: "2",
            lnglat: [114.24771, 22.71986],
        },
        {
            id: "3",
            lnglat: [113.93029, 22.53291],
        },
        {
            id: "4",
            lnglat: [114.05571, 22.52245],
        },
        {
            id:'1',
            lnglat: [113.52,22.3]
        },
        {
            id:'1',
            lnglat: [113.889342,22.561878]
        },
        {
            id:'1',
            lnglat: [113.889764,22.562328]
        },
        {
            id:'1',
            lnglat: [113.52,22.3]
        },{
            id:'1',
            lnglat: [113.52,22.3]
        }

    ];
    const secondPoint = [
        {
            name: "会展中心",
            value: [114.05798, 22.5282, 270],
        },
    ];
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
                isSecondShow: false,
                secondList: [
                    {
                        name: "正常",
                        img: img.normal,
                    },
                    {
                        name: "故障",
                        img: img.error,
                    },
                    {
                        name: "告警",
                        img: img.warn,
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
                    animation: false,
                    series: [
                        {
                            name: "聚合数据",
                            type: "effectScatter",

                            coordinateSystem: "amap",

                            data: shenzhen,
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
                chart: null
            };
        },
        mounted() {
            this.initMap()
        },
        destroyed() {
            this.mapInstance.destroy();
        },
        methods: {
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
                this.$get('/api/v1/map').then(res=>{
                    console.log(res);
                })

                const gridSize = 60
                var count = shenzhen1.length;

                var _renderClusterMarker = function (context) {
                    var factor = Math.pow(context.count / count, 1 / 18);
                    var div = document.createElement('div');
                    div.style.boxSizing='border-box';
                    div.style.backgroundColor = '#26a58f';
                    var size = Math.round(30 + Math.pow(context.count / count, 1 / 4) * 20);
                    div.style.width = div.style.height = size + 'px';
                    div.style.border = 'solid 5px #10353b';
                   // div.style.border = 'solid 10px red';
                    div.style.borderRadius = size / 2 + 'px';
                    div.innerHTML = context.count;
                    div.style.lineHeight = size + 'px';
                    div.style.color = '#fff';
                    div.style.fontSize = '14px';
                    div.style.textAlign = 'center';
                    context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
                    context.marker.setContent(div)
                };
                var _renderMarker = function (context) {
                    var content
                    if (context.data[0].id === '1') {
                        content = `<div style="background-image: url('https://wedge.oss-cn-shenzhen.aliyuncs.com/static/icon/normal.png');background-size:100% 100%;  height: 36px; width: 30px;"></div>`;
                        // content = '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>';
                    }
                    if (context.data[0].id === '2') {
                        content = `<div style="background-image: url('https://wedge.oss-cn-shenzhen.aliyuncs.com/static/icon/error.png');background-size:100% 100%;  height: 36px; width: 30px;"></div>`;
                    }
                    if (context.data[0].id === '3') {
                        content = `<div style="background-image: url('https://wedge.oss-cn-shenzhen.aliyuncs.com/static/icon/warn.png');background-size:100% 100%; height: 36px; width: 30px;"></div>`;
                    }
                    if (context.data[0].id === '4') {
                        content = `<div style="background-image: url('https://wedge.oss-cn-shenzhen.aliyuncs.com/static/icon/stop.png');background-size:100% 100%;  height: 36px; width: 30px;"></div>`;
                    }

                    var offset = new AMap.Pixel(-9, -9);
                    context.marker.setContent(content)
                    context.marker.setOffset(offset)
                }


                cluster = new AMap.MarkerCluster(this.mapInstance, shenzhen1, {
                    gridSize, // 设置网格像素大小
                    maxZoom: 15,
                    minClusterSize:1,
                    renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
                    renderMarker: _renderMarker, // 自定义非聚合点样式
                });
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
</style>
<style>
    .amap-logo {
        display: none !important;
    }

    .amap-copyright {
        display: none !important;
    }
</style>