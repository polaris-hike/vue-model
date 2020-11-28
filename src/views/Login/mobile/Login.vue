<template>
    <div class="mobile">
        <header>
            <div class="logo"></div>
            <h2>智能消火栓平台</h2>
        </header>
        <main>
            <input type="text" placeholder="请输入账号">
            <input type="text" placeholder="请输入密码">
            <div class="login-btn">登录</div>
        </main>
    </div>
</template>

<script>
  export default {
    name: "Login.vue"
  }
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
            border: 1px solid red;
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
            color: #d6d6d6;
        }
        .login-btn {
            width: 83vw;
            height: 7.3vh;
            line-height: 7.3vh;
            text-align: center;
            border-radius: 1vw;
            background-color: #1d4f70;
        }
    }
}
</style>