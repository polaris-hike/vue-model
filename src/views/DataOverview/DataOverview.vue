<template>
    <div class="alarm-wrapper">
        <header>
            <div class="left">
                <div class="small">+ 新建</div>
                <div class="small">导出</div>
                <div class="small">导入</div>
                <div class="small">休眠周期设置</div>
                <div class="big">压力采集周期设置</div>
                <div class="big">压力报警上限设置</div>
                <div class="big">压力报警下限设置</div>
            </div>
            <div class="right">
                <input class="search"
                       type="text"
                       placeholder="请输入关键字">
                <div class="confirm">确认</div>
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
                        <span  style="width: 3.3vw">停用</span>
                        <span  style="width: 3vw">正常</span>
                        <span  style="width: 3vw">撞到</span>
                        <span style="width: 4.8vw">非法用水</span>
                        <span style="width: 4.8vw">水压异常</span>
                        <span style="width: 4.8vw">电压异常</span>
                        <span style="width: 4.8vw">事件时间</span>
                    </div>
                </div>
                <div class="water-gage">
                    <div class="top">水压</div>
                    <div class="bottom">
                        <span style="width: 4.7vw">水压(Mpa)</span>
                        <span  style="width: 5.4vw">采集时间</span>
                        <span style="width: 5.1vw">接受时间</span>
                        <span style="width: 5.5vw">维护人员</span>
                    </div>
                </div>
            </header>
            <ul class="alarmList-wrapper">
                <li v-for="(item,index) in alarmList"
                    :key="index">
                    <span>{{item.id}}</span>
                    <span>{{item.sn}}</span>
                    <span>{{item.address}}</span>
                    <span style="width: 3.3vw">{{item.stopUse}}</span>
                    <span style="width: 3vw">{{item.normal}}</span>
                    <span style="width: 3vw">{{item.knockDown}}</span>
                    <span style="width: 4.8vw">{{item.illegalWaterUse}}</span>
                    <span style="width: 4.8vw">{{item.abnormalWaterPressure}}</span>
                    <span style="width: 4.8vw">{{item.abnormalVoltage}}</span>
                    <span style="width: 4.8vw">{{item.eventTime}}</span>
                    <span style="width: 4.7vw">{{item.sleepCircle}}</span>
                    <span style="width: 5.4vw">{{item.pressureCollectionCycle}}</span>
                    <span style="width: 5.1vw">{{item.maxPressureAlarm}}</span>
                    <span style="width: 5.5vw">{{item.people}}</span>
                </li>
            </ul>
        </main>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'DataOverview',
    data() {
      return {
        alarmList: [
          {
            id: 11877495581,
            sn: 'WG54991',
            address: '高新技术产业园区南区科苑南路综合服务楼',
            stopUse: 1,
            normal: 1,
            knockDown: 1,
            illegalWaterUse: 1,
            abnormalWaterPressure: 1,
            abnormalVoltage: 1,
            eventTime: '11/08 12：55',
            sleepCircle: '10.00MPa',
            pressureCollectionCycle: '10.00MPa',
            maxPressureAlarm: '11/08 12：55',
            minPressureAlarm: '11/08 12：55',
            people: '王维维',
          },
          {
            id: 11877495581,
            sn: 'WG54991',
            address: '高新技术产业园区南区科苑南路综合服务楼',
            stopUse: 1,
            normal: 1,
            knockDown: 1,
            illegalWaterUse: 1,
            abnormalWaterPressure: 1,
            abnormalVoltage: 1,
            eventTime: '11/08 12：55',
            sleepCircle: '10.00MPa',
            pressureCollectionCycle: '10.00MPa',
            maxPressureAlarm: '11/08 12：55',
            minPressureAlarm: '11/08 12：55',
            people: '王维维',
          },
        ]
      };
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
            justify-content: space-between;
            margin-bottom: 4.1vh;
            font-size: 0.7vw;
            .left {
                display: flex;
                > div {
                    height: 3.7vh;
                    line-height: 3.7vh;
                    text-align: center;
                    border: 1px solid red;
                    margin-right: 0.4vw;
                }
                .small {
                    width: 6.5vw;
                }
                .big {
                    width: 8.3vw;
                }
            }
            .right {
                display: flex;
                .search {
                    margin-right: 0.8vw;
                    color: black;
                    height: 3.7vh;
                }
                .confirm {
                    width: 5.9vw;
                    height: 3.7vh;
                    line-height: 2.1vw;
                    text-align: center;
                    border: 1px solid red;
                    font-size: 0.7vw;
                    cursor: pointer;
                }
            }
        }
        main {
            > header {
                display: flex;
                font-size: 0.9vw;
                .state {
                    border-right: 1px solid red;
                    .top {
                        text-align: center;
                        border-bottom: 1px solid red;
                    }
                    .bottom {
                        display: flex;
                        justify-content: space-between;
                        > span {
                            text-align: center;
                            border-right: 1px solid red;
                            display: inline-block;
                            &:last-child {
                                border: none;
                            }
                        }
                    }
                }
                .water-gage {
                    border-right: 1px solid red;
                    .top {
                        text-align: center;
                        border-bottom: 1px solid red;
                    }
                    .bottom {
                        display: flex;
                        justify-content: space-between;
                        font-size: 0.7vw;
                        > span {
                            text-align: center;
                            border-right: 1px solid red;
                            display: inline-block;
                            &:last-child {
                                border: none;
                            }
                        }
                    }
                }
                > span {
                    display: inline-block;
                    border-right: 1px solid red;
                    text-align: center;
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
                        background-color: red;
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
            bottom: 3vh;
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>
<style>
    .el-pager li {
        color: #fff;
        background: unset;
    }
    .el-pagination button:disabled {
        background-color: unset;
    }
    .el-pagination .btn-next, .el-pagination .btn-prev {
        background: unset;
    }
    .el-input__inner {
        background-color: unset;
    }
</style>
