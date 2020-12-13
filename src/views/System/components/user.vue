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
      <li v-for="(item, index) in userList" :key="index">
        <span>{{ item.name }}</span>
        <span>{{ item.email }}</span>
        <span>{{ item.roles[0] }}</span>
        <span>{{ item.phone }}</span>
        <div class="operation">
          <div class="amend" @click="handleModifyClick(item)">修改</div>
          <div class="reset" @click="resetPassword(item.id)">重置密码</div>
          <div class="freeze" @click="freeze(item)">
            {{ item.status === 1 ? "冻结" : "解冻" }}
          </div>
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

    <!-- 新增用户弹窗 -->
    <el-dialog
      :title="title"
      :visible.sync="isCreateShow"
      :close-on-click-modal="false"
      width="20.6%"
      custom-class="create-wrapper"
      @close="handClose"
    >
      <ul>
        <li>
          <span>用户姓名</span>
          <input type="text" v-model="name" placeholder="请输入内容" />
        </li>
        <li>
          <span>邮箱</span>
          <input type="text" v-model="email" placeholder="请输入内容" />
        </li>
        <li>
          <span>用户角色</span>
          <el-select v-model="role" placeholder="请输入内容">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </li>
        <li>
          <span>联系电话</span>
          <input type="text" v-model="phone" placeholder="请输入内容" />
        </li>
        <li>
          <span>用户状态</span>
          <el-select v-model="status" placeholder="请输入内容">
            <el-option
                    v-for="item in userStatusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
            >
            </el-option>
          </el-select>
        </li>
      </ul>
      <div class="confirm" @click="adduser">确定</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      title: "新增用户",
      pageSize: 15,
      total: 0,
      currentPage: 1,
      name: "",
      email: "",
      role: "",
      roleList: [],
      userStatusList:[
        {
          name:'冻结',
          id:0
        },
        {
          name:'正常',
          id:1
        }
      ],
      phone: "",
      status: "",
      currentUserId: "",
      isCreateShow: false,
      userList: [],
      cansFreeze: true,
      isModify: false,
    };
  },
  methods: {
    handleCreateClick() {
      this.isCreateShow = true;
      this.getRole();
    },
    getRole() {
      this.$get("/api/v1/roles").then((res) => {
        this.roleList = res.data;
      });
    },
    handClose() {
      this.clearInput();
    },
    handleCurrentChange(val) {
      this.getUserData(val);
    },
    handleModifyClick(data) {
      this.title = "修改用户";
      this.isModify = true;
      this.isCreateShow = true;
      this.name = data.name;
      this.phone = data.phone;
      this.email = data.email;
      this.role = data.roles[0];
      this.status = data.status;
      this.currentUserId = data.id;
    },
    adduser() {
      if (!this.isModify) {
        this.$post("/api/v1/register", {
          name: this.name,
          password: "admin",
          phone: this.phone,
          email: this.email,
          role_id: this.role,
          status: this.status,
        }).then((res) => {
          this.isCreateShow = false;
          this.getUserData();
        });
      } else {
        this.changeUserInfo();
      }
    },
    getUserData(page) {
      let url = "/api/v1/user";
      if (page) {
        url = url + `?page=${page}`;
      }
      this.$get(url).then((res) => {
        this.userList = res.data;
        this.total = res.meta.total;
        this.currentPage = res.meta.current_page;
        this.pageSize = res.meta.per_page;
      });
    },
    clearInput() {
      this.isCreateShow = false;
      this.name = "";
      this.phone = "";
      this.email = "";
      this.role = "";
      this.status = "";
      this.title = "新增用户";
    },
    changeUserInfo() {
      this.$put("/api/v1/user", {
        id: this.currentUserId,
        name: this.name,
        phone: this.phone,
        email: this.email,
        role_id: 1,
        status: this.status,
      }).then((res) => {
        this.isModify = false;
        this.getUserData();
        console.log(res);
      });
    },
    resetPassword(user_id) {
      this.$post("/api/v1/resetPassword", {
        user_id,
        password: 123456,
        confirm_password: 123456,
      }).then((res) => {
        console.log(res);
        this.getUserData();
      });
    },
    freeze(data) {
      if (!this.cansFreeze) return;
      this.cansFreeze = false;
      const status = data.status === 1 ? 0 : 1;
      this.$post("/api/v1/freezeUser", {
        user_id: data.id,
        status,
      })
        .then((res) => {
          this.cansFreeze = true;
          this.getUserData();
        })
        .catch((err) => {
          console.log(err);
          this.cansFreeze = true;
        });
    },
  },
  mounted() {
    this.getUserData();
  },
};
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
        >div {
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
  ::v-deep.el-dialog__wrapper {
    .create-wrapper {
      .el-dialog__body {
        color: #fff;
        font-size: 0.7vw;
        padding-left: 2.7vw;
      }

      ul {
        li {
          display: flex;
          flex-direction: column;
          margin-bottom: 1vw;
          width: 14.8vw;
          span {
            margin-bottom: 0.4vw;
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
      }
    }
  }

}
</style>
<style src="@/assets/style/element.css">
</style>
