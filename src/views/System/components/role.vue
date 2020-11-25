<template>
    <div class="user-wrapper">
        <header>
            <span>角色编号</span>
            <span>角色名称</span>
            <span>操作</span>
        </header>
        <ul>
            <li v-for="(item,index) in userList" :key="index">
                <span>{{item.id}}</span>
                <span>{{item.name}}</span>
                <div class="operation" v-show="item.id && item.name">
                    <div class="amend">修改</div>
                    <div class="reset">重置密码</div>
                    <div class="freeze">冻结</div>
                </div>
            </li>
        </ul>
        <div class="create">
            + 新建
        </div>
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
    name: "role",
    data(){
      return {
        currentPage:1,
        userList:[
          {
            id:1558621,
            name:'维修人员',
          },
          {
            id:4511143,
            name:'维修人员',
          },
          {
            id:'',
            name:'',
          },
          {
            id:'',
            name:'',
          },
          {
            id:'',
            name:'',
          },
          {
            id:'',
            name:'',
          },
          {
            id:'',
            name:'',
          },
          {
            id:'',
            name:'',
          },
          {
            id:'',
            name:'',
          },
          {
            id:'',
            name:'',
          },
          {
            id:'',
            name:'',
          },
          {
            id:'',
            name:'',
          },
          {
            id:'',
            name:'',
          },
          {
            id:'',
            name:'',
          }
        ]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
  }
</script>

<style lang="scss" scoped>
    .user-wrapper {
        position: relative;
        padding:  8.7vh 5.7vw  3vh 5.8vw;
        >header {
            display: flex;
            justify-content: space-around;
            margin-bottom: 2.9vh;
            font-size: 0.9vw;
            >span {
                display: inline-block;
                border-right: 1px solid red;
                text-align: center;
                &:nth-child(1){
                    width: 20.3vw;
                }
                &:nth-child(2){
                    width: 20.5vw;
                }
                &:nth-child(3){
                    width: 22.2vw;
                }
                &:last-child {
                    border: none;
                }
            }
        }
        ul {
            font-size: 0.7vw;
            > li {
                display: flex;
                align-items: center;
                height: 4.2vh;
                &:nth-child(even){
                    background-color: red;
                }
                >span {
                    display: inline-block;
                    text-align: center;
                    &:nth-child(1){
                        width: 20.3vw;
                    }
                    &:nth-child(2){
                        width: 20.5vw;
                    }
                }
                .operation {
                    display: flex;
                    justify-content: center;
                    width: 22.2vw;
                    .amend {
                        width: 3.1vw;
                        height: 1.3vw;
                        line-height: 1.3vw;
                        border: 1px solid cornflowerblue;
                        text-align: center;
                        margin-right: 0.4vw;
                    }
                    .reset {
                        width: 4.2vw;
                        height: 1.3vw;
                        line-height: 1.3vw;
                        border: 1px solid cornflowerblue;
                        text-align: center;
                        margin-right: 0.4vw;
                    }
                    .freeze {
                        width: 3.1vw;
                        height: 1.3vw;
                        line-height: 1.3vw;
                        border: 1px solid cornflowerblue;
                        text-align: center;
                    }
                }
            }
        }
        .create {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 4.2vw;
            height: 1.7vw;
            position: absolute;
            top: 1.5vw;
            left: 1.7vw;
            font-size: 0.7vw;
            border: 1px solid red;
            cursor: pointer;
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