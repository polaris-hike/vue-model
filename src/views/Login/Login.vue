<template>
  <div>
    <div class="login-wrapper" v-if="!isMobile">
      <div class="center-box">
        <header>
          <div class="logo"></div>
          <span>智能消火栓平台</span>
        </header>
        <main>
          <div class="email">
            <i class="icon-search"></i>
            <input
              type="text"
              placeholder="邮箱"
              v-model="email"
              @keyup.enter="handleLogin"
            />
          </div>
          <div class="password">
            <i class="icon-search"></i>
            <input
              type="password"
              placeholder="密码"
              v-model="password"
              @keyup.enter="handleLogin"
            />
          </div>
          <div class="login-btn" @click="handleLogin">登录</div>
        </main>
      </div>
    </div>
    <Login v-else />
  </div>
</template>

<script>
import Login from "./mobile/Login";
export default {
  name: "login",
  data() {
    return {
      isMobile: false,
      email: "",
      password: "",
    };
  },
  components: {
    Login,
  },
  methods: {
    handleLogin() {
      console.log(1);
      this.$post("/api/v1/login", {
        email: this.email,
        password: this.password,
      }).then((res) => {
        if (res.code === 200) {
          localStorage.setItem("token", res.data.token);
          this.$router.push("/");
        }
      });
    },
  },
  created() {
    this.isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
      navigator.userAgent
    );
  },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("~@/assets/login/page-bg.png");
  background-size: 100% 100%;
  .center-box {
    width: 55.6vw;
    height: 55.5vh;
    position: absolute;
    left: 22.2vw;
    top: 22.1vh;
    padding-left: 8.1vw;
    padding-top: 6.5vh;
    background-image: url("~@/assets/login/box-bg.png");
    background-size: 100% 100%;
    header {
      display: flex;
      align-items: center;
      margin-bottom: 8.1vh;
      .logo {
        width: 4.1vw;
        height: 2.9vw;
        border: 1px solid red;
        margin-right: 0.9vw;
      }
      span {
        font-size: 1.7vw;
      }
    }
    main {
      display: flex;
      flex-direction: column;
      .email {
        position: relative;
        width: 15.8vw;
        height: 3.6vh;
        margin-bottom: 2.7vh;

        i {
          position: absolute;
          left: 0.6vw;
          top: 50%;
          transform: translateY(-50%);
          width: 0.8vw;
          height: 0.7vw;
          background-image: url("~@/assets/login/email.png");
          background-size: 100% 100%;
        }
      }
      .password {
        position: relative;
        width: 15.8vw;
        height: 3.6vh;
        margin-bottom: 2.7vh;

        i {
          position: absolute;
          left: 0.6vw;
          top: 50%;
          transform: translateY(-50%);
          width: 0.8vw;
          height: 0.7vw;
          background-image: url("~@/assets/login/password.png");
          background-size: 100% 100%;
        }
      }
      input {
        width: 100%;
        height: 100%;
        padding-left: 2vw;
      }
      .login-btn {
        width: 15.8vw;
        height: 4vh;
        text-align: center;
        line-height: 3.6vh;
        border: 1px solid red;
        font-size: 0.7vw;
        cursor: pointer;
      }
    }
  }
}
</style>