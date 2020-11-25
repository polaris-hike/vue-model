<template>
    <div :style="chartContainerStyle"
         class="chartContainer">
        <slot name="animate">
            <pieSelect v-bind="$attrs">
            </pieSelect>
        </slot>
        <!--<slot name="label"
              :labelName="labelName"
              :labelValue="labelValue"
              :labelPercent="labelPercent">
            <span class="label allCenter2">
            <span>{{labelName}}</span>
            <br>
            <span>{{labelPercent}}</span>
        </span>
        </slot>-->

        <slot name="chart">
            <vECharts :autoresize="true"
                      @pieselected="pieSelected"
                      :options="options"
                      ref='ecInstance'></vECharts>
        </slot>

    </div>
</template>

<script>
  import vECharts from 'vue-echarts';
  import pieSelect from "./pieSelect";
  import 'echarts/lib/chart/pie';
  import {sum} from "lodash";

  export default {
    name: "customizedPie",
    props: {
      options: Object,
      chartContainerStyle: Object,
    },
    components: {
      vECharts,
      pieSelect
    },
    methods: {
      pieSelected(params) {
        let data = this.options.series[0].data;
        this.labelName = params.name
        this.labelValue = data.find((ele) => ele.name === params.name).value
        this.labelPercent=(this.labelValue/this.valueSum*100).toFixed(2)+'%'
      }
    },
    data() {
      return {
        valueSum:'',
        labelName: '',
        labelValue: '',
        labelPercent:''
      }
    },
    mounted(){
      this.valueSum=sum(this.options.series[0].data.map(ele=>ele.value));
    }
  }
</script>

<style lang="scss"
       scoped>
    .chartContainer {
        position: relative;
        width: 9vw;
    }

    .chartContainer .echarts {
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
    }

    .label {
        display: flex;
        flex-direction: column;
        z-index: 3;
        font-size: 0.8vw;
        text-align: center;
        color: #69e5c4
    }
</style>
