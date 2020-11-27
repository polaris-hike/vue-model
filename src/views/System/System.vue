<template>
    <div class="system">
        <section class="left">
            <ul>
                <li v-for="(item,index) in manageList" @click="toSonRouter(item.path)" :class="{active:item.path === $route.path}" :key="index">
                    <div class="manage-icon">
                        <img :src="item.icon" alt="">
                    </div>
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </section>
        <router-view  class="right"/>
    </div>
</template>

<script>
  export default {
    name: "System",
    data(){
      return {
        manageList:[
          {
            name:'单位管理',
            icon:'',
            path:'/system/units'
          },
          {
            name:'用户管理',
            icon:'',
            path:'/system/user'
          },
          {
            name:'角色管理',
            icon:'',
            path:'/system/role'
          },
          {
            name:'字典管理',
            icon:'',
            path:'/system/dictionary'
          },
          {
            name:'报警设置',
            icon:'',
            path:'/system/alarmSetting'
          },
        ]
      }
    },
    methods:{
      toSonRouter(path){
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="scss" scoped>
.system {
    display: flex;
    padding-left: 5.5vw;
    section {
        &.left {
            ul {
                > li {
                    display: flex;
                    align-items: center;
                    width: 12.4vw;
                    height: 3vw;
                    margin-bottom: 1vw;
                    cursor: pointer;
                    font-size: 0.7vw;
                    background-color: #0e252a;
                    border: 1px solid #096f74;
                    color: #8b9ea5;
                    padding-left: 2.8vw;
                    &.active {
                        border: 1px solid #05949a;
                        color: #40edff;
                    }
                }
            }
        }
    }
    .right {
        width: 74.7vw;
        height: 82.4vh;
        border: 1px solid #428184;
        margin-left: 1.1vw;
    }
}
</style>
<style src="../../assets/style/element.css">
</style>