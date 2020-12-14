<template>
  <div class="dictionary">
    <header>
      <span>名称</span>
      <!--<span>Logo</span>
      <span>照片</span>-->
      <span>简称</span>
      <span>地址</span>
      <span>电话</span>
      <span>邮箱</span>
      <span>网址</span>
     <!-- <span>排序</span>-->
      <span>备注</span>
      <span>操作</span>
    </header>
    <ul class="userList-wrapper">
        <table-component
          v-for="item in data1"
          :list="item"
        ></table-component>
       <!-- <div class="operation">
          <div class="amend">修改</div>
          <div class="freeze">删除</div>
        </div>-->
      <!-- <li v-for="(item, index) in alarmList" :key="index">
                <span>{{ item.name }}</span>
                <span>{{ item.remarks }}</span>
                <div class="operation">
                    <div class="amend" @click="handleModifyClick(item)">修改</div>
                    <div class="freeze" @click="deleteAlarm(item.id)">删除</div>
                </div>
            </li> -->
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
      width="37.6%"
      custom-class="create-wrapper"
      @close="handClose"
    >
      <ul>
        <li>
          <span>名称</span>
          <input type="text" v-model="name" placeholder="请输入内容" />
        </li>
        <li>
          <span>简称</span>
          <input type="text" v-model="name" placeholder="请输入内容" />
        </li>
        <li>
          <span>上一级</span>
          <input type="text" v-model="name" placeholder="请输入内容" />
        </li>
        <li>
          <span>地址</span>
          <input type="text" v-model="name" placeholder="请输入内容" />
        </li>
        <li>
          <span>电话</span>
          <input type="text" v-model="name" placeholder="请输入内容" />
        </li>
        <li>
          <span>邮箱</span>
          <input type="text" v-model="name" placeholder="请输入内容" />
        </li>
        <li>
          <span>网址</span>
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
      data1: [
        {
          name: "总能耗",
          number: "0",
          energyone: 14410,
          energytwo: 1230,
          energythree: 1230,
          huanRatio: -36.8,
          tongRatio: 148.5,
          child: [
            {
              name: "租户电耗",
              number: "1",
              energyone: 14410,
              energytwo: 1230,
              energythree: 1230,
              huanRatio: -36.8,
              tongRatio: 148.5,
              child: []
            },
            {
              name: "公共用电",
              number: "2",
              energyone: 14410,
              energytwo: 1230,
              energythree: 1230,
              huanRatio: -36.8,
              tongRatio: 148.5,
              child: [
                {
                  name: "暖通空调",
                  number: "2.1",
                  energyone: 14410,
                  energytwo: 1230,
                  energythree: 1230,
                  huanRatio: -36.8,
                  tongRatio: 148.5,
                  child: [
                    {
                      name: "冷站",
                      number: "2.1.1",
                      energyone: 14410,
                      energytwo: 1230,
                      energythree: 1230,
                      huanRatio: -36.8,
                      tongRatio: 148.5,
                      child: [
                        {
                          name: "冷水机组",
                          number: "2.1.1.1",
                          energyone: 14410,
                          energytwo: 1230,
                          energythree: 1230,
                          huanRatio: -36.8,
                          tongRatio: 148.5,
                          child: []
                        }
                      ]
                    },
                    {
                      name: "热力站",
                      number: "2.1.2",
                      energyone: 14410,
                      energytwo: 1230,
                      energythree: 1230,
                      huanRatio: -36.8,
                      tongRatio: 148.5,
                      child: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      pageSize: 15,
      total: 0,
      currentPage: 1,
      title: "新增",
      name: "",
      remarks: "",
      alarmList: [
        {
          name: "1",
          remarks: "2"
        },
        {
          name: "1",
          remarks: "2"
        }
      ],
      isCreateShow: false,
      isModify: false,
      canSendAddData: true,
      currentId: "",
      canDelete: true
    };
  },
  methods: {
    handleModifyClick(item) {
      this.isModify = true;
      this.isCreateShow = true;
      this.name = item.name;
      this.remarks = item.remarks;
      this.currentId = item.id;
      this.title = "修改";
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
        remarks: this.remarks
      }).then(res => {
        this.getAlarmListData();
        this.clearInput();
      });
    },
    deleteAlarm(id) {
      if (!this.canDelete) return;
      this.canDelete = false;
      this.$del("/api/v1/alarmSystem", {
        id
      })
        .then(res => {
          this.canDelete = true;
          this.getAlarmListData();
        })
        .catch(err => {
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
          remarks: this.remarks
        })
          .then(res => {
            this.canSendAddData = true;
            this.getAlarmListData();
            this.clearInput();
          })
          .catch(err => {
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
      this.$get(url).then(res => {
        this.alarmList = res.data;
        this.total = res.meta.total;
        this.currentPage = res.meta.current_page;
        this.pageSize = res.meta.per_page;
      });
    }
  },
  mounted() {
    //this.getAlarmListData();
  }
};
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
        display: flex;
        flex-wrap: wrap;
        font-size: 0.7vw;
        margin-bottom: 1.8vh;
        li {
          display: flex;
          flex-direction: column;
          margin-bottom: 1vw;
          margin-right: 2vw;
          width: 14.8vw;
          span {
            margin-bottom: 0.4vw;
            color: #fff;
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
