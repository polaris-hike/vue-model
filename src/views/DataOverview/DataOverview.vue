<template>
  <div class="alarm-wrapper">
    <header>
      <chinaArea @setAreaData="setAreaData"/>
      <el-date-picker
              v-model="date"
              type="daterange"
              :range-separator="rangeSeparator"
              start-placeholder="日期"
             >
      </el-date-picker>
      <div class="input-wrapper">
        <i class="search-icon"></i>
        <input class="search" type="text" placeholder="请输入关键字" v-model="searchValue"/>
      </div>
      <div class="confirm" @click="search">确认</div>
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
          <span>{{ item.listing_number }}</span>
          <span>{{ item.sn }}</span>
          <span>{{ item.address }}</span>
          <span style="width: 6.2vw">{{ item.stopUse }}</span>
          <span style="width: 6.2vw">{{ item.normal }}</span>
          <span style="width: 6.2vw">{{ item.knockDown }}</span>
          <span style="width: 6.2vw">{{ item.illegalWaterUse }}</span>
          <span style="width: 6.2vw">{{ item.abnormalWaterPressure }}</span>
          <span style="width: 6.2vw">{{ item.abnormalVoltage }}</span>
          <span style="width: 6.2vw">{{ item.eventTime }}</span>
          <span style="width: 5.7vw">{{ item.press }}</span>
          <span style="width: 5.4vw">{{ item.pressureCollectionCycle }}</span>
          <span style="width: 5.1vw">{{ item.maxPressureAlarm }}</span>
          <span style="width: 5.5vw">{{ item.name }}</span>
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
  import chinaArea from "../../components/chinaArea";
export default {
  name: "DataOverview",
  data() {
    return {
      rangeSeparator:'',
      date:'',
      pageSize: 15,
      total: 0,
      currentPage: 1,
      alarmList: [
      ],
      area:{},
      searchValue:'',
      status:''
    };
  },
  components:{
    chinaArea
  },
  methods: {
    setAreaData(data){
      this.area = data
    },
    search(){
      this.$get('/api/v1/dataOverview',{
        province:this.area.prov,
        city:this.area.city,
        area:this.area.district,
        status:this.status? this.status :undefined,
        search:this.searchValue,
        datetime:this.date ? this.date :undefined
      }).then(res=>{
        this.alarmList = res.data
      })
    },
    handleCurrentChange(val) {
      this.getData(val)
    },
    getData(page){
      let url = "/api/v1/dataOverview";
      if (page) {
        url = url + `?page=${page}`;
      }
      this.$get(url).then(res=>{
        this.alarmList = res.data
      })
    }
  },
  mounted() {
    this.getData()
  },
  watch:{
    date(val){
      if(val){
        this.rangeSeparator = '-'
      }else{
        this.rangeSeparator = ''
      }
    }
  }
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
    ::v-deep .el-date-editor{
      width: 14vw;
      background: #0f1f24;
      border-radius: 0;
	  margin-right:0.8vw;
      input {
        background: #0f1f24;
        width: 5vw;
        color: #fff;
      }
      .el-range-separator {
        display: flex;
        align-items: center;
        color: #fff;
        margin-right: 5px;
      }
      .el-range__close-icon {
        display: flex;
        align-items: center;
      }
      .el-range__icon {
        position: absolute;
        right: 0.6vw;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1896a1;
      }
    }
    input {
      width: 10.6vw;
      margin-right: 0.8vw;
      height: 3.7vh;
      color: #b3b3b3;
      background-color: #0f1f24;
      padding-left: 0.7vw;
      border: 1px solid #1e6f85;
      outline: none!important;
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
      height: 3.7vh;
      line-height: 3.7vh;
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
<style>
  .el-date-picker__time-header {
    border-bottom: 1px solid #00ffff;
  }
  .el-picker-panel__footer {
    border-top: 1px solid #00ffff;
  }

  .el-date-range-picker__content.is-left {
    border-right: 1px solid #00ffff;
  }
  .el-picker-panel {
    border: 1px solid #00ffff;
  }
  .el-picker-panel__body-wrapper {
    background-color: #020b0c;
  }
  .el-date-table td {
    color: #fff;
  }
  .el-date-range-picker__content .el-date-range-picker__header div {
    color: #fff;
  }
  .el-date-table th {
    color: #00ffff;
    border-bottom: 1px solid #00ffff;
  }
  .el-picker-panel__icon-btn {
    color: #00ffff;
  }
  .el-date-table td.today {
    background-color: #00ffff;
    border-radius: 50%;
  span {
    color: #000000;
  }
  }
  .el-date-table td.in-range div,
  .el-date-table td.in-range div:hover,
  .el-date-table.is-week-mode .el-date-table__row.current div,
  .el-date-table.is-week-mode .el-date-table__row:hover div {
    background-color: rgba(0, 255, 255, 0.2);
  }
  .el-date-table td.end-date span,
  .el-date-table td.start-date span {
    background-color: #00ffff;
    color: #000000;
    width: 31px;
    height: 28px;
  }
  .el-picker-panel__footer {
    background-color: #020b0c;
  }
  .el-date-picker__header-label {
    color: #ffffff;
  }
  .el-time-panel {
    background-color: #020b0c;
  }
  .el-time-spinner__item {
    color: #fff;
  }
  .el-time-spinner__item.active:not(.disabled) {
    color: #00ffff;
  }
  .el-time-spinner__item:hover:not(.disabled):not(.active) {
    background-color: unset;
  }
</style>
<style src="../../assets/style/element.css">
</style>
