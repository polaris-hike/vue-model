<template>
  <div class="alarm-wrapper">
    <header>
      <input type="text" placeholder="省份" />
      <input type="text" placeholder="城市" />
      <input type="text" placeholder="区域" />
      <input type="text" placeholder="状态" />
      <input type="text" placeholder="日期" />
      <div class="input-wrapper">
        <i class="search-icon"></i>
        <input class="search" type="text" placeholder="请输入关键字" />
      </div>
      <div class="confirm">确认</div>
    </header>
    <main>
      <header>
        <span>挂牌编号</span>
        <span>SN码</span>
        <span>地址</span>
        <div class="state">
          <div class="top">状态</div>
          <div class="bottom">
            <span>停用</span>
            <span>正常</span>
            <span>撞到</span>
            <span>非法用水</span>
            <span>水压异常</span>
            <span>电压异常</span>
            <span>事件时间</span>
          </div>
        </div>
        <div class="water-gage">
          <div class="top">水压</div>
          <div class="bottom">
            <span style="width: 4.7vw">水压(Mpa)</span>
            <span style="width: 5.4vw">采集时间</span>
            <span style="width: 5.1vw">接受时间</span>
          </div>
        </div>
        <span style="width: 5.5vw">维护人员</span>
      </header>
      <ul class="alarmList-wrapper">
        <li v-for="(item, index) in alarmList" :key="index">
          <span>{{ item.id }}</span>
          <span>{{ item.sn }}</span>
          <span>{{ item.address }}</span>
          <span style="width: 6.2vw">{{ item.stopUse }}</span>
          <span style="width: 6.2vw">{{ item.normal }}</span>
          <span style="width: 6.2vw">{{ item.knockDown }}</span>
          <span style="width: 6.2vw">{{ item.illegalWaterUse }}</span>
          <span style="width: 6.2vw">{{ item.abnormalWaterPressure }}</span>
          <span style="width: 6.2vw">{{ item.abnormalVoltage }}</span>
          <span style="width: 6.2vw">{{ item.eventTime }}</span>
          <span style="width: 5.7vw">{{ item.sleepCircle }}</span>
          <span style="width: 5.4vw">{{ item.pressureCollectionCycle }}</span>
          <span style="width: 5.1vw">{{ item.maxPressureAlarm }}</span>
          <span style="width: 5.5vw">{{ item.people }}</span>
        </li>
      </ul>
    </main>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataOverview",
  data() {
    return {
      pageSize: 15,
      total: 0,
      currentPage: 1,
      alarmList: [
        {
          id: 11877495581,
          sn: "WG54991",
          address: "高新技术产业园区南区科苑南路综合服务楼",
          stopUse: 1,
          normal: 1,
          knockDown: 1,
          illegalWaterUse: 1,
          abnormalWaterPressure: 1,
          abnormalVoltage: 1,
          eventTime: "11/08 12：55",
          sleepCircle: "10.00MPa",
          pressureCollectionCycle: "10.00MPa",
          maxPressureAlarm: "11/08 12：55",
          minPressureAlarm: "11/08 12：55",
          people: "王维维",
        },
        {
          id: 11877495581,
          sn: "WG54991",
          address: "高新技术产业园区南区科苑南路综合服务楼",
          stopUse: 1,
          normal: 1,
          knockDown: 1,
          illegalWaterUse: 1,
          abnormalWaterPressure: 1,
          abnormalVoltage: 1,
          eventTime: "11/08 12：55",
          sleepCircle: "10.00MPa",
          pressureCollectionCycle: "10.00MPa",
          maxPressureAlarm: "11/08 12：55",
          minPressureAlarm: "11/08 12：55",
          people: "王维维",
        },
      ],
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss"
       scoped>
.alarm-wrapper {
  position: relative;
  padding: 3.2vh 2.4vw 0 2.4vw;
  height: 92.9vh;
  > header {
    display: flex;
    margin-bottom: 4.1vh;
    input {
      width: 10.6vw;
      margin-right: 0.8vw;
      height: 3.7vh;
      color: #b3b3b3;
      background-color: #0f1f24;
      padding-left: 0.7vw;
      border: 1px solid #0c474c;
      outline: none;
      &.search {
        width: 12.4vw;
        &::after {
          content: "";
          display: block;
          width: 1vw;
          height: 1vw;
          background-color: red;
        }
      }
    }
    .input-wrapper {
      position: relative;
      width: 12.4vw;
      height: 3.7vh;
      margin-right: 0.8vw;
      input {
        height: 100%;
      }
      .search-icon {
        position: absolute;
        background-image: url("~@/assets/alarm/search.png");
        background-size: 100% 100%;
        right: 0.5vw;
        top: 50%;
        transform: translateY(-50%);
        width: 0.9vw;
        height: 0.9vw;
      }
    }
    .confirm {
      width: 5.9vw;
      height: 2.1vw;
      line-height: 2.1vw;
      text-align: center;
      background-color: #1e4b6d;
      border: 1px solid #17fff3;
      font-size: 0.7vw;
      cursor: pointer;
    }
  }
  main {
    > header {
      display: flex;
      font-size: 0.9vw;
      height: 7.5vh;
      .state {
        width: 43.2vw;
        border-right: 1px solid #303f42;
        padding: 0 0.7vw;
        .top {
          text-align: center;
          border-bottom: 1px solid #303f42;
          height: 50%;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          height: 50%;
          > span {
            text-align: center;
            border-right: 1px solid #303f42;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
            &:last-child {
              border: none;
            }
          }
        }
      }
      .water-gage {
        border-right: 1px solid #303f42;
        padding: 0 0.7vw;
        .top {
          text-align: center;
          border-bottom: 1px solid #303f42;
          height: 50%;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          font-size: 0.9vw;
          height: 50%;
          > span {
            text-align: center;
            border-right: 1px solid #303f42;
            display: flex;
            align-items: center;
            justify-content: center;
            &:last-child {
              border: none;
            }
          }
        }
      }
      > span {
        border-right: 1px solid #303f42;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        &:last-child {
          border: none;
        }
        &:nth-child(1) {
          width: 6.6vw;
        }
        &:nth-child(2) {
          width: 6.6vw;
        }
        &:nth-child(3) {
          width: 14.8vw;
        }
      }
    }
    .alarmList-wrapper {
      font-size: 0.7vw;
      > li {
        display: flex;
        align-items: center;
        height: 4.2vh;
        &:nth-child(even) {
          background-color: #29393e;
        }
        span {
          display: inline-block;
          text-align: center;
          &:nth-child(1) {
            width: 6.6vw;
          }
          &:nth-child(2) {
            width: 6.6vw;
          }
          &:nth-child(3) {
            width: 14.8vw;
          }
        }
      }
    }
  }
  .pagination {
    position: absolute;
    bottom: 9vh;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
<style src="../../assets/style/element.css">
</style>
