<template>
    <div class="dictionary">
        <header>
            <span>名称</span>
            <span>备注</span>
            <span>操作</span>
        </header>
        <ul class="userList-wrapper">
            <li v-for="(item, index) in alarmList" :key="index">
                <span>{{ item.name }}</span>
                <span>{{ item.remark }}</span>
                <div class="operation">
                    <div class="amend" @click="handleModifyClick(item)">修改</div>
					<el-popconfirm
					  confirm-button-text='是的'
					  cancel-button-text='取消'
					  icon="el-icon-error"
					  icon-color="red"
					  title="确定删除吗？"
								@confirm="deleteAlarm(item.id)"
					>
					<div class="freeze"slot="reference">删除</div>
					</el-popconfirm>
                    
                </div>
            </li>
        </ul>
        <div @click="handleCreateClick" class="create">+ 新建</div>
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

        <!-- 新增弹窗 -->
        <el-dialog
                :title="title"
                :visible.sync="isCreateShow"
                :close-on-click-modal="false"
                width="18.6%"
                custom-class="create-wrapper"
                @close="handClose"
        >
            <ul>
                <li>
                    <span>名称</span>
                    <input type="text" v-model="name" placeholder="请输入内容" />
                </li>
                <li>
                    <span>备注</span>
                    <textarea
                            placeholder="请输入内容"
                            name=""
                            v-model="remark"
                            id=""
                            cols="30"
                            rows="10"
                    ></textarea>
                </li>
            </ul>
            <div class="confirm" @click="createAlarm">确定</div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "dictionary",
      data() {
          return {
              pageSize: 15,
              total: 0,
              currentPage: 1,
              title: "新增",
              name: "",
              remark: "",
              alarmList: [],
              isCreateShow: false,
              isModify: false,
              canSendAddData: true,
              currentId: "",
              canDelete: true,
          };
      },
      methods: {
          handleModifyClick(item) {
              this.isModify = true;
              this.isCreateShow = true;
              this.name = item.name;
              this.remark = item.remark;
              this.currentId = item.id;
              this.title='修改'
          },
          clearInput() {
              this.isCreateShow = false;
              this.isModify = false;
              this.name = "";
              this.remark = "";
          },
          modifyAlarm() {
              this.$put("/api/v1/dictionary", {
                  id: this.currentId,
                  name: this.name,
                  remark: this.remark,
              }).then((res) => {
                  this.getAlarmListData();
                  this.clearInput();
              });
          },
          deleteAlarm(id) {
              if (!this.canDelete) return;
              this.canDelete = false;
              this.$del("/api/v1/dictionary", {
                  id,
              })
                  .then((res) => {
                      this.canDelete = true;
                      this.getAlarmListData();
                  })
                  .catch((err) => {
                      this.canDelete = true;
                  });
          },
          handleCurrentChange(val) {
              this.getAlarmListData(val);
          },
          handleCreateClick() {
              this.isCreateShow = true;
          },
          createAlarm() {
              if (this.isModify) {
                  this.modifyAlarm();
              } else {
                  if (!this.canSendAddData) return;
                  this.canSendAddData = false;
                  this.$post("/api/v1/alarmSystem", {
                      name: this.name,
                      remark: this.remark,
                  })
                      .then((res) => {
                          this.canSendAddData = true;
                          this.getAlarmListData();
                          this.clearInput();
                      })
                      .catch((err) => {
                          this.canSendAddData = true;
                      });
              }
          },
          handClose() {
              this.name = ''
              this.remark =''
          },
          getAlarmListData(page) {
              let url = "/api/v1/dictionary";
              if (page) {
                  url = url + `?page=${page}`;
              }
              this.$get(url).then((res) => {
                  this.alarmList = res.data;
                  this.total = res.meta.total;
                  this.currentPage = res.meta.current_page;
                  this.pageSize = res.meta.per_page;
              });
          },
      },
      mounted() {
          this.getAlarmListData();
      },
  }
</script>

<style lang="scss" scoped>
    .dictionary {
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
                flex: 1;
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
                    flex: 1;
                }
                .operation {
                    display: flex;
                    justify-content: center;
                    flex: 1;
                    > div {
                        cursor: pointer;
                    }
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
                        background-color: #d84e4e;
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
                        width: 14.8vw;
                        span {
                            margin-bottom: 0.4vw;
                            color:#fff;
                        }
                        input {
                            width: 14.8vw;
                            height: 3.7vh;
                            padding-left: 0.6vw;
                            color: #fff;
                            background: #172f3b;
                            border: 1px solid #134a55;
                            outline: none;
                        }
                        textarea {
                            color: #fff;
                            background: #172f3b;
                            border: 1px solid #134a55;
                            padding-left: 0.6vw;
                            outline: none;
                        }
                    }
                }
                .confirm {
                    width: 4.7vw;
                    height: 1.7vw;
                    margin: 0 auto;
                    background: #1e4d70;
                    border-radius: 0.1vw;
                    text-align: center;
                    line-height: 1.7vw;
                    cursor: pointer;
                    color: #fff;
                }
            }
        }
    }
</style>