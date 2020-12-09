<template>
    <div class="system">
        <section class="left">
            <ul>
                <li v-for="(item,index) in manageList" @click="toSonRouter(item.path)" :class="[					item.path === $route.path?item.icon:item.uicon				]" :key="index">
                    <div class="manage-icon">
                        <!-- <img :src="item.icon" alt=""> -->
                    </div>
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </section>		<transition name="el-zoom-in-top" mode="out-in">
        <router-view  class="right"/>		</transition>
    </div>
</template>

<script>
  export default {
    name: "System",
    data(){
      return {		transitionName:'',
        manageList:[
          {
            name:'单位管理',
            icon:'companyActive',			uicon:'company',
            path:'/system/units'
          },
          {
            name:'用户管理',
            icon:'userActive',			uicon:'user',
            path:'/system/user'
          },
          {
            name:'角色管理',
            icon:'roleActive',			uicon:'role',
            path:'/system/role'
          },
          {
            name:'字典管理',
            icon:'dictionaryActive',			uicon:'dictionary',
            path:'/system/dictionary'
          },
          {
            name:'报警设置',
            icon:'alarmActive',			uicon:'alarm',
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
                    // background-color: #0e252a;
                    // border: 1px solid #096f74;
                    color: #8b9ea5;
                    padding-left: 2.8vw;					background-repeat: no-repeat;					background-size:100%;
                    &.active {
                        border: 1px solid #05949a;
                    }
                }				.company{					background:url("~@/assets/system/company.png") no-repeat;					background-size:100%;				}				.companyActive{					background:url("~@/assets/system/companyActive.png") no-repeat;					background-size:100%;					color: #40edff;				}				.user{					background:url("~@/assets/system/user.png") no-repeat;					background-size:100%;				}				.userActive{					background:url("~@/assets/system/userActive.png") no-repeat;					background-size:100%;					color: #40edff;				}				.role{					background:url("~@/assets/system/role.png") no-repeat;					background-size:100%;				}				.roleActive{					background:url("~@/assets/system/roleActive.png") no-repeat;					background-size:100%;					color: #40edff;				}				.dictionary{					background:url("~@/assets/system/dictionary.png") no-repeat;					background-size:100%;				}				.dictionaryActive{					background:url("~@/assets/system/dictionaryActive.png") no-repeat;					background-size:100%;					color: #40edff;				}				.alarm{					background:url("~@/assets/system/alarm.png") no-repeat;					background-size:100%;				}				.alarmActive{					background:url("~@/assets/system/alarmActive.png") no-repeat;					background-size:100%;					color: #40edff;				}
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