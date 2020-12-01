<template>
  <div class="user-wrapper">
    <header>
      <span>角色编号</span>
      <span>角色名称</span>
      <span>操作</span>
    </header>
    <ul>
      <li v-for="(item, index) in roleList" :key="index">
        <span>{{ item.id }}</span>
        <span>{{ item.name }}</span>
        <div class="operation" v-show="item.id && item.name">
          <div class="amend" @click="handleModifyClick(item.id)">修改</div>
          <div class="freeze" @click="deleteRole(item.id)">删除</div>
        </div>
      </li>
    </ul>
    <div class="create" @click="handleCreateClick">+ 新建</div>
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

    <!-- 新增角色弹窗 -->
    <el-dialog
      title="新增角色"
      :visible.sync="isCreateShow"
      width="40.1%"
      :close-on-click-modal="false"
      custom-class="create-wrapper"
    >
      <div class="username">
        <span>用户姓名</span>
        <input type="text" placeholder="请输入内容" v-model.trim="username" />
      </div>
      <div class="permission-wrapper">
        <span>权限</span>
        <el-transfer v-model="value" :data="data"></el-transfer>
      </div>
      <div class="confirm" @click="createRole">确定</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "role",
  data() {
    return {
      pageSize: 15,
      total: 0,
      currentPage: 1,
      username: "",
      data: [],
      value: [],
      isCreateShow: false,
      currentPage: 1,
      roleList: [],
    };
  },
  methods: {
    handleCreateClick() {
      this.isCreateShow = true;
      this.getPermission();
    },
    createRole() {
      this.$post("/api/v1/roles", {
        name: this.username,
        permissions: this.value,
      }).then((res) => {
        console.log(res);
        this.getRoleData();
      });
    },
    handleCurrentChange(val) {
      this.getRoleData(val);
    },
    handleModifyClick(roles_id) {
      this.getPermission(roles_id);
    },
    getPermission(roles_id) {
      this.$get("/api/v1/permission", {
        roles_id,
      }).then((res) => {
        console.log(res);
        res.data.left.forEach((item) => {
          item.label = item.name;
          item.key = item.id;
        });
        this.data = res.data.left;
      });
    },
    getRoleData(page) {
      let url = "/api/v1/rolesList";
      if (page) {
        url = url + `?page=${page}`;
      }
      this.$get(url).then((res) => {
        this.roleList = res.data;
      });
    },
    deleteRole(id) {
      this.$del("/api/v1/roles", {
        id,
      }).then((res) => {
        console.log(res);
      });
    },
  },
  mounted() {
    this.getRoleData();
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
        width: 20.3vw;
      }
      &:nth-child(2) {
        width: 20.5vw;
      }
      &:nth-child(3) {
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
      &:nth-child(even) {
        background-color: #29393e;
      }
      > span {
        display: inline-block;
        text-align: center;
        &:nth-child(1) {
          width: 20.3vw;
        }
        &:nth-child(2) {
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
      .username {
        display: flex;
        flex-direction: column;
        input {
          width: 14.8vw;
          height: 2.4vh;
        }
      }
      .permission-wrapper {
        margin-bottom: 2.3vh;
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
<style>
.el-dialog .el-dialog__body {
  padding-top: 0;
  color: #fff;
  font-size: 0.7vw;
}
.el-dialog .el-dialog__body .username {
  margin-bottom: 1.2vh;
}
.el-dialog .el-dialog__body .username input {
  width: 14.8vw;
  height: 2.4vh;
  color: #b3b3b3;
  font-size: 0.7vw;
  background-color: #0e2328;
  padding-left: 0.7vw;
  border: 1px solid #0c474c;
  outline: none;
}

.el-dialog .el-dialog__header .el-dialog__title {
  color: #fff;
  font-size: 0.9vw;
}
</style>

<style src="../../../assets/style/element.css">
</style>
