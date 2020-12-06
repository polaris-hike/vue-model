<template>
<div class="china-area">
    <el-select popper-class="select" v-model="province" placeholder="省份">
        <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
        >
        </el-option>
    </el-select>
    <el-select popper-class="select"  v-model="city" placeholder="城市">
        <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
        >
        </el-option>
    </el-select>
    <el-select popper-class="select"  v-model="area" placeholder="区域">
        <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
        >
        </el-option>
    </el-select>
    <el-select popper-class="select" v-if="$route.path === '/alarmManage'||$route.path === '/dataOverview' "  v-model="status" placeholder="状态">
        <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
        >
        </el-option>
    </el-select>
</div>

</template>

<script>
    export default {
        name: "chinaArea",
        data(){
            return {
                province:'',
                city:'',
                area:'',
                status:'',
                roleList:[]
            }
        }
    }
</script>

<style lang="scss" scoped>
.china-area {
    .el-select {
        width: 10.6vw;
        margin-right: 0.8vw;
        ::v-deep .el-input {
            &::before {
                content: "";
                width: 0.3vw;
                height: 1.3vw;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 2vw;
                background-image: url("~@/assets/index/input-right.png");
                background-size: 100% 100%;
            }
            .el-input__inner{
                background-color: #0f1f24;
                height: 3.7vh;
                border-radius: 0;
            }
        }




        ::v-deep .el-select__caret{
            color: #01eff0;
        }
    }
}
</style>