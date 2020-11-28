<template>
    <div class="rightSide">
        <div class="chart-wrapper">
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
        </div>
        <div class="chart-wrapper">
            <header>七天报警趋势</header>
            <VEcharts :options="lineOptions"/>
        </div>
        <div class="chart-wrapper">
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
        </div>
        <div class="chart-wrapper">
            <header>维护人员列表</header>
            <ul class="people-wrapper">
                <li v-for="(item,index) in peopleList" :key="index">
                    <div class="img">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="people-info">
                        <span>{{item.name}}</span>
                        <span>{{item.address}}</span>
                        <span>{{item.phone}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  import vueSeamless from 'vue-seamless-scroll';
  import customizedPie from "../../../components/customizedPie";
  import {lineOptions, pieOption} from './chartOptions';
  import VEcharts from 'vue-echarts';
  import 'echarts/lib/chart/line';

  export default {
    name: 'rightSide',
    components: {
      VEcharts, vueSeamless,
      customizedPie
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
        lineOptions,
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
        peopleList:[
          {
            img:'',
            name:'王长春',
            address:'福田区XX路150号西XXXXX',
            phone:13826621882
          },
          {
            img:'',
            name:'王长春',
            address:'福田区XX路150号西XXXXX',
            phone:13826621882
          },
          {
            img:'',
            name:'王长春',
            address:'福田区XX路150号西XXXXX',
            phone:13826621882
          }
        ]
      };
    },
    computed: {
      seamlessOptions() {
        return {
          step: 0.5,
          limitMoveNum: 5
        };
      }
    }
  };
</script>

<style lang="scss"
       scoped>



    .rightSide {
        position: absolute;
        right: 1.1vw;
        width: 17.2vw;
        color: #fff;
        .chart-wrapper {
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
            .people-wrapper {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                font-size: 0.5vw;
                padding-left: 1.6vw;
                > li {
                    display: flex;
                    align-items: center;
                    .img {
                        width: 2.3vw;
                        height: 2.3vw;
                        border: 1px solid red;
                        margin-right: 1.1vw;
                    }
                    .people-info {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                    }
                }
            }
        }
    }
</style>
