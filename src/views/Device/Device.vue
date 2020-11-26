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
                  plceholder="请输入关键字">
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
                        <span>休眠周期</span>
                        <span>压力采集周期</span>
                        <span>压力报警上限</span>
                        <span>压力报警下限</span>
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
                    <span>{{item.people}}</span>
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
    </div>
</template>

<script>
    export default {
        name: 'Device',
        data() {
            return {
                alarmList: [
                    {
                        id: 11877495581,
                        sn: 'WG54991',
                        address: '高新技术产业园区南区科苑南路综合服务楼',
                        people: '王维维',
                    },
                    {
                        id: 11877495581,
                        sn: 'WG54991',
                        address: '高新技术产业园区南区科苑南路综合服务楼',
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
                    margin-right: 0.4vw ;
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
                    width: 29.1vw;
                    border-right: 1px solid red;
                    .top {
                        text-align: center;
                        border-bottom: 1px solid red;
                    }
                    .bottom {
                        display: flex;
                        justify-content: space-between;
                        >span {
                            text-align: center;
                            border-right: 1px solid red;
                            display: inline-block;
                            width: 100%;
                            &:last-child {
                                border: none;
                            }
                        }
                    }
                }
                .water-gage {
                    width: 20.7vw;
                    border-right: 1px solid red;
                    .top {
                        text-align: center;
                        border-bottom: 1px solid red;
                    }
                    .bottom {
                        display: flex;
                        justify-content: space-between;
                        font-size: 0.7vw;
                        >span {
                            text-align: center;
                            border-right: 1px solid red;
                            display: inline-block;
                            width: 100%;
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
                        width:6.6vw;
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
                        background-color: red;
                    }

                    span {
                        display: inline-block;
                        text-align: center;

                        &:nth-child(1) {
                            width: 5.4vw;
                        }

                        &:nth-child(2) {
                            width: 8.4vw;
                        }

                        &:nth-child(3) {
                            width: 9vw;
                        }

                        &:nth-child(4) {
                            width: 9vw;
                        }

                        &:nth-child(5) {
                            width: 17.3vw;
                        }

                        &:nth-child(6) {
                            width: 7.9vw;
                        }

                        &:nth-child(7) {
                            width: 9.5vw;
                        }

                        &:nth-child(8) {
                            width: 11.1vw;
                        }
                    }

                    .operation {
                        display: flex;
                        justify-content: center;
                        width: 17.3vw;
                        font-size: 0.6vw;

                        .notice {
                            width: 4.2vw;
                            height: 1.3vw;
                            line-height: 1.3vw;
                            border: 1px solid cornflowerblue;
                            text-align: center;
                            margin-right: 0.4vw;
                        }

                        .sign {
                            width: 5.8vw;
                            height: 1.3vw;
                            line-height: 1.3vw;
                            border: 1px solid cornflowerblue;
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
