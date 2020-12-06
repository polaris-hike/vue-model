<template>
    <div class="alarm-wrapper">
        <header>
            <chinaArea/>
            <div class="input-wrapper">
                <i class="search-icon"></i>
                <input class="search" type="text" v-model="search" placeholder="请输入关键字"/>
            </div>
            <div class="confirm" @click="handleSearchClick">确认</div>
        </header>
        <main>
            <header>
                <div class="first">
                    <el-checkbox v-model="checked"></el-checkbox>
                    <!--<input class="first" type="checkbox" v-model="checked">-->
                </div>
                <!-- <span class="first">xx</span>-->
                <span>挂牌编号</span>
                <span>SN码</span>
                <span>报警描述</span>
                <span>地址</span>
                <span>处理状态</span>
                <span>维护人员</span>
                <span>联系电话</span>
                <span>操作</span>
            </header>
            <ul class="alarmList-wrapper">
                <li v-for="(item, index) in alarmList" :key="index">
                    <div class="first">
                        <el-checkbox v-model="item.isCheck"></el-checkbox>
                    </div>
                    <span>{{ item.listing_number }}</span>
                    <span>{{ item.sn }}</span>
                    <span>{{ item.describe }}</span>
                    <span>{{ item.address }}</span>
                    <span v-if="item.status === 0" class="unHandle"><i></i> 未处理</span>
                    <span v-if="item.status === 1" class="handle"><i></i>已处理</span>
                    <span>{{ item.name }}</span>
                    <span>{{ item.phone }}</span>
                    <div class="operation">
                        <div class="notice">一键通知</div>
                        <div class="sign" @click="sign(item.id)">标记为已处理</div>
                    </div>
                </li>
            </ul>
        </main>
        <div class="handle-all">
            <div class="notice">一键通知</div>
            <div class="sign" @click="signAll">标记为已处理</div>
        </div>
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
        name: "Alarm",
        data() {
            return {
                checked: false,
                search: "",
                province: "",
                city: "",
                area: "",
                status: "",
                pageSize: 15,
                total: 0,
                currentPage: 1,
                alarmList: [],
            };
        },
        components: {
            chinaArea
        },
        methods: {
            signAll(){
                const idList = this.alarmList.filter(item=>item.isCheck).map(i=>i.id)
                if(idList.length ===0)return
                this.$post('/api/v1/handle', {
                    id: idList
                }).then(res => {
                    this.getAlarmListData()
                })
            },
            sign(id) {
                this.$post('/api/v1/handle', {
                    id: [id]
                }).then(res => {
                    this.getAlarmListData()
                })
            },
            handleSearchClick() {
                this.$get("/api/v1/callThePolice", {
                    search: this.search,
                    province: this.province,
                    city: this.city,
                    area: this.area,
                    status: this.status,
                }).then((res) => {
                    this.alarmList = res.data;
                });
            },
            handleCurrentChange(val) {
                this.getAlarmListData(val);
            },
            getAlarmListData(page) {
                let url = "/api/v1/callThePolice";
                if (page) {
                    url = url + `?page=${page}`;
                }
                this.$get(url).then((res) => {
                    this.alarmList = res.data;
                    this.alarmList.forEach((item) => {
                        this.$set(item, 'isCheck', false)
                    })
                });
            },
        },
        watch:{
            checked(val){
                console.log(val);
                if(val){
                    this.alarmList.forEach((item)=>{
                        item.isCheck = true
                    })
                }else{
                    this.alarmList.forEach((item)=>{
                        item.isCheck = false
                    })
                }
            }
        },
        mounted() {
            this.getAlarmListData();
        },
    };
</script>

<style lang="scss" scoped>
    .alarm-wrapper {
        position: relative;
        padding: 3.2vh 2.4vw 0 2.4vw;
        height: 92.9vh;

        input[type=checkbox] {
            position: relative;

            &::after {
                position: absolute;
                top: 0;
                background-color: #0a253a;
                color: #000;
                width: 100%;
                height: 100%;
                display: inline-block;
                border: 1px solid #2589a0;
                visibility: visible;
                padding-left: 0px;
                text-align: center;
                content: ' ';
            }
            input[type=checkbox]:checked::after{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                content: "✓";
                font-size: 12px;
                font-weight: bold;
            }
        }

        > header {
            display: flex;
            margin-bottom: 4.1vh;

            .el-select {
                width: 10.6vw;
                margin-right: 0.8vw;

                ::v-deep.el-input__inner {
                    background-color: #0f1f24;
                    height: 3.7vh;
                    border-radius: 0;
                }

                ::v-deep .el-select__caret {
                    color: #01eff0;
                }
            }

            input {
                width: 10.6vw;
                margin-right: 0.8vw;
                color: #b3b3b3;
                height: 3.7vh;
                background-color: #0f1f24;
                padding-left: 0.7vw;
                border: 1px solid #1e6f85;
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

                .first {
                    display: flex;
                    width: 5.4vw;
                    justify-content: center;

                    input {
                        width: 1.1vw;
                        height: 1.1vw;
                    }
                }

                span {
                    display: inline-block;
                    border-right: 1px solid #303f42;
                    text-align: center;

                    &:last-child {
                        border: none;
                    }

                    &:nth-child(2) {
                        border-left: 1px solid #303f42;
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

                    &:nth-child(9) {
                        width: 17.3vw;
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

                    .first {
                        width: 5.4vw;
                        display: flex;
                        justify-content: center;

                        input {
                            width: 1.1vw;
                            height: 1.1vw;
                        }
                    }

                    span {
                        display: inline-block;
                        text-align: center;

                        &.unHandle {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #ef4343;

                            i {
                                width: 0.4vw;
                                height: 0.4vw;
                                background: #ef4343;
                                margin-right: 0.6vw;
                            }
                        }

                        &.handle {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #22b573;

                            i {
                                width: 0.4vw;
                                height: 0.4vw;
                                background: #22b573;
                                margin-right: 0.6vw;
                            }
                        }

                        &:nth-child(1) {

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

                        > div {
                            cursor: pointer;
                        }

                        .notice {
                            width: 4.2vw;
                            height: 1.3vw;
                            line-height: 1.3vw;
                            text-align: center;
                            margin-right: 0.4vw;
                            background-color: #00a5a5;
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

        .handle-all {
            position: absolute;
            left: 2vw;
            bottom: 11vh;
            display: flex;
            justify-content: center;
            font-size: 0.6vw;

            > div {
                cursor: pointer;
            }

            .notice {
                width: 4.2vw;
                height: 1.3vw;
                line-height: 1.3vw;
                text-align: center;
                margin-right: 0.4vw;
                background-color: #00a5a5;
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
