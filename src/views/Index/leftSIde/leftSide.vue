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
					<span>状态</span>
                </header>
                <div class="list-wrapper">
                    <vueSeamless :data="warningList"
                      :class-option="seamlessOptions">
                        <div class="list"
                          v-for="(list,index) in warningList"
                          :key="index">
                            <span>{{list.listing_number}}</span>
                            <span>{{list.describe}}</span>
                            <span>{{list.created_at}}</span>
                            <span v-if="list.status ===0" class="unHandle"><i></i> 未处理</span>
                            <span v-if="list.status ===1" class="handle"><i></i> 已处理</span>
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
                        num: 0,
                    },
					{
					    name: '正常数量',
					    img: require('@/assets/index/1.png'),
					    num: 0,
					},
                    {
                        name:'离线数量',
                        img: require('@/assets/index/3.png'),
                        num: 0,
                    },
                    {
                        name: '报警数量',
                        img: require('@/assets/index/2.png'),
                        num: 0,
                    },
                    {
                        name: '停用数量',
                        img: require('@/assets/index/4.png'),
                        num: 0,
                    },
                   
                ],
                warningList: []
            };
        },
        components: {
            vueSeamless
        },
        computed: {
			vhToPx() {
				return this.$store.getters["vhToPx"];
			},
            seamlessOptions() {
                return {
                    //step: 0.5,
                    // step: 0,
                    // limitMoveNum: 5
					singleHeight: ~~(this.vhToPx(2.6)),
					limitMoveNum: 4,
					waitTime: 3500
                };
            }
        },
      methods:{
          getNumList(){
            this.$get('/api/v1/number').then(res=>{
              this.numList[0].num = res.data.count;
              this.numList[1].num = res.data.normal;
              this.numList[2].num = res.data.fault;
              this.numList[3].num = res.data.callThePolice;
              this.numList[4].num = res.data.stop;
            })
          },
          getHomeCallThePolice(){
              this.$get('/api/v1/homeCallThePolice').then(res=>{
                  this.warningList = res.data
              })
          },

      },
      mounted() {
          this.getNumList();
          this.getHomeCallThePolice();
      }
    };
</script>

<style lang="scss"
  scoped>
    @media screen and (min-width:1500px){
        .left-wrapper {
            .bottom {
                .warning-wrapper {
                    .list-wrapper {
                        .list {
                            justify-content: unset!important;
                            span {
                                &:nth-child(1){
                                    margin-right: 1.3vw;
                                }
                                &:nth-child(2){
                                    margin-right: 1vw;
                                }
                                &:nth-child(3){
                                    margin-right: 1.1vw;
                                }
                            }
                        }
                    }
                }
            }
        }

    }
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
                        font-size: 1.5vw;
						font-family: DM;
                        // font-w: DINEngschrift;
                    }
                }
            }
        }

        .bottom {
            height: 31.6vh;
            color: #fff;
            background-image: url("~@/assets/index/bg2.png");
            background-size: 100% 100%;

            h2 {
                font-size: 0.7vw;
                font-weight: normal;
                margin-left: 0.9vw;
            }

            .warning-wrapper {
                header {
                    font-size: 0.6vw;
                    color: rgba(255,255,255,0.6);
                    padding-left: 1.5vw;
                    margin-top: 1.7vh;
                    margin-bottom: 0.6vh;
                    span {
                        margin-right: 1vw;
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
                        justify-content: space-between;
                        height: 2.6vh;
                        font-size: 0.6vw;
                        padding-left: 1.5vw;
                        .unHandle {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #ef4343;

                            i {
                                width: 0.4vw;
                                height: 0.4vw;
                                background: #ef4343;
                                margin-right: 0.2vw;
                            }
                        }

                        .handle {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #22b573;

                            i {
                                width: 0.4vw;
                                height: 0.4vw;
                                background: #22b573;
                                margin-right: 0.2vw;
                            }
                        }
                        &:nth-child(odd){
                            background-color: #2f444a;
                        }

                    }
                }
            }
        }
    }
</style>
