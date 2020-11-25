<template>
    <div class="user-wrapper">
        <header>
            <span>用户姓名</span>
            <span>邮箱</span>
            <span>角色</span>
            <span>联系电话</span>
            <span>操作</span>
        </header>
        <ul>
            <li v-for="(item,index) in userList" :key="index">
                <span>{{item.name}}</span>
                <span>{{item.email}}</span>
                <span>{{item.role}}</span>
                <span>{{item.phone }}</span>
                <div class="operation">
                    <div class="amend">修改</div>
                    <div class="reset">重置密码</div>
                    <div class="freeze">冻结</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: "user",
    data(){
      return {
        userList:[
          {
            name:'王伟伟',
            email:'wangweiwei@165.com',
            role:'维修人员',
            phone:1382761829
          },
          {
            name:'王伟伟',
            email:'wangweiwei@165.com',
            role:'维修人员',
            phone:1382761829
          },
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
.user-wrapper {
    padding:  8.7vh 5.7vw  3vh 5.8vw;
    >header {
        display: flex;
        justify-content: space-around;
        margin-bottom: 2.9vh;
        font-size: 0.9vw;
        >span {
            display: inline-block;
            border-right: 1px solid red;
            text-align: center;
            &:nth-child(1){
                   width: 11vw;
               }
            &:nth-child(2){
                width: 11.9vw;
            }
            &:nth-child(3){
                width: 11.9vw;
            }
            &:nth-child(4){
                width: 11.9vw;
            }
            &:nth-child(5){
                width: 16.1vw;
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
            &:nth-child(even){
                background-color: red;
            }
            >span {
                display: inline-block;
                text-align: center;
                &:nth-child(1){
                    width: 11vw;
                }
                &:nth-child(2){
                    width: 11.9vw;
                }
                &:nth-child(3){
                    width: 11.9vw;
                }
                &:nth-child(4){
                    width: 11.9vw;
                }
            }
            .operation {
                display: flex;
                justify-content: center;
                width: 16.1vw;
                .amend {
                    width: 3.1vw;
                    height: 1.3vw;
                    line-height: 1.3vw;
                    border: 1px solid cornflowerblue;
                    text-align: center;
                    margin-right: 0.4vw;
                }
                .reset {
                    width: 4.2vw;
                    height: 1.3vw;
                    line-height: 1.3vw;
                    border: 1px solid cornflowerblue;
                    text-align: center;
                    margin-right: 0.4vw;
                }
                .freeze {
                    width: 3.1vw;
                    height: 1.3vw;
                    line-height: 1.3vw;
                    border: 1px solid cornflowerblue;
                    text-align: center;
                }
            }
        }
    }
}
</style>