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
                    :class="{active:item.path ===$route.path }"
            >{{item.name}}</li>
        </ul>
        <div class="right">
            <div class="user-img"></div>
            <span class="username">admin</span>
            <div class="quit-out"></div>
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
        display: flex;
        align-items: center;
        .left {
            display: flex;
        }
        .center {
            display: flex;
            align-items: center;
            li {
                cursor: pointer;
                &.active {
                    color: red;
                }
            }
        }
        .right {
        }
    }
</style>