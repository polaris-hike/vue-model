<template>
  <div class="alarm-wrapper">
    <header>
      <div class="top">
        <div class="small" @click="isCreateShow = true">+ 新建</div>
        <div class="small">导出</div>
        <div class="small">导入</div>
        <div class="small" @click="isSleepShow = true">休眠周期设置</div>
        <div class="big">压力采集周期设置</div>
        <div class="big">压力报警上限设置</div>
        <div class="big">压力报警下限设置</div>
      </div>
      <div class="bottom">
        <div class="left">
          <input type="text" placeholder="省份" />
          <input type="text" placeholder="城市" />
          <input type="text" placeholder="区域" />
        </div>
        <div class="right">
          <div class="input-wrapper">
            <i class="search-icon"></i>
            <input class="search" type="text" placeholder="请输入关键字" />
          </div>
          <div class="confirm">确认</div>
        </div>
      </div>

    </header>
    <main>
      <header>
        <span>挂牌编号</span>
        <span>SN码</span>
        <span>地址</span>
        <div class="state">
          <div class="top">状态</div>
          <div class="bottom">
            <span style="width: 3.3vw">停用</span>
            <span style="width: 3vw">正常</span>
            <span style="width: 3vw">撞到</span>
            <span style="width: 4.8vw">非法用水</span>
            <span style="width: 4.8vw">水压异常</span>
            <span style="width: 4.8vw">电压异常</span>
            <span style="width: 4.8vw">事件时间</span>
          </div>
        </div>
        <div class="water-gage">
          <div class="top">水压</div>
          <div class="bottom">
            <span style="width: 4.7vw">休眠周期</span>
            <span style="width: 5.4vw">压力采集周期</span>
            <span style="width: 5.1vw">压力报警上限</span>
            <span style="width: 5.5vw">压力报警下限</span>
          </div>
        </div>
        <span class="people">负责人</span>
        <span class="operation">操作</span>
      </header>
      <ul class="alarmList-wrapper">
        <li v-for="(item, index) in alarmList" :key="index">
          <span>{{ item.id }}</span>
          <span>{{ item.sn }}</span>
          <span>{{ item.address }}</span>
          <span style="width: 3.3vw">{{ item.stopUse }}</span>
          <span style="width: 3vw">{{ item.normal }}</span>
          <span style="width: 3vw">{{ item.knockDown }}</span>
          <span style="width: 4.8vw">{{ item.illegalWaterUse }}</span>
          <span style="width: 4.8vw">{{ item.abnormalWaterPressure }}</span>
          <span style="width: 4.8vw">{{ item.abnormalVoltage }}</span>
          <span style="width: 4.8vw">{{ item.eventTime }}</span>
          <span style="width: 4.7vw">{{ item.sleepCircle }}</span>
          <span style="width: 5.4vw">{{ item.pressureCollectionCycle }}</span>
          <span style="width: 5.1vw">{{ item.maxPressureAlarm }}</span>
          <span style="width: 5.5vw">{{ item.minPressureAlarm }}</span>
          <span style="width: 6.8vw">{{ item.people }}</span>
          <div class="operation">
            <div class="modify" @click="handleModifyClick">修改</div>
          </div>
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

    <!-- 休眠周期设置 -->
    <el-dialog
      title="休眠周期设置"
      :visible.sync="isSleepShow"
      width="40.1%"
      custom-class="sleep-wrapper"
    >
      <div class="username">
        <span>休眠周期</span>
        <input type="text" placeholder="请输入内容" />
      </div>
      <div class="permission-wrapper">
        <span>消防栓</span>
        <el-transfer v-model="value" :data="data"></el-transfer>
      </div>
      <div class="confirm">确定</div>
    </el-dialog>
    <!-- 新建设置 -->
    <el-dialog
      title="新建"
      :visible.sync="isCreateShow"
      width="37.78%"
      custom-class="create-wrapper"
    >
      <ul>
        <li v-for="(item, index) in createList" :key="index">
          <span>{{ item.name }}</span>
          <input type="text" v-model.trim="item.value" placeholder="请输入内容" />
        </li>
      </ul>
      <div class="confirm" @click="addDevice">确定</div>
    </el-dialog>
    <!-- 导入 -->
    <el-dialog
      title="导入"
      :visible.sync="isImportShow"
      width="37.78%"
      custom-class="create-wrapper"
    >
      <main>
        <input type="file" />
      </main>
      <div class="confirm">确定</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Device",
  data() {
    const generateData = (_) => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };
    return {
      canAdd:true,
      isModify:false,
      pageSize: 15,
      total: 0,
      currentPage: 1,
      data: generateData(),
      value: [1, 4],
      createList: [
        {
          name: "挂牌编号",
          value: "",
        },
        {
          name: "SN码",
          value: "",
        },
        {
          name: "状态",
          value: "",
        },
        {
          name: "省份",
          value: "",
        },
        {
          name: "城市",
          value: "",
        },
        {
          name: "区域",
          value: "",
        },
        {
          name: "责任人",
          value: "",
        },
        {
          name: "经度",
          value: "",
        },
        {
          name: "维度",
          value: "",
        },
      ],
      isImportShow: false,
      isCreateShow: false,
      isSleepShow: false,
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
    handleModifyClick(item){
      this.isModify = true;
      this.isCreateShow = true
    },
    modifyDevice(){
      this.$put('/api/v1/equipment',{
        listing_number:this.createList[0].value,
        sn:this.createList[1].value,
        status:this.createList[2].value,
        province:this.createList[3].value,
        city:this.createList[4].value,
        area:this.createList[5].value,
        responsible:this.createList[6].value,
        longitude:this.createList[7].value,
        latitude:this.createList[8].value,
      }).then(res=>{
      }).catch(err=>{
      })
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    addDevice(){
      if(this.isModify){
        this.modifyDevice()
      }else{
        if(!this.canAdd) return
        this.canAdd = false
        this.$post('/api/v1/equipment',{
          listing_number:this.createList[0].value,
          sn:this.createList[1].value,
          status:this.createList[2].value,
          province:this.createList[3].value,
          city:this.createList[4].value,
          area:this.createList[5].value,
          responsible:this.createList[6].value,
          longitude:this.createList[7].value,
          latitude:this.createList[8].value,
        }).then(res=>{
          this.canAdd = true
        }).catch(err=>{
          this.canAdd = true
        })
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.alarm-wrapper {
  position: relative;
  padding: 3.2vh 2.4vw 0 2.4vw;
  height: 92.9vh;
  > header {
    display: flex;
    flex-direction: column;
    margin-bottom: 2.4vh;
    font-size: 0.7vw;
    .top{
      display: flex;
      margin-bottom: 1.6vh;
      > div {
        height: 3.7vh;
        line-height: 3.7vh;
        text-align: center;
        background-color: #122a38;
        border: 1px solid #1b647b;
        border-radius: 0.2vw;
        margin-right: 0.4vw;
      }
      .small {
        width: 6.5vw;
      }
      .big {
        width: 8.3vw;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      .left {
        input {
          width: 10.6vw;
          margin-right: 0.8vw;
          height: 3.6vh;
          background-color: #0f1f24;
          padding-left: 0.7vw;
          border: 1px solid #0c474c;
          outline: none;
          color: #fff;
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
      }
      .right {
        display: flex;
        .input-wrapper {
          position: relative;
          width: 12.4vw;
          height: 3.7vh;
          margin-right: 0.8vw;
          input {
            color: #b3b3b3;
            background-color: #0f1f24;
            padding-left: 0.7vw;
            border: none;
            outline: none;
            width: 100%;
            height: 3.7vh;
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
    }

  }
  main {
    > header {
      display: flex;
      font-size: 0.9vw;
      height: 7.5vh;
      .state {
        border-right: 1px solid #303f42;
        .top {
          text-align: center;
          border-bottom: 1px solid #303f42;
          height: 50%;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          font-size: 0.7vw;
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
      .water-gage {
        border-right: 1px solid #303f42;
        .top {
          text-align: center;
          border-bottom: 1px solid #303f42;
          height: 50%;
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          height: 50%;
          font-size: 0.7vw;
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
        &.people {
          width: 6.8vw;
        }
        &.operation {
          width: 10.4vw;
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
        .operation {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 10.4vw;
          font-size: 0.6vw;
          .modify {
            cursor: pointer;
            width: 4.5vw;
            height: 1.3vw;
            line-height: 1.3vw;
            background-color: #00a5a5;
            text-align: center;
            border-radius: 0.1vw;
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
  .sleep-wrapper {
    .el-dialog__body {
      padding-top: 0;
      .permission-wrapper {
        margin-bottom: 2.3vh;
      }
      .confirm {
        width: 4.7vw;
        height: 3.7vh;
        margin: 0 auto;
        background: #1e4d70;
        color: #fff;
        border-radius: 0.1vw;
        text-align: center;
        line-height: 3.7vh;
        cursor: pointer;
      }
    }
  }
  .create-wrapper {
    .el-dialog__body {
      ul {
        display: flex;
        flex-wrap: wrap;
        font-size: 0.7vw;
        margin-bottom: 1.8vh;
        > li {
          display: flex;
          flex-direction: column;
          margin-right: 2vw;
          margin-bottom: 1.2vh;
          span {
            color: #fff;
          }
          input {
            margin-top: 0.5vh;
            width: 14.8vw;
            height: 3.7vh;
            padding-left: 0.6vw;
            color: #fff;
            background: #172f3b;
            border: 1px solid #134a55;
            outline: none;
          }
        }
      }
      .confirm {
        width: 4.7vw;
        height: 3.7vh;
        margin: 0 auto;
        background: #1e4d70;
        border-radius: 0.1vw;
        color: #fff;
        text-align: center;
        line-height: 3.7vh;
        cursor: pointer;
      }
    }
  }
}
</style>
<style>

</style>
<style src="../../assets/style/element.css">
</style>