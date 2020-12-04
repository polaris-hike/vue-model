<template>
  <header>
    <div class="left" @click="$router.push('/')">
      <div class="logo">
        <img src="@/assets/index/logo.png" alt="" />
      </div>
      <span>智能消火栓平台</span>
    </div>
    <ul class="center">
      <li
        v-for="(item, index) in routeLists"
        :key="index"
        @click="$router.push(item.path)"
        :class="{ active: $route.path.indexOf(item.path) !== -1 }"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="right">
      <div class="user-img">
        <img src="" />
      </div>
      <span v-if="userInfo.name" class="username">{{ userInfo.name }}</span>
      <div class="quit-out" @click="quitOut">
        <img src="@/assets/header/quit-out.png" alt="" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      userInfo: {},
      routeLists: [
        {
          name: "首页",
          path: "/index",
        },
        {
          name: "数据总览",
          path: "/dataOverview",
        },
        {
          name: "报警管理",
          path: "/alarmManage",
        },
        {
          name: "设备管理",
          path: "/device",
        },
        {
          name: "系统管理",
          path: "/system",
        },
      ],
    };
  },
  methods: {
    quitOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      this.$router.push("/login");
    },
    getUserInfo() {
      if (JSON.parse(localStorage.getItem("userInfo"))) {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      }
    },
  },
  mounted() {
    this.getUserInfo();
  },
  watch: {
    $route: {
      handler() {
        if (!this.userInfo.name) {
          this.getUserInfo();
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  position: relative;
  z-index: 2;
  color: #fff;
  display: flex;
  align-items: center;
  height: 7.1vh;
  margin-bottom: 2vh;
  padding: 0 1.1vw 0 1.3vw;
  .left {
    display: flex;
    align-items: center;
    margin-right: 3.6vw;
    cursor: pointer;
    .logo {
      width: 2.2vw;
      height: 1.6vw;
      margin-right: 0.5vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
    span {
      font-family: SBOld;
      font-size: 1.3vw;
    }
  }
  .center {
    display: flex;
    align-items: center;
    li {
      width: 9.5vw;
      height: 2.2vw;
      cursor: pointer;
      text-align: center;
      line-height: 2.2vw;
      background-image: url("~@/assets/header/route.png");
      background-size: 100% 100%;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9vw;
      &.active {
        background-image: url("~@/assets/header/active-route.png");
        color: #fff;
      }
    }
  }
  .right {
    display: flex;
    margin-left: auto;
    .quit-out {
      cursor: pointer;
      margin-left: 1.1vw;
      width: 0.6vw;
      height: 0.7vw;
    }
  }
}
</style>
