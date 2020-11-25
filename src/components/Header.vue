<template>
    <header>
        <div class="left">
            <div class="logo">
                <img src="" alt="">
            </div>
            <span>智能消火栓平台</span>
        </div>
        <ul class="center">
            <li
                    v-for="(item,index) in routeLists"
                    :key="index"
                    @click="$router.push(item.path)"
                    :class="{active:$route.path.indexOf(item.path) !== -1 }"
            >{{item.name}}</li>
        </ul>
        <div class="right">
            <div class="user-img"></div>
            <span class="username">admin</span>
            <div class="quit-out">
                <img src="@/assets/header/quit-out.png"
                  alt="">
            </div>
        </div>
    </header>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        routeLists: [
          {
            name: '首页',
            path: '/index'
          },
          {
            name: '数据总览',
            path: '/dataOverview'
          },
          {
            name: '报警管理',
            path: '/alarm'
          },
          {
            name: '设备管理',
            path: '/device'
          },
          {
            name: '系统管理',
            path: '/system'
          },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
    header {
        position: relative;
        z-index: 2;
        color: #fff;
        display: flex;
        align-items: center;
        height: 7.1vh;
        padding: 0 1.1vw 0 1.3vw;
        .left {
            display: flex;
            margin-right: 3.6vw;
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
                color: rgba(255,255,255,.6);
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
                margin-left: 1.1vw;
            }
        }
    }
</style>
