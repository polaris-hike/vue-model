<template>
  <!-- <div id="echarts-amap"> -->
  <v-chart
    style="width: 100vw; height: 100vh"
    class="chart"
    autoresize
    ref="instance"
    :options="options"
  ></v-chart>
  <!--  </div> -->
</template>

<script>
import echarts from "echarts";

import vECharts from "vue-echarts";
import "echarts-extension-amap";

import { convertData, data } from "./mapPoint";

export default {
  components: {
    "v-chart": vECharts,
  },
  data() {
    return {
      options: {
        amap: {
          viewMode: "3D",

          center: [108.39, 39.9],

          zoom: 4,

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
            type: "scatter",

            coordinateSystem: "amap",

            data: convertData(data),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            encode: {
              value: 2,
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: false,
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
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "amap",
            data: convertData(
              data
                .sort(function (a, b) {
                  return b.value - a.value;
                })
                .slice(0, 6)
            ),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            encode: {
              value: 2,
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            itemStyle: {
              color: "#fff",
              shadowBlur: 10,
              shadowColor: "#333",
            },
            zlevel: 1,
          },
        ],
      },
    };
  },
  mounted() {
    /*  var chart = echarts.init(document.getElementById("echarts-amap"));
            chart.setOption(this.options);
            // get amap instance
            var amap = chart.getModel().getComponent("amap").getAMap();
            // operations below are the same as amap
            amap.addControl(new AMap.Scale());
            amap.addControl(new AMap.ToolBar()); */
  },
};
</script>

<style>
#echarts-amap {
  position: fixed !important;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
</style>
