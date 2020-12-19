<template>
    <!-- 点击地图点时出现 -->
    <v-touch @swipeup="swipeup" @swipedown="swipedown">
        <main  :style="{bottom:bottom1+'vh'}">
            <div class="second-wrapper">
                <div class="list" v-for="(item, index) in secondList" :key="index">
                    <img :src="item.img" alt=""/>
                    <span>{{ item.name }}</span>
                </div>
            </div>
            <section class="bottom percentAnalyse">
                <header>设备信息</header>
                <ul>
                    <li v-for="(item,index) in percentList" :key="index">
                        <span>{{item.name}}:</span>
                        <span>{{mapPointDetail[item.key]}}</span>
                    </li>
                </ul>
            </section>
            <section class="warning errorList bottom">
                <header>报警记录</header>
                <div class="warning-wrapper">
                    <header>
                        <span>挂牌编号</span>
                        <div class="water">
                            <div class="top">
                                水压
                            </div>
                            <div class="bottom">
                                <span>水压（Mpa）</span>
                                <span>采集时间</span>
                                <span>接受时间</span>
                            </div>
                        </div>

                    </header>
                    <div class="list-wrapper">
                        <div :key="index"
                             class="list"
                             v-for="(list,index) in offlineList">
                            <span>{{ list.listing_number }}</span>
                            <span>{{ list.press }}</span>
                            <span>{{ list.collection }}</span>
                            <span>{{ list.accept }}</span>
                        </div>
                    </div>
                    <div class="pagination">
                        <div class="left" @click="changePage('prev')">
                            上一页
                        </div>
                        <div class="center">1/页</div>
                        <div class="right" @click="changePage('next')">下一页</div>
                    </div>
                </div>
            </section>
        </main>
    </v-touch>
</template>

<script>
    const img = {
        error: require('@/assets/index/error.png'),
        warn: require('@/assets/index/warn.png'),
        stop: require('@/assets/index/stop.png'),
        normal: require('@/assets/index/normal.png'),
    };
    export default {
        name: "MapDetail",
        data(){
            return {
                percentList: [
                    {
                        name: '非法用水',
                        key: 'status',
                        value: 'WG54991'
                    },
                    {
                        name: 'SN码',
                        key: 'sn',
                        value: 'WG54991'
                    },
                    {
                        name: '休眠周期',
                        key: 'sleep_cycle',
                        value: '20分钟'
                    },
                    {
                        name: '压力采集周期',
                        key: 'collection_cycle',
                        value: '20分钟'
                    },
                    {
                        name: '压力报警上限',
                        key: 'voltage_uper',
                        value: '10.00mpa'
                    },
                    {
                        name: '压力报警下限',
                        key: 'voltage_lower',
                        value: '10.00mpa'
                    },
                    {
                        name: '负责人',
                        key: 'responsible',
                        value: '10.00mpa'
                    },
                    {
                        name: '地址',
                        key: 'address',
                        value: '深圳高新区科苑南路综合服务楼'
                    },
                ],
                secondList: [
                    {
                        name: '正常',
                        img: img.normal,
                    },
                    {
                        name: '离线',
                        img: img.warn,
                    },
                    {
                        name: '报警',
                        img: img.error,
                    },
                    {
                        name: '停用',
                        img: img.stop,
                    },
                ],
                pageSize: 6,
                total: 1,
                currentPage: 1,
                bottom1: -99,
                offlineList:[]

            }
        },
        computed:{
            isMobileDetailShow() {
                return this.$store.getters['getIsMobileDetailShow'];
            },
            mapPointDetail() {
                return this.$store.getters['getMapPointDetail'];
            },
        },
        methods:{
            swipeup(e) {
                alert(e)
                this.bottom1 = -99;
            },
            swipedown(e) {
                this.bottom1 = -145;
            },
            changePage(type){
                if(this.total === 1)return
                if(type === 'prev'){
                    if(this.currentPage === 1)return
                    this.currentPage -= 1
                    this.getOfflineList(this.currentPage)
                }
                if(type === 'next'){
                    if(this.currentPage === this.total) return
                    this.currentPage += 1
                    this.getOfflineList(this.currentPage)
                }
            },
            getOfflineList(page) {
                let url = "/api/v1/dataOverview";
                if (page) {
                    url = url + `?page=${page}`;
                }
                this.$get(url, {
                    status: 1,
                    page_sum:6
                }).then(res => {
                    this.offlineList = res.data;
                    this.total = res.meta.total
                });
            },
        },
        watch:{
            isMobileDetailShow(val) {
                this.$emit('setIsSecondShow')
                this.getOfflineList();
            }
        }
    }
</script>

<style lang="scss" scoped>
    main {
        position: absolute;
        width: 100%;
        z-index: 1;
        background-color: #1a2228;
        padding-top: 1.3vh;
        max-height: 84vh;
        transition: all .3s;
        .line {
            position: sticky;
            left: 50%;
            top: 0;
            transform: translateX(-50%);
            width: 9.4vw;
            height: 1.3vw;
            margin-bottom: 1.3vh;
            background-color: #3b5157;
        }
        .second-wrapper {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -12vw;
            display: flex;
            justify-content: space-around;
            z-index: 1;
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
            padding: 0.5vw 1vw;
            width: 77.8vw;
            height: 9.8vw;
            font-size: 3.1vw;

            .list {
                display: flex;
                align-items: center;

                &:last-child {
                    margin: 0;
                }

                img {
                    width: 5.3vw;
                    height: 6.2vw;
                    margin-right: 1.8vw;
                }
            }
        }

        section {
            margin: 0 auto;
            margin-bottom: 5.9vw;
            width: 88.3vw;
            &.bottom {
                height: 31.6vh;
                color: #fff;
                background-image: url("~@/assets/index/bg2.png");
                background-size: 100% 100%;
                h2 {
                    font-size: 3.7vw;
                    font-weight: normal;
                    margin-left: 0.9vw;
                }
                .warning-wrapper {
                    header {
                        font-size: 3.1vw;
                        color: rgba(255, 255, 255, 0.6);
                        padding-left: 1.5vw;
                        margin-top: 1.7vh;
                        margin-bottom: 0.6vh;
                        span {
                            margin-right: 5.5vw;
                        }
                    }
                    .list-wrapper {
                        height: 25.4vh;
                        overflow: scroll;
                        &::-webkit-scrollbar {
                            display: none
                        }
                        .list {
                            display: flex;
                            align-items: center;
                            height: 7vw;
                            font-size: 3.1vw;
                            padding-left: 1.5vw;
                            span {
                                &:nth-child(1) {
                                    margin-right: 7vw;
                                }
                                &:nth-child(2) {
                                    margin-right: 5.3vw;
                                }
                                &:nth-child(3) {
                                    margin-right: 6.5vw;
                                }
                            }
                            &:nth-child(odd) {
                                background-color: #2f444a;
                            }
                        }
                    }
                }
            }
            &.warning {
                > header {
                    height: 2.6vh;
                    line-height: 2.6vh;
                    font-size: 3.7vw;
                    padding-left: 0.7vw;
                }
                .warning-wrapper {
                    header {
                        padding-left: 1.5vw;
                        font-size: 3.1vw;
                        span {
                            margin-right: 5.5vw;
                            &:nth-child(3) {
                                margin-right: 20.2vw;
                            }
                            &:last-child {
                                margin: 0;
                            }
                        }
                    }
                    .list-wrapper {
                        overflow: scroll;
                        &::-webkit-scrollbar {
                            display: none
                        }
                        .list {
                            display: flex;
                            align-items: center;
                            height: 7vw;
                            font-size: 3.1vw;
                            padding-left: 1.4vw;
                            span {
                                &:nth-child(1) {
                                    margin-right: 7vw;
                                }
                                &:nth-child(2) {
                                    margin-right: 5.1vw;
                                }
                                &:nth-child(3) {
                                    display: inline-block;
                                    width: 22.5vw;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    margin-right: 3.9vw;
                                }
                            }
                            &:nth-child(odd) {
                                background-color: #2f444a;
                            }
                        }
                    }
                }
            }
            &.percentAnalyse {
                height: unset;
                padding-left: 4.1vw;
                margin-bottom: 2vw;
                header {
                    font-size: 3.7vw;
                }
                ul {
                    padding: 3.4vw 0;
                    font-size: 3.1vw;
                    li {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 2.1vw;
                        padding-right: 3.2vw;
                        &:last-child {
                            margin: 0;
                        }
                    }
                }
            }
            &.errorList {
                padding: 0 4.1vw 4vw 4.1vw;
                height: unset;
                margin-bottom: 0;
                header {
                    display: flex;
                    align-items: center;
                    > span {
                        border-right: 1px solid #293e43;
                    }
                    .water {
                        display: flex;
                        flex-direction: column;
                        .top {
                            text-align: center;
                            border-bottom: 1px solid #293e43;
                        }
                    }
                }
                .warning-wrapper {
                    .list-wrapper {
                        height: unset;
                        //  height: 44vw;
                    }
                }
                .pagination {
                    display: flex;
                    //margin-top: 4.1vw;
                    > div {
                        display: flex;
                        flex: 1;
                        align-items: center;
                        justify-content: center;
                        height: 7.4vw;
                        font-size: 3.1vw;
                    }
                    .left {
                        background: #094c53;
                    }
                    .center {
                        border: 1px solid #0a4b52;
                    }
                    .right {
                        background: #094c53;
                    }
                }
            }
        }
    }
</style>