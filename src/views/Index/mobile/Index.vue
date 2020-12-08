<template>
    <div class="mobile">
        <header>
            <div class="left"></div>
            <div class="center">
                <i class="search-icon"></i>
                <input class="search" type="text" placeholder="请输入关键字"/>
            </div>
            <div class="right"></div>
        </header>

        <main v-show="!isSecondShow" id="myMain" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
              :style="{bottom:bottom+'vh',overflow:overflow}">
            <div class="line" @click="handleLineClick"></div>
            <section class="top">
                <ul>
                    <li v-for="(item,index) in numList"
                        :key="index">
                        <div class="logo">
                            <img :src="item.img"
                                 alt="">
                        </div>
                        <span class="name">{{item.name}}</span>
                        <span class="value">{{item.num}}</span>
                    </li>
                </ul>
            </section>
            <section class="chart-wrapper">
                <header>报警占比分析</header>
                <div class="pie-wrapper">
                    <customizedPie
                            class="pie"
                            :options="pieOption">
                        <template v-slot:label="labelData">
                         <span class="label allCenter2">
                            <span class="percent DM">{{labelData.labelPercent}}</span>
                            <span class="labelName">{{labelData.labelName}}</span>
                        </span>
                        </template>
                    </customizedPie>
                    <div class="legend">
                        <div class="list" v-for="(item,index) in legendList" :key="index">
                            <div class="square"></div>
                            <span class="name">{{item.name}}</span>
                            <span class="percent">{{item.percent}}</span>
                            <span class="value">{{item.value}}</span>
                        </div>
                    </div>
                </div>
            </section>
            <section class="bottom">
                <h2>实时报警</h2>
                <div class="warning-wrapper">
                    <header>
                        <span>挂牌编号</span>
                        <span>报警描述</span>
                        <span>报警时间</span>
                    </header>
                    <div class="list-wrapper">
                        <vueSeamless :data="warningList"
                                     :class-option="seamlessOptions">
                            <div class="list"
                                 v-for="(list,index) in warningList"
                                 :key="index">
                                <span>{{list.id}}</span>
                                <span>{{list.desc}}</span>
                                <span>{{list.time}}</span>
                                <span v-if="list.state ===1">未处理</span>
                                <span v-if="list.state ===2">已处理</span>
                            </div>
                        </vueSeamless>

                    </div>
                </div>
            </section>
            <section class="warning bottom">
                <header>离线列表</header>
                <div class="warning-wrapper">
                    <header>
                        <span>挂牌编号</span>
                        <span>报警描述</span>
                        <span>地址</span>
                        <span>联系人</span>
                    </header>
                    <div class="list-wrapper">
                        <vueSeamless :class-option="seamlessOptions"
                                     :data="warningList">
                            <div :key="index"
                                 class="list"
                                 v-for="(list,index) in errorList">
                                <span>{{list.id}}</span>
                                <span>{{list.desc}}</span>
                                <span>{{list.address}}</span>
                                <span>{{list.contact}}</span>
                            </div>
                        </vueSeamless>
                    </div>
                </div>
            </section>
        </main>
        <v-touch @swipeup="swipeup" @swipedown="swipedown">
            <main v-show="isSecondShow" :style="{bottom:bottom1+'vh'}">
                <div class="second-wrapper" v-show="isSecondShow" >
                    <div class="list" v-for="(item, index) in secondList" :key="index">
                        <img :src="item.img" alt=""/>
                        <span>{{ item.name }}</span>
                    </div>
                </div>
                <section class="bottom percentAnalyse">
                    <header>报警占比分析</header>
                    <ul>
                        <li v-for="(item,index) in percentList" :key="index">
                            <span>{{item.name}}:</span>
                            <span>{{item.value}}</span>
                        </li>
                    </ul>

                </section>
                <section class="warning errorList bottom">
                    <header>离线列表</header>
                    <div class="warning-wrapper">
                        <header>
                            <span>挂牌编号</span>
                            <div class="water">
                                <div class="top">
                                    水压
                                </div>
                                <div class="bottom">
                                    <span>水压（Mpa）</span>
                                    <span>采集时间</span>
                                    <span>接受时间</span>
                                </div>
                            </div>

                        </header>
                        <div class="list-wrapper">
                            <div :key="index"
                                 class="list"
                                 v-for="(list,index) in errorList">
                                <span>{{list.id}}</span>
                                <span>{{list.desc}}</span>
                                <span>{{list.address}}</span>
                                <span>{{list.contact}}</span>
                            </div>
                        </div>
                        <div class="pagination">
                            <div class="left">
                                上一页
                            </div>
                            <div class="center">1/页</div>
                            <div class="right">下一页</div>
                        </div>
                    </div>
                </section>
            </main>
        </v-touch>
    </div>
</template>

<script>
    import vueSeamless from 'vue-seamless-scroll';
    import customizedPie from "../../../components/customizedPie";
    import {pieOption} from '../rightSide/chartOptions';
    import VEcharts from 'vue-echarts';
    import 'echarts/lib/chart/line';

    const img = {
        error: require("@/assets/index/error.png"),
        warn: require("@/assets/index/warn.png"),
        stop: require("@/assets/index/stop.png"),
        normal: require("@/assets/index/normal.png"),
    };
    export default {
        name: "Index",
        components: {
            customizedPie,
            vueSeamless, VEcharts
        },
        data() {
            return {
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
                isSecondShow: false,
                overflow: 'unset',
                warningList: [
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },

                ],
                pieOption,
                legendList: [
                    {
                        name: "非法用水",
                        percent: "55%",
                        value: 291
                    },
                    {
                        name: "水压异常",
                        percent: "25%",
                        value: 112
                    },
                    {
                        name: "电压异常",
                        percent: "20%",
                        value: 89
                    }
                ],
                bottom: -154,
                bottom1: -145,
                percentList: [
                    {
                        name: '非法用水',
                        value: 'WG54991'
                    },
                    {
                        name: 'SN码',
                        value: 'WG54991'
                    },
                    {
                        name: '休眠周期',
                        value: '20分钟'
                    },
                    {
                        name: '压力采集周期',
                        value: '20分钟'
                    },
                    {
                        name: '压力报警上限',
                        value: '10.00mpa'
                    },
                    {
                        name: '压力报警下限',
                        value: '10.00mpa'
                    },
                    {
                        name: '负责人',
                        value: '10.00mpa'
                    },
                    {
                        name: '地址',
                        value: '深圳高新区科苑南路综合服务楼'
                    },
                ],
                numList: [
                    {
                        name: '消防栓数量',
                        img: require('@/assets/index/1.png'),
                        num: 17800,
                    },
                    {
                        name: '故障数量',
                        img: require('@/assets/index/2.png'),
                        num: 149,
                    },
                    {
                        name: '停用数量',
                        img: require('@/assets/index/3.png'),
                        num: 231,
                    },
                    {
                        name: '正常数量',
                        img: require('@/assets/index/4.png'),
                        num: 12810,
                    }
                ],
                errorList: [
                    {
                        id: "wfg957",
                        desc: "水压异常",
                        address: "福田区XX路15",
                        contact: "王长贵",
                    },
                    {
                        id: "wfg957",
                        desc: "水压异常",
                        address: "福田区XX路15",
                        contact: "王长贵",
                    },
                    {
                        id: "wfg957",
                        desc: "水压异常",
                        address: "福田区XX路15",
                        contact: "王长贵",
                    },
                    {
                        id: "wfg957",
                        desc: "水压异常",
                        address: "福田区XX路15",
                        contact: "王长贵",
                    },
                    {
                        id: "wfg957",
                        desc: "水压异常",
                        address: "福田区XX路15",
                        contact: "王长贵",
                    },
                    {
                        id: "wfg957",
                        desc: "水压异常",
                        address: "福田区XX路15",
                        contact: "王长贵",
                    },
                    {
                        id: "wfg957",
                        desc: "水压异常",
                        address: "福田区XX路15",
                        contact: "王长贵",
                    },
                    {
                        id: "wfg957",
                        desc: "水压异常",
                        address: "福田区XX路15",
                        contact: "王长贵",
                    },
                ],
                startX: '',
                startY: '',
                moveEndX: '',
                moveEndY: '',
                X: '',
                Y: '',
                canScrollToBottom: true

            }
        },
        computed: {
            zoom() {
                return this.$store.getters["getZoom"];
            },
            vhToPx() {
                return this.$store.getters["vhToPx"];
            },
            vwToPx() {
                return this.$store.getters["vwToPx"];
            },
            seamlessOptions() {
                return {
                    singleHeight: ~~(this.vwToPx(7)),
                    limitMoveNum: 4,
                    waitTime: 3500
                };
            },
        },
        methods: {
            touchend(e) {
                e.preventDefault();
                this.moveEndX = e.changedTouches[0].pageX;
                this.moveEndY = e.changedTouches[0].pageY;
                let X = this.moveEndX - this.startX;
                let Y = this.moveEndY - this.startY;

                if (Math.abs(Y) > Math.abs(X) && Y > 0) {//下滑
                    if (this.canScrollToBottom) {
                        this.overflow = 'unset'
                        this.bottom = -154
                    }

                } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {// 上滑
                    this.overflow = 'scroll'
                    this.bottom = -101
                }
                const main = document.getElementById('myMain');
                if (main.scrollTop !== 0) {
                    this.canScrollToBottom = false
                } else {
                    this.canScrollToBottom = true
                }
            },
            touchmove(e) {
                this.moveEndX = e.changedTouches[0].pageX;
                this.moveEndY = e.changedTouches[0].pageY;
                this.X = this.moveEndX - this.startX;
                this.Y = this.moveEndY - this.startY;
                const main = document.getElementById('myMain')
                if (Math.abs(this.Y) > Math.abs(this.X) && this.Y > 0) {//下滑
                    main.scrollTop = main.scrollTop - Math.abs(this.Y)/10
                }
                if (Math.abs(this.Y) > Math.abs(this.X) && this.Y < 0) {// 上滑
                    console.log(this.Y);
                    main.scrollTop = main.scrollTop + Math.abs(this.Y)/10
                }
            },
            touchstart(e) {
                e.preventDefault();
                this.startX = e.changedTouches[0].pageX;
                    this.startY = e.changedTouches[0].pageY;
            },
            swipeup(e) {
                console.log('swipeup');
                this.bottom1 = -99
            },
            swipedown(e) {
                console.log('swipedown');
                this.bottom1 = -145
            },
            handleLineClick() {
                //this.bottom = this.bottom === -155 ? -101 : -155
            }
        },
        watch: {
            zoom(val) {
                console.log(val);
                this.isSecondShow = val > 15;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mobile {
        position: relative;
        z-index: 1;

        > header {
            position: fixed;
            top: 5.7vw;
            display: flex;
            width: 100vw;
            justify-content: center;

            .left {
                width: 9.8vw;
                height: 9.8vw;
                background-color: #064653;
                border-radius: 1vw;
                margin-right: 1.4vw;
            }

            .center {
                position: relative;
                width: 66.9vw;
                height: 9.8vw;
                margin-right: 1.4vw;

                input {
                    width: 100%;
                    height: 100%;
                    color: #b3b3b3;
                    background-color: #064653;
                    padding-left: 9.4vw;
                    border-radius: 1vw;
                }

                .search-icon {
                    position: absolute;
                    background-image: url("~@/assets/alarm/search.png");
                    background-size: 100% 100%;
                    left: 2.8vw;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 4.5vw;
                    height: 4.4vw;
                }
            }

            .right {
                width: 9.8vw;
                height: 9.8vw;
                background-color: #064653;
                border-radius: 1vw;
            }
        }
        .second-wrapper {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -12vw;
            display: flex;
            justify-content: space-around;
            z-index: 1;
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
            padding: 0.5vw 1vw;
            width: 77.8vw;
            height: 9.8vw;
            font-size: 3.1vw;

            .list {
                display: flex;
                align-items: center;

                &:last-child {
                    margin: 0;
                }

                img {
                    width: 5.3vw;
                    height: 6.2vw;
                    margin-right: 1.8vw;
                }
            }
        }
        main {
            position: absolute;
            width: 100%;
            z-index: 1;
            background-color: #1a2228;
            padding-top: 1.3vh;
            max-height: 84vh;
            transition: all .3s;

            .line {
                position: sticky;
                left: 50%;
                top: 0;
                transform: translateX(-50%);
                width: 9.4vw;
                height: 1.3vw;
                margin-bottom: 1.3vh;
                background-color: #3b5157;
            }

            section {
                margin: 0 auto;
                margin-bottom: 5.9vw;
                width: 88.3vw;

                &.top {
                    ul {
                        li {
                            position: relative;
                            width: 88.4vw;
                            height: 5.8vh;
                            display: flex;
                            align-items: center;
                            background-image: url("~@/assets/index/num-bg.png");
                            background-size: 100% 100%;
                            padding-left: 3.4vw;
                            margin: 0 auto 1vh auto;

                            .logo {
                                width: 9.8vw;
                                height: 9.8vw;
                                margin-right: 5.2vw;

                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }

                            .name {
                                font-size: 3.7vw;
                                margin-right: 1.7vw;
                                color: #fff;
                            }

                            .value {
                                position: absolute;
                                right: 7.4vw;
                                color: #fff;
                                font-size: 9.6vw;
                                font-weight: DINEngschrift;
                            }
                        }
                    }
                }

                &.chart-wrapper {
                    height: 20.65vh;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 1.75vh;
                    background-image: url("~@/assets/index/bg1.png");
                    background-size: 100% 100%;

                    > header {
                        height: 2.6vh;
                        line-height: 2.6vh;
                        font-size: 3.7vw;
                        padding-left: 0.7vw;
                    }

                    .pie-wrapper {
                        display: flex;
                        flex: 1;

                        .chartContainer {
                            width: 41.8vw;

                            &::before {
                                content: "";
                                width: 3.6vw;
                                height: 5.5vw;
                                background-image: url("~@/assets/index/pie-center.png");
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                transform: translate(-50%, -50%);
                                background-size: 100% 100%;
                                z-index: 1;
                            }
                        }

                        .legend {
                            flex-grow: 1;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            color: #fff;
                            font-size: 0.63vw;
                            margin-left: 0.94vw;

                            .list {
                                display: flex;
                                align-items: center;

                                .square {
                                    width: 1.4vw;
                                    height: 1.4vw;
                                    margin-right: 1.4vw;
                                }

                                .name {
                                    margin-right: 3.1vw;
                                    font-size: 3.9vw;
                                }

                                .percent {
                                    margin-right: 5vw;
                                    font-size: 3.9vw;
                                }
                                .value {
                                    font-size: 4.4vw;
                                }
                                &:nth-child(1) {
                                    .square {
                                        background: #33e2ff;
                                    }
                                }

                                &:nth-child(2) {
                                    .square {
                                        background: #ff0000;
                                    }
                                }

                                &:nth-child(3) {
                                    .square {
                                        background: #ffd506;
                                    }
                                }
                            }
                        }
                    }

                    .echarts {
                        width: 100%;
                        flex: 1;
                    }
                }

                &.bottom {
                    height: 31.6vh;
                    color: #fff;
                    background-image: url("~@/assets/index/bg2.png");
                    background-size: 100% 100%;

                    h2 {
                        font-size: 3.7vw;
                        font-weight: normal;
                        margin-left: 0.9vw;
                    }

                    .warning-wrapper {
                        header {
                            font-size: 3.1vw;
                            color: rgba(255, 255, 255, 0.6);
                            padding-left: 1.5vw;
                            margin-top: 1.7vh;
                            margin-bottom: 0.6vh;

                            span {
                                margin-right: 5.5vw;
                            }
                        }

                        .list-wrapper {
                            height: 25.4vh;
                            overflow: scroll;

                            &::-webkit-scrollbar {
                                display: none
                            }

                            .list {
                                display: flex;
                                align-items: center;
                                height: 7vw;
                                font-size: 3.1vw;
                                padding-left: 1.5vw;

                                span {
                                    &:nth-child(1) {
                                        margin-right: 7vw;
                                    }

                                    &:nth-child(2) {
                                        margin-right: 5.3vw;
                                    }

                                    &:nth-child(3) {
                                        margin-right: 6.5vw;
                                    }

                                }

                                &:nth-child(odd) {
                                    background-color: #2f444a;
                                }

                            }
                        }
                    }
                }

                &.warning {
                    > header {
                        height: 2.6vh;
                        line-height: 2.6vh;
                        font-size: 3.7vw;
                        padding-left: 0.7vw;
                    }

                    .warning-wrapper {
                        header {
                            padding-left: 1.5vw;
                            font-size: 3.1vw;

                            span {
                                margin-right: 5.5vw;

                                &:nth-child(3) {
                                    margin-right: 20.2vw;
                                }

                                &:last-child {
                                    margin: 0;
                                }
                            }
                        }

                        .list-wrapper {
                            overflow: scroll;

                            &::-webkit-scrollbar {
                                display: none
                            }

                            .list {
                                display: flex;
                                align-items: center;
                                height: 7vw;
                                font-size: 3.1vw;
                                padding-left: 1.4vw;

                                span {
                                    &:nth-child(1) {
                                        margin-right: 7vw;
                                    }

                                    &:nth-child(2) {
                                        margin-right: 5.1vw;
                                    }

                                    &:nth-child(3) {
                                        display: inline-block;
                                        width: 22.5vw;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                        margin-right: 3.9vw;
                                    }
                                }

                                &:nth-child(odd) {
                                    background-color: #2f444a;
                                }
                            }
                        }
                    }
                }

                &.percentAnalyse {
                    height: unset;
                    padding-left: 4.1vw;
                    margin-bottom: 2vw;

                    header {
                        font-size: 3.7vw;
                    }

                    ul {
                        padding: 3.4vw 0 ;
                        font-size: 3.1vw;

                        li {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 2.1vw;
                            padding-right: 3.2vw;

                            &:last-child {
                                margin: 0;
                            }
                        }
                    }

                }

                &.errorList {
                    padding: 0 4.1vw 4vw 4.1vw;
                    height: unset;
                    margin-bottom: 0;

                    header {
                        display: flex;
                        align-items: center;

                        > span {
                            border-right: 1px solid #293e43;
                        }

                        .water {
                            display: flex;
                            flex-direction: column;

                            .top {
                                text-align: center;
                                border-bottom: 1px solid #293e43;
                            }
                        }
                    }

                    .warning-wrapper {
                        .list-wrapper {
                            height: unset;
                          //  height: 44vw;
                        }
                    }

                    .pagination {
                        display: flex;
                        //margin-top: 4.1vw;

                        > div {
                            display: flex;
                            flex: 1;
                            align-items: center;
                            justify-content: center;
                            height: 7.4vw;
                            font-size: 3.1vw;
                        }

                        .left {
                            background: #094c53;
                        }

                        .center {
                            border: 1px solid #0a4b52;
                        }

                        .right {
                            background: #094c53;
                        }
                    }
                }
            }
        }
    }
</style>