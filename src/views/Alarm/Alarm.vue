<template>
    <div class="alarm-wrapper">
        <header>
            <input type="text" placeholder="省份">
            <input type="text" placeholder="城市">
            <input type="text" placeholder="区域">
            <input type="text" placeholder="状态">
            <input class="search" type="text" placeholder="请输入关键字">
            <div class="confirm">确认</div>
        </header>
        <main>
            <header>
                <span class="first">xx</span>
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
                <li v-for="(item,index) in alarmList" :key="index">
                    <span>xxx</span>
                    <span>{{item.id}}</span>
                    <span>{{item.sn}}</span>
                    <span>{{item.desc}}</span>
                    <span>{{item.address}}</span>
                    <span>{{item.state}}</span>
                    <span>{{item.people}}</span>
                    <span>{{item.phone}}</span>
                    <div class="operation" >
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
    name: "Alarm",
    data(){
      return {
        alarmList:[
          {
            id:11877495581,
            sn:'WG54991',
            desc:'水压异常',
            address:'高新技术产业园区南区科苑南路综合服务楼',
            state:1,
            people:'王维维',
            phone:1382761829
          },
          {
            id:11877495581,
            sn:'WG54991',
            desc:'水压异常',
            address:'高新技术产业园区南区科苑南路综合服务楼',
            state:1,
            people:'王维维',
            phone:1382761829
          },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
.alarm-wrapper {
    position: relative;
    padding: 3.2vh 2.4vw 0 2.4vw;
    height:92.9vh;
    >header {
        display: flex;
        margin-bottom: 4.1vh;
        input {
            width: 10.6vw;
            margin-right: 0.8vw;
            color: black;
            &.search {
                width: 12.4vw;
            }
        }
        .confirm {
            width: 5.9vw;
            height: 2.1vw;
            line-height: 2.1vw;
            text-align: center;
            border: 1px solid red;
            font-size: 0.7vw;
            cursor: pointer;
        }
    }
    main {

        > header {
            font-size: 0.9vw;
            span {
                display: inline-block;
                border-right: 1px solid red;
                text-align: center;
                &:last-child {
                    border: none;
                }
                &:nth-child(1){
                    width: 5.4vw;
                }
                &:nth-child(2){
                    width: 8.4vw;
                }
                &:nth-child(3){
                    width: 9vw;
                }
                &:nth-child(4){
                    width: 9vw;
                }
                &:nth-child(5){
                    width: 17.3vw;
                }
                &:nth-child(6){
                    width: 7.9vw;
                }
                &:nth-child(7){
                    width:9.5vw;
                }
                &:nth-child(8){
                    width: 11.1vw;
                }
                &:nth-child(9){
                    width: 17.3vw;
                }
            }
        }
        .alarmList-wrapper {
            font-size: 0.7vw;
            >li {
                display: flex;
                align-items: center;
                height: 4.2vh;
                &:nth-child(even) {
                    background-color: red;
                }
                span {
                    display: inline-block;
                    text-align: center;
                    &:nth-child(1){
                        width: 5.4vw;
                    }
                    &:nth-child(2){
                        width: 8.4vw;
                    }
                    &:nth-child(3){
                        width: 9vw;
                    }
                    &:nth-child(4){
                        width: 9vw;
                    }
                    &:nth-child(5){
                        width: 17.3vw;
                    }
                    &:nth-child(6){
                        width: 7.9vw;
                    }
                    &:nth-child(7){
                        width:9.5vw;
                    }
                    &:nth-child(8){
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
