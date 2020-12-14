<template>
    <div class="units">
        <header>
            <span v-for="(item,index) in nameList" :key="index">{{item}}</span>
        </header>
        <ul class="userList-wrapper">
            <li v-for="(item, index) in alarmList" :key="index">
                <span>{{ item.name }}</span>
                <span>{{ item.remarks }}</span>
                <span>{{ item.remarks }}</span>
                <span>{{ item.remarks }}</span>
                <span>{{ item.remarks }}</span>
                <span>{{ item.remarks }}</span>
                <span>{{ item.remarks }}</span>
                <span>{{ item.remarks }}</span>
                <span>{{ item.remarks }}</span>
                <span>{{ item.remarks }}</span>
                <div class="operation">
                    <div class="amend" @click="handleModifyClick(item)">修改</div>
                    <div class="freeze" @click="deleteAlarm(item.id)">删除</div>
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
                width="30%"
                top="2vh"
                custom-class="create-wrapper"
                @close="handClose"
        >
            <ul>
                <li>
                    <span>名称:</span>
                    <input type="text" v-model="name" placeholder="请输入内容" />
                </li>
                <li>
                    <span>简称:</span>
                    <input type="text" v-model="name" placeholder="请输入内容" />
                </li>
                <li>
                    <span>地址:</span>
                    <input type="text" v-model="name" placeholder="请输入内容" />
                </li>
                <li>
                    <span>电话:</span>
                    <input type="text" v-model="name" placeholder="请输入内容" />
                </li>
                <li>
                    <span>邮箱:</span>
                    <input type="text" v-model="name" placeholder="请输入内容" />
                </li>
                <li>
                    <span>网址:</span>
                    <input type="text" v-model="name" placeholder="请输入内容" />
                </li>
                <li>
                    <span>排序:</span>
                    <input type="text" v-model="name" placeholder="请输入内容" />
                </li>
                <li>
                    <span>备注</span>
                    <textarea
                            name=""
                            v-model="remarks"
                            id=""
                            cols="30"
                            rows="10"
                    ></textarea>
                </li>
                <li>
                    <span>logo</span>
                    <div class="input-wrapper">
                        <input class="file" type="file" @change="getFile($event)" />
                        <div class="mask">
                            <img src="@/assets/device/add.png" alt="">
                        </div>
                    </div>
                </li>
                <li>
                    <span>照片</span>
                    <div class="input-wrapper">
                        <input class="file" type="file" @change="getFile($event)" />
                        <div class="mask">
                            <img src="@/assets/device/add.png" alt="">
                        </div>
                    </div>
                </li>
            </ul>
            <div class="confirm" @click="createAlarm">确定</div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "units",
      data() {
          return {
              nameList:['名称','logo','照片','简称','地址','电话','邮箱','网址','排序','备注','操作'],
              pageSize: 15,
              total: 0,
              currentPage: 1,
              title: "新增",
              name: "",
              remarks: "",
              alarmList: [
                  {
                      name:'1',
                      remarks:'2'
                  },
                  {
                      name:'1',
                      remarks:'2'
                  },
              ],
              isCreateShow: false,
              isModify: false,
              canSendAddData: true,
              currentId: "",
              canDelete: true,
              addArr: [],
          };
      },
      methods: {
          getFile(event) {
              var file = event.target.files;
              for (var i = 0; i < file.length; i++) {
                  //    上传类型判断
                  var imgName = file[i].name;
                  var idx = imgName.lastIndexOf(".");
                  if (idx !== -1) {
                      var ext = imgName.substr(idx + 1).toUpperCase();
                      ext = ext.toLowerCase();
                      if (ext !== 'pdf' && ext !== 'doc' && ext !== 'docx') {

                      } else {
                          this.addArr.push(file[i]);
                      }
                  } else {

                  }
              }
          },
          handleModifyClick(item) {
              this.isModify = true;
              this.isCreateShow = true;
              this.name = item.name;
              this.remarks = item.remarks;
              this.currentId = item.id;
              this.title='修改'
          },
          clearInput() {
              this.isCreateShow = false;
              this.isModify = false;
              this.name = "";
              this.remarks = "";
          },
          modifyAlarm() {
              this.$put("/api/v1/alarmSystem", {
                  id: this.currentId,
                  name: this.name,
                  remarks: this.remarks,
              }).then((res) => {
                  this.getAlarmListData();
                  this.clearInput();
              });
          },
          deleteAlarm(id) {
              if (!this.canDelete) return;
              this.canDelete = false;
              this.$del("/api/v1/alarmSystem", {
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
                      remarks: this.remarks,
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
          handClose() {},
          getAlarmListData(page) {
              let url = "/api/v1/alarmSystem";
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
          //this.getAlarmListData();
      },
  }
</script>

<style lang="scss" scoped>
    .units {
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
        ::v-deep.el-dialog__wrapper {
            .create-wrapper {
                .el-dialog__body {
                    //padding: 0 5vw;
                    ul {
                        li {
                            display: flex;
                            align-items: center;
                            margin-bottom: 1vw;
                            span {
                                margin-bottom: 0.4vw;
                                margin-right: 1vw;
                                color:#fff;
                            }
                            input {
                                width: 20vw;
                                height: 3.7vh;
                                padding-left: 0.6vw;
                                color: #fff;
                                background: #172f3b;
                                border: 1px solid #134a55;
                                outline: none;
                            }
                            textarea {
                                width: 20vw;
                                height: 10vh;
                                color: #fff;
                                background: #172f3b;
                                border: 1px solid #134a55;
                                padding-left: 0.6vw;
                                outline: none;
                            }
                            .input-wrapper {
                                width: 20vw;
                                height: 6vw;
                                position: relative;
                                border: 1px solid #1e6f85;

                                input {
                                    opacity: 0;
                                    width: 100%;
                                    height: 100%;
                                    position: absolute;
                                    left: 0;
                                    cursor: pointer;
                                }

                                .mask {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    width: 100%;
                                    height: 100%;
                                }
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
    }
</style>