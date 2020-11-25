<template>
    <div class="left-wrapper">
        <section class="top">
            <ul>
                <li v-for="(item,index) in numList"
                  :key="index">
                    <div class="logo">
                        <img :src="item.img"
                          alt="">
                    </div>
                    <span class="name">{{item.name}}</span>
                    <span class="value">{{item.num}}</span>
                </li>
            </ul>
        </section>
        <section class="bottom">
            <h2>实时报警</h2>
            <div class="warning-wrapper">
                <header>
                    <span>挂牌编号</span>
                    <span>报警描述</span>
                    <span>报警时间</span>
                </header>
                <div class="list-wrapper">
                    <vueSeamless :data="warningList"
                      :class-option="seamlessOptions">
                        <div class="list"
                          v-for="(list,index) in warningList"
                          :key="index">
                            <span>{{list.id}}</span>
                            <span>{{list.desc}}</span>
                            <span>{{list.time}}</span>
                            <span v-if="list.state ===1">未处理</span>
                            <span v-if="list.state ===1">已处理</span>
                        </div>
                    </vueSeamless>

                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import vueSeamless from 'vue-seamless-scroll';

    export default {
        name: 'leftSide',
        data() {
            return {
                numList: [
                    {
                        name: '消防栓数量',
                        img: require('@/assets/index/1.png'),
                        num: 17800,
                    },
                    {
                        name: '故障数量',
                        img: require('@/assets/index/2.png'),
                        num: 149,
                    },
                    {
                        name: '停用数量',
                        img: require('@/assets/index/3.png'),
                        num: 231,
                    },
                    {
                        name: '正常数量',
                        img: require('@/assets/index/4.png'),
                        num: 12810,
                    }
                ],
                warningList: [
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },
                    {
                        id: 'wfg957',
                        desc: '水压异常',
                        time: '11/19 12:10',
                        state: 1
                    },

                ]
            };
        },
        components: {
            vueSeamless
        },
        computed: {
            seamlessOptions() {
                return {
                    //step: 0.5,
                    step: 0,
                    limitMoveNum: 5
                };
            }
        },
    };
</script>

<style lang="scss"
  scoped>
    .left-wrapper {
        position: absolute;
        left: 0.8vw;
        width: 17.2vw;

        .top {
            margin-bottom: 31.5vh;
            ul {
                li {
                    position: relative;
                    width: 100%;
                    height: 5.8vh;
                    display: flex;
                    align-items: center;
                    background-image: url("~@/assets/index/num-bg.png");
                    background-size: 100% 100%;
                    padding-left: 0.7vw;
                    margin-bottom: 1vh;

                    .logo {
                        width: 1.9vw;
                        height: 1.9vw;
                        margin-right: 0.9vw;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .name {
                        font-size: 0.7vw;
                        margin-right: 1.7vw;
                        color: #fff;
                    }

                    .value {
                        position: absolute;
                        left: 8.9vw;
                        color: #fff;
                        font-size: 1.9vw;
                        font-weight: DINEngschrift;
                    }
                }
            }
        }

        .bottom {
            height: 31.6vh;
            color: #fff;

            h2 {

            }

            .warning-wrapper {
                header {

                }

                .list-wrapper {
                    height: 25.4vh;
                    overflow: scroll;

                    &::-webkit-scrollbar {
                        display: none
                    }
                    .list {
                        height: 2.6vh;
                        font-size: 0.6vw;

                        &:nth-child(odd){
                            background-color: red;
                        }
                    }
                }
            }
        }
    }
</style>
