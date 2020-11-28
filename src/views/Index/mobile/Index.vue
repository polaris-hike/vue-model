<template>
    <div class="mobile">
        <header></header>
        <main :style="{bottom:bottom+'vh'}" @click="handleLineClick">
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
                            <span>{{item.name}}</span>
                            <span>{{item.percent}}</span>
                            <span>{{item.value}}</span>
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
            <section class="warning">
                <header>故障列表</header>
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
                                 v-for="(list,index) in warningList">
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
    </div>
</template>

<script>
  import vueSeamless from 'vue-seamless-scroll';
    import customizedPie from "../../../components/customizedPie";
    import {pieOption} from '../rightSide/chartOptions';
  import VEcharts from 'vue-echarts';
  import 'echarts/lib/chart/line';
  export default {
    name: "Index",
    components:{
      customizedPie,
      vueSeamless,VEcharts
    },
    data() {
      return {
        warningList: [
          {
            id: 'wfg957',
            desc: '水压异常',
            address: '福田区XX路15',
            contact: '王长贵'
          },
          {
            id: 'wfg957',
            desc: '水压异常',
            address: '福田区XX路15',
            contact: '王长贵'
          },
          {
            id: 'wfg957',
            desc: '水压异常',
            address: '福田区XX路15',
            contact: '王长贵'
          },
          {
            id: 'wfg957',
            desc: '水压异常',
            address: '福田区XX路15',
            contact: '王长贵'
          },
          {
            id: 'wfg957',
            desc: '水压异常',
            address: '福田区XX路15',
            contact: '王长贵'
          },
          {
            id: 'wfg957',
            desc: '水压异常',
            address: '福田区XX路15',
            contact: '王长贵'
          },
          {
            id: 'wfg957',
            desc: '水压异常',
            address: '福田区XX路15',
            contact: '王长贵'
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
        bottom: -155,
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
      }
    },
    computed: {
      seamlessOptions() {
        return {
          step: 0.5,
          limitMoveNum: 5
        };
      }
    },
    methods: {
      handleLineClick() {
        this.bottom = this.bottom === -155 ? -101 : -155
      }
    }
  }
</script>

<style lang="scss" scoped>
    .mobile {
        position: relative;
        z-index: 1;
        header {
        }
        main {
            position: absolute;
            width: 100%;
            z-index: 1;
            background-color: #1a2228;
            padding-top: 1.3vh;
            max-height: 84vh;
            transition: all .3s;
            overflow: scroll;
            .line {
                position: sticky;
                left: 50%;
                top: 0;
                transform: translateX(-50%);
                width: 9.4vw;
                height: 1.3vw;
                background-color: #3b5157;
            }
            section {
                margin-bottom: 1.4vh;
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
                                font-size: 0.7vw;
                                margin-right: 1.7vw;
                                color: #fff;
                            }
                            .value {
                                position: absolute;
                                right: 7.4vw;
                                color: #fff;
                                font-size: 1.9vw;
                                font-weight: DINEngschrift;
                            }
                        }
                    }
                }
                &.chart-wrapper {
                    width: 100%;
                    height: 20.65vh;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 1.75vh;
                    background-image: url("~@/assets/index/bg1.png");
                    background-size: 100% 100%;
                    > header {
                        height: 2.6vh;
                        line-height: 2.6vh;
                        font-size: 0.7vw;
                        padding-left: 0.7vw;
                    }
                    .pie-wrapper {
                        display: flex;
                        flex: 1;
                        .legend {
                            flex-grow: 1;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            color: #fff;
                            font-size: 0.63vw;
                            margin-left: 0.94vw;
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
                        font-size: 0.7vw;
                        font-weight: normal;
                        margin-left: 0.9vw;
                    }

                    .warning-wrapper {
                        header {
                            font-size: 0.6vw;
                            color: rgba(255,255,255,0.6);
                            padding-left: 1.5vw;
                            margin-top: 1.7vh;
                            margin-bottom: 0.6vh;
                            span {
                                margin-right: 1vw;
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
                                justify-content: space-between;
                                height: 2.6vh;
                                font-size: 0.6vw;
                                padding-left: 1.5vw;

                                &:nth-child(odd){
                                    background-color: #2f444a;
                                }

                            }
                        }
                    }
                }
                &.warning{
                    > header {
                        height: 2.6vh;
                        line-height: 2.6vh;
                        font-size: 0.7vw;
                        padding-left: 0.7vw;
                    }
                    .warning-wrapper {
                        header {
                            padding-left: 1.5vw;
                            font-size: 0.6vw;
                            span {
                                margin-right: 1vw;
                                &:nth-child(3){
                                    margin-right:3.8vw;
                                }
                                &:last-child {
                                    margin: 0;
                                }
                            }
                        }
                        .list-wrapper {
                            height: 15.7vh;
                            overflow: scroll;
                            &::-webkit-scrollbar {
                                display: none
                            }
                            .list {
                                display: flex;
                                align-items: center;
                                height: 2.6vh;
                                font-size: 0.6vw;
                                padding-left: 1.4vw;
                                span{
                                    &:nth-child(1){
                                        margin-right: 1.3vw;
                                    }
                                    &:nth-child(2){
                                        margin-right: 1.3vw;
                                    }
                                    &:nth-child(3){
                                        display: inline-block;
                                        width: 4.5vw;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;
                                        margin-right: 0.6vw;
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