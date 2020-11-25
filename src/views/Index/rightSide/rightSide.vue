<template>
    <div class="rightSide">
        <div class="chart-wrapper">
            <header>报警占比分析</header>
            <VEcharts :options="lineOptions"/>
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
                            <span>{{list.time}}</span>
                            <span v-if="list.state ===1">未处理</span>
                            <span v-if="list.state ===1">已处理</span>
                        </div>
                    </vueSeamless>

                </div>
            </div>
        </div>
        <div class="chart-wrapper">
            <header>维护人员列表</header>
            <VEcharts :options="lineOptions"/>
        </div>
    </div>
</template>

<script>
    import vueSeamless from 'vue-seamless-scroll';
    import {lineOptions} from './chartOptions';
    import VEcharts from 'vue-echarts';
    import 'echarts/lib/chart/line';

    export default {
        name: 'rightSide',
        components: {
            VEcharts, vueSeamless
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
                lineOptions
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

        .chart-wrapper {
            width: 100%;
            height: 20.65vh;
            display: flex;
            flex-direction: column;
            margin-bottom: 1.75vh;

            > header {
                height: 2.6vh;
            }

            .echarts {
                width: 100%;
                flex: 1;
            }

            .warning-wrapper {
                .list-wrapper {
                    height: 25.4vh;
                    overflow: scroll;

                    &::-webkit-scrollbar {
                        display: none
                    }

                    .list {
                        height: 2.6vh;

                        &:nth-child(odd) {
                            background-color: red;
                        }
                    }
                }
            }
        }
    }
</style>
