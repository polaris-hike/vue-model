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
            <VEcharts :options="lineOptions"/>
        </div>
        <div class="chart-wrapper">
            <header>维护人员列表</header>
            <VEcharts :options="lineOptions"/>
        </div>
    </div>
</template>

<script>
  import {lineOptions} from "./chartOptions";
  import VEcharts from 'vue-echarts'
  import 'echarts/lib/chart/line'

  export default {
    name: "rightSide",
    components:{
      VEcharts
    },
    data(){
      return {
        lineOptions
      }
    }
  }
</script>

<style lang="scss" scoped>
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
            header {
                height: 2.6vh;
            }
            .echarts {
                width: 100%;
                flex: 1;
            }
        }
    }
</style>