<template>
  <div class="mobile">
    <header>
      <div class="logo">
        <img src="@/assets/index/logo.png" alt="" />
      </div>
      <h2>智能消火栓平台</h2>
    </header>
    <main>
      <input type="text" placeholder="请输入账号" v-model="email" />
      <input type="password" placeholder="请输入密码" v-model="password" />
      <div class="login-btn" @click="handleLogin">登录</div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Login.vue",
  data() {
    return { email: "", password: "" };
  },
  methods: {
    handleLogin() {
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
};
</script>

<style lang="scss" scoped>
.mobile {
  header {
    display: flex;
    align-items: center;
    padding-top: 25.5vh;
    margin: 0 13.4vw 9.6vh 13vw;
    .logo {
      width: 18vw;
      height: 12.5vw;
      margin-right: 4.2vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h2 {
      font-size: 7vw;
    }
  }
  main {
    margin: 0 8.5vw;
    input {
      width: 100%;
      border: none;
      outline: none;
      border-bottom: 1px solid #037290;
      background: unset;
      margin-bottom: 4.1vh;
      padding-bottom: 2.7vh;
      padding-left: 1.4vw;
      font-size: 3.9vw;
      color: #d6d6d6;
    }
    .login-btn {
      width: 83vw;
      height: 7.3vh;
      line-height: 7.3vh;
      text-align: center;
      border-radius: 1vw;
      font-size: 4.3vw;
      background-color: #1d4f70;
    }
  }
}
</style>