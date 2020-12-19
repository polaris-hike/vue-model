<template>
    <div class="search-content" >
        <h1>搜索结果</h1>
        <section class="bottom percentAnalyse" v-for="(list,index) in searchList" :key="index">
            <ul>
                <li v-for="(item,index) in percentList" :key="index">
                    <span>{{item.name}}:</span>
                    <span>{{list[item.key]}}</span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Search",
        props:['searchList'],
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
            }
        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
    .search-content {
        h1 {
            padding-left: 6.1vw;
            margin-bottom: 1vh;
        }
        .percentAnalyse {
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
        .bottom {
            margin: 0 auto;
            margin-bottom: 5.9vw;
            width: 88.3vw;
            color: #fff;
            background-image: url("~@/assets/index/bg2.png");
            background-size: 100% 100%;
        }
    }
</style>