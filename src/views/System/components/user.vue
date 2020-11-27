<template>
    <div class="user-wrapper">
        <header>
            <span>用户姓名</span>
            <span>邮箱</span>
            <span>角色</span>
            <span>联系电话</span>
            <span>操作</span>
        </header>
        <ul class="userList-wrapper">
            <li v-for="(item,index) in userList" :key="index">
                <span>{{item.name}}</span>
                <span>{{item.email}}</span>
                <span>{{item.role}}</span>
                <span>{{item.phone }}</span>
                <div class="operation">
                    <div class="amend">修改</div>
                    <div class="reset">重置密码</div>
                    <div class="freeze">冻结</div>
                </div>
            </li>
        </ul>
        <div @click="isCreateShow=true" class="create">
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


        <!-- 新增用户弹窗 -->
        <el-dialog
                title="新增用户"
                :visible.sync="isCreateShow"
                width="20.6%"
                custom-class="create-wrapper"
        >
            <ul>
                <li>
                    <span>用户姓名</span>
                    <input type="text">
                </li>
                <li>
                    <span>邮箱</span>
                    <input type="text">
                </li>
                <li>
                    <span>用户角色</span>
                    <input type="text">
                </li>
                <li>
                    <span>联系电话</span>
                    <input type="text">
                </li>
                <li>
                    <span>用户状态</span>
                    <input type="text">
                </li>
            </ul>
            <div class="confirm">确定</div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        isCreateShow: false,
        currentPage: 1,
        userList: [
          {
            name: '王伟伟',
            email: 'wangweiwei@165.com',
            role: '维修人员',
            phone: 1382761829
          },
          {
            name: '王伟伟',
            email: 'wangweiwei@165.com',
            role: '维修人员',
            phone: 1382761829
          },
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
        padding: 8.7vh 5.7vw 3vh 5.8vw;
        > header {
            display: flex;
            justify-content: space-around;
            margin-bottom: 2.9vh;
            font-size: 0.9vw;
            > span {
                display: inline-block;
                border-right: 1px solid #303f42;
                text-align: center;
                &:nth-child(1) {
                    width: 11vw;
                }
                &:nth-child(2) {
                    width: 11.9vw;
                }
                &:nth-child(3) {
                    width: 11.9vw;
                }
                &:nth-child(4) {
                    width: 11.9vw;
                }
                &:nth-child(5) {
                    width: 16.1vw;
                }
                &:last-child {
                    border: none;
                }
            }
        }
        .userList-wrapper {
            font-size: 0.7vw;
            > li {
                display: flex;
                align-items: center;
                height: 4.2vh;
                &:nth-child(even) {
                    background-color: #29393e;
                }
                > span {
                    display: inline-block;
                    text-align: center;
                    &:nth-child(1) {
                        width: 11vw;
                    }
                    &:nth-child(2) {
                        width: 11.9vw;
                    }
                    &:nth-child(3) {
                        width: 11.9vw;
                    }
                    &:nth-child(4) {
                        width: 11.9vw;
                    }
                }
                .operation {
                    display: flex;
                    justify-content: center;
                    width: 16.1vw;
                    .amend {
                        width: 3.1vw;
                        height: 1.3vw;
                        line-height: 1.3vw;
                        background-color: #00a5a5;
                        text-align: center;
                        margin-right: 0.4vw;
                    }
                    .reset {
                        width: 4.2vw;
                        height: 1.3vw;
                        line-height: 1.3vw;
                        background-color: #d8a932;
                        text-align: center;
                        margin-right: 0.4vw;
                    }
                    .freeze {
                        width: 3.1vw;
                        height: 1.3vw;
                        line-height: 1.3vw;
                        background-color: #707070;
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
            background-color: #25a9cc;
            cursor: pointer;
        }
        .pagination {
            position: absolute;
            bottom: 3vh;
            left: 50%;
            transform: translateX(-50%);
        }
        .create-wrapper {
            .el-dialog__body {
                ul {
                    li {
                        display: flex;
                        flex-direction: column;
                        margin-bottom: 1vw;
                        span {
                            margin-bottom: 0.4vw;
                        }
                    }
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