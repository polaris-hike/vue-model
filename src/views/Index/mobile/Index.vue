<template>
    <div class="mobile">
        <header>
            <div class="left"></div>
            <div class="center">
                <i class="search-icon"></i>
                <input class="search" type="text" placeholder="请输入关键字" />
            </div>
            <div class="right"></div>
        </header>
        <v-touch  @swipeup="swipeup" @swipedown="swipedown">
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

        </v-touch>
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
          ],
      }
    },
      computed: {
          vhToPx() {
              return this.$store.getters["vhToPx"];
          },
          seamlessOptions() {
              return {
                  singleHeight: ~~(this.vhToPx(2.6)),
                  limitMoveNum: 4,
                  waitTime: 3500
              };
          },
      },
    methods: {
        swipeup(e){
            console.log('swipeup');
            console.log(e);
            this.bottom = -101
        },
        swipedown(e){
            console.log('swipedown');
            console.log(e);
            this.bottom = -155
        },
      handleLineClick() {
        //this.bottom = this.bottom === -155 ? -101 : -155
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
                background-color: #3b5157;
            }
            section {
                margin: 0 auto;
                margin-bottom: 1.4vh;
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
                                }
                                .percent {
                                    margin-right: 5vw;
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
                                height: 2.6vh;
                                font-size: 0.6vw;
                                padding-left: 1.5vw;
                                span {
                                    &:nth-child(1){
                                        margin-right: 7vw;
                                    }
                                    &:nth-child(2){
                                        margin-right: 5.3vw;
                                    }
                                    &:nth-child(3){
                                        margin-right: 6.5vw;
                                    }

                                }

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
                                margin-right: 5.5vw;
                                &:nth-child(3){
                                    margin-right:20.2vw;
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
                                        margin-right: 7vw;
                                    }
                                    &:nth-child(2){
                                        margin-right: 5.1vw;
                                    }
                                    &:nth-child(3){
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