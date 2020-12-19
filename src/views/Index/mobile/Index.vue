<template>
    <div class="mobile">
        <header>
            <div class="left" @click="handleHomeClick">
                <img src="@/assets/index/home.png" alt="">
            </div>
            <div class="center">
                <i class="search-icon"></i>
                <input v-model="search" class="search" type="text" placeholder="请输入关键字"/>
            </div>
            <div class="right" @click="handleSearchClick">
                <img src="@/assets/index/search.png" alt="">
            </div>
        </header>

        <!-- 首页 -->
        <main v-show="!isSecondShow" id="myMain" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
              :style="{bottom:bottom+'vh',overflow:overflow}">
            <div class="line" @click="handleLineClick"></div>
            <div class="index" v-show="!searchContentShow">
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
                                    <span>{{list.listing_number}}</span>
                                    <span>{{list.describe}}</span>
                                    <span>{{list.created_at}}</span>
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
                                    <span>{{ list.listing_number }}</span>
                                    <span>{{ list.describe }}</span>
                                    <span>{{ list.address }}</span>
                                    <span>{{ list.name }}</span>
                                </div>
                            </vueSeamless>
                        </div>
                    </div>
                </section>
            </div>
            <Search v-show="searchContentShow" :searchList="searchList" />
        </main>

        <MapDetail v-show="isSecondShow" @setIsSecondShow="setIsSecondShow"/>
    </div>
</template>

<script>
    import vueSeamless from 'vue-seamless-scroll';
    import customizedPie from '../../../components/customizedPie';
    import {pieOption} from '../rightSide/chartOptions';
    import VEcharts from 'vue-echarts';
    import 'echarts/lib/chart/line';
    import MapDetail from "./MapDetail";
    import Search from "./Search";

    const img = {
        error: require('@/assets/index/error.png'),
        warn: require('@/assets/index/warn.png'),
        stop: require('@/assets/index/stop.png'),
        normal: require('@/assets/index/normal.png'),
    };
    export default {
        name: 'Index',
        components: {
            customizedPie,
            vueSeamless,
            VEcharts,
            MapDetail,
            Search
        },
        data() {
            return {
                search: '',
                searchContentShow: false,
                isSecondShow: false,
                overflow: 'unset',
                warningList: [],
                pieOption,
                legendList: [
                    {
                        name: '非法用水',
                        percent: '55%',
                        value: 291
                    },
                    {
                        name: '水压异常',
                        percent: '25%',
                        value: 112
                    },
                    {
                        name: '电压异常',
                        percent: '20%',
                        value: 89
                    }
                ],
                bottom: -146,
                numList: [
                    {
                        name: '消防栓数量',
                        img: require('@/assets/index/1.png'),
                        num: 0,
                    },
                    {
                        name: '正常数量',
                        img: require('@/assets/index/5.png'),
                        num: 0,
                    },
                    {
                        name: '离线数量',
                        img: require('@/assets/index/2.png'),
                        num: 0,
                    },
                    {
                        name: '报警数量',
                        img: require('@/assets/index/3.png'),
                        num: 0,
                    },
                    {
                        name: '停用数量',
                        img: require('@/assets/index/4.png'),
                        num: 0,
                    },

                ],
                errorList: [],
                searchList:[],
                startX: '',
                startY: '',
                moveEndX: '',
                moveEndY: '',
                X: '',
                Y: '',
                canScrollToBottom: true,
            };
        },
        computed: {

            zoom() {
                return this.$store.getters['getZoom'];
            },
            vhToPx() {
                return this.$store.getters['vhToPx'];
            },
            vwToPx() {
                return this.$store.getters['vwToPx'];
            },
            seamlessOptions() {
                return {
                    singleHeight: ~~(this.vwToPx(7)),
                    limitMoveNum: 4,
                    waitTime: 3500
                };
            },
        },
        mounted() {
            this.getNumList();
            this.getHomeCallThePolice();
            this.getHomeFault();
        },
        methods: {
            setIsSecondShow(){
                this.isSecondShow = true
            },
            handleSearchClick() {
                this.$get('/api/v1/equipmentSearch', {
                    screen: this.search
                }).then(res => {
                    this.searchList = res.data;
                    this.isSecondShow = false;
                    this.searchContentShow = true;
                }).catch(err => {
                    console.log(err);
                });
            },
            handleHomeClick() {
                this.searchContentShow = false;
                this.isSecondShow = false;
            },
            getHomeFault() {
                this.$get('/api/v1/homeFault').then(res => {
                    this.errorList = res.data;
                });
            },
            getHomeCallThePolice() {
                this.$get('/api/v1/homeCallThePolice').then(res => {
                    this.warningList = res.data;
                });
            },
            getNumList() {
                this.$get('/api/v1/number').then(res => {
                    this.numList[0].num = res.data.count;
                    this.numList[1].num = res.data.normal;
                    this.numList[2].num = res.data.fault;
                    this.numList[3].num = res.data.callThePolice;
                    this.numList[4].num = res.data.stop;
                });
            },
            touchend(e) {
                e.preventDefault();
                this.moveEndX = e.changedTouches[0].pageX;
                this.moveEndY = e.changedTouches[0].pageY;
                let X = this.moveEndX - this.startX;
                let Y = this.moveEndY - this.startY;

                if (Math.abs(Y) > Math.abs(X) && Y > 0) {//下滑
                    if (this.canScrollToBottom) {
                        this.overflow = 'unset';
                        this.bottom = -146;
                    }

                } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {// 上滑
                    this.overflow = 'scroll';
                    this.bottom = -101;
                }
                const main = document.getElementById('myMain');
                if (main.scrollTop !== 0) {
                    this.canScrollToBottom = false;
                } else {
                    this.canScrollToBottom = true;
                }
            },
            touchmove(e) {
                this.moveEndX = e.changedTouches[0].pageX;
                this.moveEndY = e.changedTouches[0].pageY;
                this.X = this.moveEndX - this.startX;
                this.Y = this.moveEndY - this.startY;
                const main = document.getElementById('myMain');
                if (Math.abs(this.Y) > Math.abs(this.X) && this.Y > 0) {//下滑
                    main.scrollTop = main.scrollTop - Math.abs(this.Y) / 10;
                }
                if (Math.abs(this.Y) > Math.abs(this.X) && this.Y < 0) {// 上滑
                    main.scrollTop = main.scrollTop + Math.abs(this.Y) / 10;
                }
            },
            touchstart(e) {
                e.preventDefault();
                this.startX = e.changedTouches[0].pageX;
                this.startY = e.changedTouches[0].pageY;
            },
            handleLineClick() {
                //this.bottom = this.bottom === -155 ? -101 : -155
            }
        },
        watch: {
            zoom(val) {
                this.isSecondShow = val > 15;
            },
        }
    };
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
                text-align: center;

                img {
                    width: 6.4vw;
                    height: 6.4vw;
                    margin-top: 1.7vw;
                }
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
                display: flex;
                align-items: center;
                justify-content: center;
                width: 9.8vw;
                height: 9.8vw;
                background-color: #064653;
                border-radius: 1vw;

                img {
                    width: 5.5vw;
                    height: 5.5vw;
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
                                font-size: 8.6vw;
                                font-family: DM;
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

            }
        }
    }
</style>