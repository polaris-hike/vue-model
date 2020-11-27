<template>
    <div class="alarm-wrapper">
        <ul>
            <li>
                <span>水压报警上限</span>
                <input type="text" placeholder="请输入内容">
            </li>
            <li>
                <span>流量报警上限</span>
                <input type="text" placeholder="请输入内容">
            </li>
            <li>
                <span>电量报警下限</span>
                <input type="text" placeholder="请输入内容">
            </li>
            <li>
                <span>流量报警下限</span>
                <input type="text" placeholder="请输入内容">
            </li>
            <li>
                <span>报警通知相关责任人</span>
                <el-switch
                        v-model="value"
                        active-color="#009393"
                        inactive-color="#ff4949"
                        :width="44"
                >
                </el-switch>
            </li>
        </ul>
        <div class="save">保存</div>
    </div>
</template>

<script>
  export default {
    name: "alarm",
    data(){
      return {
        value:true
      }
    }
  }
</script>

<style lang="scss" scoped>
.alarm-wrapper {
    position: relative;
    padding-left: 3.5vw;
    padding-top: 2.9vw;
    ul {
        display: flex;
        flex-wrap: wrap;
        font-size: 0.7vw;
        > li {
            display: flex;
            flex-direction: column;
            margin-right: 5.5vw;
            margin-bottom: 2.2vw;
            span {
                margin-bottom: 0.8vw;
            }
            input {
                width: 12.4vw;
                height: 2vw;
                color: #b3b3b3;
                font-size: 0.7vw;
                background-color: #0e2328;
                padding-left: 0.7vw;
                border: 1px solid #0c474c;
                outline: none;
            }
        }
    }
    .save {
        position: absolute;
        bottom: 3.7vw;
        width: 8vw;
        height: 2.3vw;
        line-height: 2.3vw;
        text-align: center;
        background-color: #1e496d;
        border-radius: 0.1vw;
        font-size: 0.9vw;
        cursor: pointer;
    }
}

</style>
