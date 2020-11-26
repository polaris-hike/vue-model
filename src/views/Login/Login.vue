<template>
    <div class="login-wrapper">
        <div class="center-box">
            <header>
                <div class="logo"></div>
                <span>智能消火栓平台</span>
            </header>
            <main>
                <input type="text" placeholder="邮箱" v-model="email">
                <input type="text" placeholder="密码" v-model="password">
                <div class="login-btn" @click="handleLogin">登录</div>
            </main>
        </div>
    </div>
</template>

<script>
  export default {
    name: "login",
    data(){
      return {
        email:"",
        password:""
      }
    },
    methods:{
      handleLogin(){

      }
    }
  }
</script>

<style lang="scss" scoped>
.login-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .center-box {
        width: 55.6vw;
        height: 55.5vh;
        position: absolute;
        left: 22.2vw;
        top: 22.1vh;
        border: 1px solid red;
        padding-left: 8.1vw;
        padding-top: 6.5vh;
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
            input {
                width: 15.8vw;
                height: 3.6vh;
                margin-bottom: 2.7vh;
            }
            .login-btn {
                width: 15.8vw;
                height: 3.6vh;
                text-align: center;
                line-height: 3.6vh;
                border: 1px solid red;
                font-size: 0.7vw;
            }
        }
    }
}
</style>