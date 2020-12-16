<template>
  <div class="rightSide">
    <div class="chart-wrapper">
      <header>报警占比分析</header>
      <div class="pie-wrapper">
        <customizedPie class="pie" :options="pieOption">
          <template v-slot:label="labelData">
            <span class="label allCenter2">
              <span class="percent DM">{{ labelData.labelPercent }}</span>
              <span class="labelName">{{ labelData.labelName }}</span>
            </span>
          </template>
        </customizedPie>
        <div class="legend">
          <div class="list" v-for="(item, index) in legendList" :key="index">
            <div class="square"></div>
            <span class="name">{{ item.name }}</span>
            <span class="percent">{{ item.percent }}</span>
            <span class="value">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-wrapper">
      <header>七天报警趋势</header>
      <VEcharts :options="lineOptions" />
    </div>
    <div class="chart-wrapper">
      <header>离线列表</header>
      <div class="warning-wrapper">
        <header>
          <span>挂牌编号</span>
          <span>报警描述</span>
          <span>地址</span>
          <span>联系人</span>
        </header>
        <div class="list-wrapper">
          <vueSeamless :class-option="seamlessOptions" :data="warningList">
            <div :key="index" class="list" v-for="(list, index) in warningList">
              <span>{{ list.listing_number }}</span>
              <span>{{ list.describe }}</span>
              <span>{{ list.address }}</span>
              <span>{{ list.name }}</span>
            </div>
          </vueSeamless>
        </div>
      </div>
    </div>
    <div class="chart-wrapper">
      <header>维护人员列表</header>
      <ul class="people-wrapper">
        <li v-for="(item, index) in peopleList" :key="index">
          <div class="img">
            <img v-if='item.avatar!=""' :src="item.avatar" alt="" />
			 <img v-if='item.avatar==""' src="@/assets/index/people.png" alt="" />
          </div>
          <div class="people-info">
            <span>{{ item.name }}</span>
            <span>{{ item.area }}</span>
            <span>{{ item.phone }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import vueSeamless from "vue-seamless-scroll";
import customizedPie from "../../../components/customizedPie";
import { lineOptions, pieOption } from "./chartOptions";
import VEcharts from "vue-echarts";
import "echarts/lib/chart/line";

export default {
  name: "rightSide",
  components: {
    VEcharts,
    vueSeamless,
    customizedPie,
  },
  data() {
    return {
      warningList: [],
      lineOptions,
      pieOption,
      legendList: [
        {
          name: "非法用水",
          percent: "55%",
          value: 291,
        },
        {
          name: "水压异常",
          percent: "25%",
          value: 112,
        },
        {
          name: "电压异常",
          percent: "20%",
          value: 89,
        },
      ],
      peopleList: [],
    };
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
  methods:{
    getSevenDaysAlarm(){
      this.$get('/api/v1/sevenDaysAlarm').then(res=>{
        const seriesValue = [];
        const xAxisData = [];
        res.data.forEach((item)=>{
          xAxisData.push(item.date)
          seriesValue.push(item.value)
        })
        this.lineOptions.xAxis.data = xAxisData
        this.lineOptions.series[0].data = seriesValue
      })
    },
    getProportionAlarms(){
      this.$get('/api/v1/proportionAlarms').then(res=>{
        let total = 0
        res.data.reduce((totalPrice, item) => totalPrice + item.value, 0)
        res.data.forEach((item,index)=>{
          this.pieOption.series[0].data[index].name = item.name
          this.pieOption.series[0].data[index].value = item.value
          this.pieOption.series[1].data[index].name = item.name
          this.pieOption.series[2].data[index].value = item.value
          const percent = (item.value/total)*100 + '%'
          this.legendList[index].name = item.name
          this.legendList[index].value = item.value
          this.legendList[index].percent = percent
        })
      })
    },
    getHomeFault(){
      this.$get('/api/v1/homeFault').then(res=>{
        this.warningList = res.data
      })
    },
    getMaintainer(){
      this.$get('/api/v1/maintainer').then(res=>{
        this.peopleList = res.data
      })
    }
  },
  mounted() {
    this.getSevenDaysAlarm();
    this.getProportionAlarms();
    this.getHomeFault();
    this.getMaintainer();
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
      .pie {
        &::before {
          content: "";
          width: 0.7vw;
          height: 1.1vw;
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
		padding-top:7.5%;
		padding-bottom:7.5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        font-size: 0.63vw;
        .list {
          display: flex;
          align-items: center;
		  flex-grow: 1;
          .square {
            width: 0.3vw;
            height: 0.3vw;
            margin-right: 0.2vw;
          }
          .name {
            margin-right: 0.5vw;
          }
          .percent {
            margin-right: 1.3vw;
          }
          &:nth-child(1) {
            .square {
              background: #ffffff;
            }
          }
          &:nth-child(2) {
            .square {
              background: #ff0000;
            }
          }
          &:nth-child(3) {
            .square {
              background: #f2c860;
            }
          }
        }
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
          &:nth-child(3) {
            margin-right: 3.8vw;
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
          display: none;
        }
        .list {
          display: flex;
          align-items: center;
          height: 2.6vh;
          font-size: 0.6vw;
          padding-left: 1.4vw;
          span {
            &:nth-child(1) {
              margin-right: 1.3vw;
            }
            &:nth-child(2) {
              margin-right: 1.3vw;
            }
            &:nth-child(3) {
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
	&:nth-child(4){
		margin-bottom:0;
		height:22.4vh;
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
          margin-right: 1.1vw;
		  border: 1px solid #044a50;
          img {
            width: 100%;
            height: 100%;
          }
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
