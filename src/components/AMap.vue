<template>
  <div id="echarts-amap">
    <!--   <v-chart
    style="width: 100vw; height: 100vh"
    class="map"
    autoresize
    ref="instance"
    :options="options"
  ></v-chart> -->
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/lib/chart/effectScatter";
import vECharts from "vue-echarts";
import "echarts-extension-amap";

import { convertData, data } from "./mapPoint";
const shenzhen = [
  {
    name: "宝安区",
    value: [113.890267, 22.557764, 270],
  },
  {
    name: "龙岗区",
    value: [114.24771, 22.71986, 270],
  },
  {
    name: "南山区",
    value: [113.93029, 22.53291, 270],
  },
  {
    name: "福田区",
    value: [114.05571, 22.52245, 270],
  },
];
export default {
  components: {
    "v-chart": vECharts,
  },
  data() {
    return {
      options: {
        amap: {
          viewMode: "3D",

          center: [114.05571, 22.52245],
          zoom: 12,

          resizeEnable: true,

          mapStyle: "amap://styles/dark",

          renderOnMoving: true,

          echartsLayerZIndex: 2019,
        },
        tooltip: {
          trigger: "item",
        },
        animation: false,
        series: [
          {
            name: "PM2.5",
            type: "effectScatter",

            coordinateSystem: "amap",

            data: shenzhen,
            symbolSize: function (val) {
              return val[2] / 10;
            },
            encode: {
              value: 2,
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            itemStyle: {
              color: "#00c1de",
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.initMap();
    });
  },
  methods: {
    handleMapClick(e) {},
    initMap() {
      var chart = echarts.init(document.getElementById("echarts-amap"));
      chart.setOption(this.options);
      // get amap instance
      var amap = chart.getModel().getComponent("amap").getAMap();
      // operations below are the same as amap
      /*   amap.addControl(new AMap.Scale()); */
      /*   amap.addControl(new AMap.ToolBar());  */
    },
  },
};
</script>

<style>
.map,
#echarts-amap {
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
}
</style>
