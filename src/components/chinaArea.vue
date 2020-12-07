<template>
    <div class="china-area">
        <el-select popper-class="select" v-model="prov" placeholder="省份">
            <el-option
                    v-for="item in arr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
            >
            </el-option>
        </el-select>
        <el-select popper-class="select" v-model="city" placeholder="城市">
            <el-option
                    v-for="item in cityArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
            >
            </el-option>
        </el-select>
        <el-select popper-class="select" v-model="district" placeholder="区域">
            <el-option
                    v-for="item in districtArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
            >
            </el-option>
        </el-select>
        <el-select popper-class="select" v-if="$route.path === '/alarmManage'||$route.path === '/dataOverview' "
                   v-model="status" placeholder="状态">
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
    import arrAll from './proviceData';

    export default {
        name: 'chinaArea',
        data() {
            return {
                province: '',
                area: '',
                status: '',
                roleList: [],
                prov: '',
                city: '',
                district: '',
                arr: arrAll,
                cityArr: [],
                districtArr: []
            };
        },
        methods: {
            updateCity() {
                for (var i in this.arr) {
                    var obj = this.arr[i];
                    if (obj.name == this.prov) {
                        this.cityArr = obj.sub;
                        break;
                    }
                }
                this.city = this.cityArr[1].name;
            },
            updateDistrict() {
                for (var i in this.cityArr) {
                    var obj = this.cityArr[i];
                    if (obj.name == this.city) {
                        this.districtArr = obj.sub;
                        break;
                    }
                }
                if (this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
                    this.district = this.districtArr[1].name;
                } else {
                    this.district = '';
                }
            },
            setAreaData() {
                this.$emit('setAreaData', {
                    prov: this.prov,
                    city: this.city,
                    district: this.district
                })
            }
        },
        beforeMount() {
            this.updateCity();
            this.updateDistrict();
        },
        watch: {
            prov() {
                this.updateCity();
                this.updateDistrict();
                this.setAreaData()
            },
            city() {
                this.updateDistrict();
                this.setAreaData()
            },
            district(val){
                this.setAreaData()
            }
        }
    };
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

                .el-input__inner {
                    background-color: #0f1f24;
                    height: 3.7vh;
                    border-radius: 0;
                    color: #fff;
                }
            }

            ::v-deep .el-select__caret {
                color: #01eff0;
            }
        }
    }
</style>