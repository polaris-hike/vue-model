<template>
    <div class="alarm-wrapper">
        <header>
            <div class="left">
                <div class="small" @click="isCreateShow=true">+ 新建</div>
                <div class="small">导出</div>
                <div class="small">导入</div>
                <div class="small" @click="isSleepShow=true">休眠周期设置</div>
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
                        <span style="width: 4.7vw">休眠周期</span>
                        <span  style="width: 5.4vw">压力采集周期</span>
                        <span style="width: 5.1vw">压力报警上限</span>
                        <span style="width: 5.5vw">压力报警下限</span>
                    </div>
                </div>
                <span class="people">负责人</span>
                <span class="operation">操作</span>
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
                    <span style="width: 5.5vw">{{item.minPressureAlarm}}</span>
                    <span style="width:6.8vw">{{item.people}}</span>
                    <div class="operation">
                        <div class="notice">一键通知</div>
                        <div class="sign">标记为已处理</div>
                    </div>
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

        <!-- 休眠周期设置 -->
        <el-dialog
                title="休眠周期设置"
                :visible.sync="isSleepShow"
                width="40.1%"
                custom-class="sleep-wrapper"
        >
            <div class="username">
                <span>休眠周期</span>
                <input type="text" placeholder="请输入内容">
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
                <li v-for="(item,index) in createList" :key="index">
                    <span>{{item.name}}</span>
                    <input type="text" v-model="item.value" placeholder="请输入内容">
                </li>
            </ul>
            <div class="confirm">确定</div>
        </el-dialog>
        <!-- 导入 -->
        <el-dialog
                title="导入"
                :visible.sync="isImportShow"
                width="37.78%"
                custom-class="create-wrapper"
        >
           <main>
               <input type="file">
           </main>
            <div class="confirm">确定</div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'Device',
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        data: generateData(),
        value: [1, 4],
        createList:[
          {
            name:'挂牌编号',
            value:''
          },
          {
            name:'SN码',
            value:''
          },
          {
            name:'状态',
            value:''
          },
          {
            name:'省份',
            value:''
          },
          {
            name:'城市',
            value:''
          },
          {
            name:'区域',
            value:''
          },
          {
            name:'联系人',
            value:''
          },
          {
            name:'责任人',
            value:''
          },
          {
            name:'联系方式',
            value:''
          }
        ],
        isImportShow:false,
        isCreateShow:false,
        isSleepShow:false,
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

<style lang="scss" scoped>
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
                        justify-content: center;
                        //width: 17.3vw;
                        font-size: 0.6vw;
                        .notice {
                            width: 4.2vw;
                            height: 1.3vw;
                            line-height: 1.3vw;
                            background-color: #00a5a5;
                            text-align: center;
                            margin-right: 0.4vw;
                        }
                        .sign {
                            width: 5.8vw;
                            height: 1.3vw;
                            line-height: 1.3vw;
                            background-color: #0071a3;
                            text-align: center;
                            margin-right: 0.4vw;
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
        .sleep-wrapper {
            .el-dialog__body {
                .username {
                    display: flex;
                    flex-direction: column;
                    input {
                        width: 14.8vw;
                        height: 2.4vh;
                    }
                }
                .permission-wrapper {
                    margin-bottom: 2.3vh;
                }
                .confirm {
                    width: 4.7vw;
                    height: 1.7vw;
                    margin: 0 auto;
                    border: 1px solid red;
                    text-align: center;
                    line-height: 1.7vw;
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
                        margin-right: 2.3vw;
                        margin-bottom: 1.2vh;
                        input {
                            width: 14.8vw;
                            height: 2.1vw;
                            margin-top: 0.5vh;
                        }
                    }
                }
                .confirm {
                    width: 4.7vw;
                    height: 1.7vw;
                    margin-left: 5.1vw;
                    border: 1px solid red;
                    text-align: center;
                    line-height: 1.7vw;
                    cursor: pointer;
                }
            }
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
