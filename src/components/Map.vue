<template>
    <div>
            <ECharts ref='map'
              class="map"
              :options="mapOption"></ECharts>
        <div class="box"
          v-show="boxShow">
            <header>
                <h1>{{boxInfo.title}}</h1>
            </header>
            <div class="content">
                <div class="list"
                  v-for="(item,index) in boxInfo.data"
                  :key="index">
                    <span class="title">{{item.title}}</span>
                    <span class="value">{{item.value}}</span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import ECharts from 'vue-echarts';
    import 'echarts/lib/chart/effectScatter';
    import 'echarts/extension/bmap/bmap.js';

    export default {
        name: 'Map',
        components: {
            ECharts,
        },
        data() {
            return {
                mapInstance: null,
                boxShow: false,
                URL: process.env.VUE_APP_BASE_URL,
                wsUrl: process.env.VUE_APP_WS_URL,
                delatX: 0,
                delatY: 0,
                mapOption: {
                    animation: false, //解决悬浮偏移问题
                    backgroundColor: 'transparent',
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        show: false
                    },
                    bmap: {
                        center: [114.015947, 22.647],
                        zoom: 12,
                        roam: true,
                        mapStyle: {
                            styleJson: [{
                                featureType: 'water',
                                elementType: 'all',
                                stylers: {
                                  color: "#032A40"
                                }
                            },
                                {
                                    featureType: 'land',
                                    elementType: 'all',
                                    stylers: {
                                        color: '#03070A'
                                    }
                                },
                                {
                                    featureType: 'boundary',
                                    elementType: 'geometry',
                                    stylers: {
                                        color: '#029fd4',

                                    }
                                },
                                {
                                    featureType: 'railway',
                                    elementType: 'all',
                                    stylers: {
                                        visibility: 'off'
                                    }
                                },
                                {
                                    featureType: 'highway',
                                    elementType: 'geometry',
                                    stylers: {
                                        visibility: 'off'
                                    }
                                },
                                {
                                    featureType: 'highway',
                                    elementType: 'geometry.fill',
                                    stylers: {
                                        color: '#005b96',
                                        lightness: 1
                                    }
                                },
                                {
                                    featureType: 'highway',
                                    elementType: 'labels',
                                    stylers: {
                                        visibility: 'off'
                                    }
                                },
                                {
                                    featureType: 'arterial',
                                    elementType: 'geometry',
                                    stylers: {
                                        color: '#004981'
                                    }
                                },
                                {
                                    featureType: 'arterial',
                                    elementType: 'geometry.fill',
                                    stylers: {
                                        color: '#00508b'
                                    }
                                },
                                {
                                    featureType: 'poi',
                                    elementType: 'all',
                                    stylers: {
                                        visibility: 'off'
                                    }
                                },
                                {
                                    featureType: 'green',
                                    elementType: 'all',
                                    stylers: {
                                        color: '#056197',
                                        visibility: 'off'
                                    }
                                },
                                {
                                    featureType: 'subway',
                                    elementType: 'all',
                                    stylers: {
                                        visibility: 'off'
                                    }
                                },
                                {
                                    featureType: 'manmade',
                                    elementType: 'all',
                                    stylers: {
                                        visibility: 'off'
                                    }
                                },
                                {
                                    featureType: 'local',
                                    elementType: 'all',
                                    stylers: {
                                        visibility: 'off'
                                    }
                                },
                                {
                                    featureType: 'arterial',
                                    elementType: 'labels',
                                    stylers: {
                                        visibility: 'off'
                                    }
                                },
                                {
                                    featureType: 'boundary',
                                    elementType: 'geometry.fill',
                                    stylers: {
                                        color: '#029fd4'
                                    }
                                },
                                {
                                    featureType: 'building',
                                    elementType: 'all',
                                    stylers: {
                                        color: 'rgb(14,27,48)'
                                    }
                                },
                                {
                                    featureType: 'label',
                                    elementType: 'all',
                                    stylers: {
                                        visibility: 'off'
                                    }
                                }
                            ]
                        }
                    },
                    series: []
                },
                bigPoint: [],
                boxInfo: {
                    title: '新增会员',
                    data: [{
                        title: '公司名称:',
                        value: '深圳xxx科技'
                    },
                        {
                            title: '产品名称:',
                            value: '好易贷'
                        },
                        {
                            title: '金额(万):',
                            value: '1000'
                        },
                        {
                            title: '地址:',
                            value: '广东深圳'
                        },
                    ]
                },
                timer: null,
                closeTimer: null
            };
        },
        props: ['seachData'],
        mounted() {
            this.mapInstance = this.$refs.map.chart.getModel().getComponent('bmap').getBMap();
        },
        methods: {
            handleTimer() {
                this.timer = setInterval(() => {
                    this.boxShow = true;
                    this.closeTimer = setTimeout(() => {
                        clearTimeout(this.closeTimer);
                        this.boxShow = false;
                    }, 3000);
                }, 8000);
            },
            bigPointClick(item) {
                let bigArr = this.bottomList;
                let newData = [];
                bigArr.map(el => {
                    if (item == el['name']) {
                        el['show'] = el['show'] ? false : true;
                    }
                    newData.push(el);
                });
                this.bottomList = newData;
                let bigPointData = this.bigPoint;
                let bigPointDataN = [];
                bigPointData.map((el, index) => {
                    el['show'] = this.bottomList[index]['show'];
                    bigPointDataN.push(el);
                });
                this.bigPoint = bigPointDataN;
            },
            onTap(ev) {
                console.log(ev);
                let p = this.mapInstance.overlayPixelToPoint(new BMap.Pixel(ev.center.x, ev.center.y));
                console.log(p);
            },
            onPanmove(ev) {
                let vm = this; //
                console.log(ev);
                vm.mapInstance.panBy(ev.deltaX * 0.11, ev.deltaY * 0.11, {
                    noAnimation: true
                });
                this.delatX += ev.deltaX * 0.11;
                this.delatY += ev.deltaY * 0.11;
            },
            onPinchend(ev) {
                if (ev.additionalEvent == 'pinchin' && (Math.abs(ev.distance) >= 15)) {
                    this.mapInstance.zoomOut();
                }
                if (ev.additionalEvent == 'pinchout' && (Math.abs(ev.distance) >= 15)) {
                    this.mapInstance.zoomIn();
                }
            },
            getMemberType() {
                axios.get(this.URL + '/admin/Dv/getMemberType').then(res => {
                    let resData = res.data;
                    let iconList = [
                        require('@/assets/index/1.png'),
                        require('@/assets/index/1.png'),
                        require('@/assets/index/1.png'),
                        require('@/assets/index/1.png'),
                        require('@/assets/index/1.png'),
                    ];
                    let seriData = [];
                    seriData = [{
                        name: '贷款',
                        icon: require('@/assets/index/1.png'),
                        show: true
                    }];
                    resData.map((el, index) => {
                        seriData.push({
                            name: el.type,
                            icon: iconList[index % iconList.length],
                            show: true,
                        });
                    });
                    this.bottomList = seriData;
                });
            },
            rendering(pointData) {
                this.mapInstance.clearOverlays();
                pointData.map((el) => {
                    if (el.show) {
                        let seriesData = [];
                        el.data.map(vol => {
                            let p = new BMap.Point(vol.value[0], vol.value[1]);
                            p.boxInfo = vol.boxInfo;
                            p.title = el.name;
                            seriesData.push(p);
                        });
                        let pointCollection = new BMap.PointCollection(seriesData, el.style);
                        this.mapInstance.addOverlay(pointCollection);
                        let vm = this;
                        pointCollection.addEventListener('click', function (e) {
                            var opts = {
                                width: vm.$vwToPx(17.24), // 信息窗口宽度
                                height: vm.$vwToPx(2 + e.point.boxInfo.length * 3), // 信息窗口高度
                                title: e.point.title, // 信息窗口标题
                                enableMessage: false //设置允许信息窗发送短息
                            };
                            let message = '';
                            e.point.boxInfo.map(el => {
                                if (el.value == null || e.value == 'null') {
                                    el.value = '无';
                                }
                                message +=
                                    `<div class="list">
									<span class="title">${el.title}</span>
									<span class="value">${el.value}</span>
								</div>`;
                            });
                            let infoWindow = new BMap.InfoWindow(message, opts);
                            vm.mapInstance.openInfoWindow(infoWindow, e.point);
                        });
                    }
                });

            },
            creatSocket() {
                let vm = this;
                vm.webSocket && vm.webSocket.close();
                vm.webSocket = new WebSocket(this.wsUrl);
                vm.webSocket.onopen = () => {
                    let interfaceData = [{
                        time: 16000,
                        is_first: true,
                        data: [{
                            url: vm.URL +
                                `/admin/Dv/getMemberList`,
                            key: 'getMemberList',
                            type: 'get',
                            is_ssl: false,
                            headers: ''
                        }]
                    },
                    ];
                    vm.webSocket.send(JSON.stringify(interfaceData));
                };
                vm.webSocket.onmessage = res => {
                    let data = JSON.parse(res.data);
                    let dataIndexTable = {
                        getMemberList: () => {
                            this.bigPoint = data.getMemberList;
                        },
                    };
                    for (let key in dataIndexTable) {
                        if (key in data) {
                            dataIndexTable[key]();
                        }
                    }
                };
            }
        }
    };
</script>

<style lang="scss"
  scoped>
    .map {
        position: absolute;
        top: 0;
        z-index: 1;
        width: 100vw;
        height: 100vh;

        ::v-deep .BMap_pop {
            background-size: 100% 100%;
            width: 17.24vw;
            height: 11vw;
        }

        ::v-deep .BMap_pop > div {
            border-width: 0;
            background: rgba(6, 54, 91, 0.8);

            &:nth-of-type(8) {
                display: none;
            }

            &:nth-of-type(9) {
                background: rgba(6, 54, 91, 0);
            }

            div {
                display: none
            }

            img {
                display: none
            }
        }

        ::v-deep .BMap_bubble_title {
            display: block !important;
            color: #fff;
            height: 2vw !important;
            line-height: 2vw !important;
            border-bottom: 2px solid rgba(255, 255, 255, 0.8);
            font-size: 0.94vw;
            font-weight: 500;
            margin-bottom: 1vw;
        }

        ::v-deep.BMap_bubble_content {
            display: block !important;
            background: rgba(6, 54, 91, 0);
            height: 9vw;

            .list {
                display: flex !important;
                font-size: 0.73vw;
                justify-content: space-between;
                margin-bottom: 1vw;

                .title {
                    color: #fff;
                    width: 4vw;
                }

                .value {
                    display: block;
                    width: 12vw;
                    color: #00ffff;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }

    .box {
        position: absolute;
        z-index: 19;
        top: 50%;
        left: 50%;
        width: 17.24vw;
        min-height: 10.05vw;
        padding: 0vw 1vw 0 0.52vw;
        color: #fff;
        background-size: 100% 100%;

        header {
            height: 2vw;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.3vw;

            h1 {
                font-size: 0.94vw;
                color: #fff;
                font-weight: 500;
                position: relative;
            }

            span {
                font-size: 0.94vw;
                color: #fff;
                cursor: pointer;

                img {
                    width: 1.2vw;
                    height: 1.2vw;
                    margin-top: 0.4vw;
                }
            }
        }

        .content {
            margin: 0 0.5vw;
            font-size: 0.73vw;

            .list {
                display: flex;
                justify-content: space-between;
                margin-bottom: 1vw;

                .title {
                    width: 4vw;
                }

                .value {
                    display: block;
                    width: 11vw;
                    color: #00ffff;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
</style>
<style>
    .BMap_cpyCtrl {
        display: none;
    }

    .anchorBL {
        display: none;
    }
</style>
