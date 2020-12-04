<template>
  <div>
    <ECharts
      ref="map"
      class="map"
      :options="mapOption"
      @click="handleMapClick"
    />
    <div class="second-wrapper" v-show="isSecondShow">
      <div class="list" v-for="(item, index) in secondList" :key="index">
        <img :src="item.img" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/effectScatter";
import "echarts/extension/bmap/bmap.js";
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
const secondPoint = [
  {
    name: "会展中心",
    value: [114.05798, 22.5282, 270],
  },
];
const img = {
  error: require("@/assets/index/error.png"),
  warn: require("@/assets/index/warn.png"),
  stop: require("@/assets/index/stop.png"),
  normal: require("@/assets/index/normal.png"),
};
export default {
  name: "Map",
  components: {
    ECharts,
  },
  data() {
    return {
      isSecondShow: false,
      secondList: [
        {
          name: "正常",
          img: img.normal,
        },
        {
          name: "故障",
          img: img.error,
        },
        {
          name: "告警",
          img: img.warn,
        },
        {
          name: "停用",
          img: img.stop,
        },
      ],
      mapInstance: null,
      URL: process.env.VUE_APP_BASE_URL,
      wsUrl: process.env.VUE_APP_WS_URL,
      mapOption: {
        animation: false, //解决悬浮偏移问题
        backgroundColor: "transparent",
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
        },
        bmap: {
          center: [114.05571, 22.52245],
          zoom: 12,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#113549",
                },
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#091220",
                },
              },
              {
                featureType: "boundary",
                elementType: "geometry",
                stylers: {
                  color: "#029fd4",
                },
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "highway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#005b96",
                  lightness: 1,
                },
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#12223d",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#12223d",
                },
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  color: "#056197",
                  visibility: "off",
                },
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "boundary",
                elementType: "geometry.fill",
                stylers: {
                  color: "#029fd4",
                },
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#0e1b30",
                },
              },
              {
                featureType: "label",
                elementType: "labels.text.color",
                stylers: {
                  color: "#585f5e",
                },
              },
            ],
          },
        },
        series: [
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: shenzhen,
            encode: {
              value: 2,
            },
            symbolSize: function (val) {
              return val[2] / 10;
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
              color: "#26a591",
              shadowBlur: 10,
              shadowColor: "#333",
            },
            zlevel: 1,
          },
        ],
      },
      timer: null,
      closeTimer: null,
    };
  },
  mounted() {
    this.mapInstance = this.$refs.map.chart
      .getModel()
      .getComponent("bmap")
      .getBMap();
  },
  methods: {
    handleMapClick(e) {
      if (this.mapOption.bmap.zoom === 12) {
        this.mapOption.bmap.zoom = 18;
        this.isSecondShow = true;
        this.mapOption.series[0].data = secondPoint;
        this.mapOption.series[0].symbol = "image://" + img.error;
      } else {
        this.mapOption.bmap.zoom = 12;
        this.isSecondShow = false;
        this.mapOption.series[0].data = shenzhen;
        this.mapOption.series[0].symbol = null;
      }
    },

    creatSocket() {
      let vm = this;
      vm.webSocket && vm.webSocket.close();
      vm.webSocket = new WebSocket(this.wsUrl);
      vm.webSocket.onopen = () => {
        let interfaceData = [
          {
            time: 16000,
            is_first: true,
            data: [
              {
                url: vm.URL + `/admin/Dv/getMemberList`,
                key: "getMemberList",
                type: "get",
                is_ssl: false,
                headers: "",
              },
            ],
          },
        ];
        vm.webSocket.send(JSON.stringify(interfaceData));
      };
      vm.webSocket.onmessage = (res) => {
        let data = JSON.parse(res.data);
        let dataIndexTable = {
          getMemberList: () => {
            this.bigPoint = data.getMemberList;
          },
        };
        for (let key in dataIndexTable) {
          if (key in data) {
            dataIndexTable[key]();
          }
        }
      };
    },
  },
};
</script>


<style lang="scss" scoped>
.map {
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
}
.second-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2.2vh;
  display: flex;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 0.5vw 1vw;
  .list {
    display: flex;
    align-items: center;
    margin-right: 2.5vw;
    &:last-child {
      margin: 0;
    }
    img {
      width: 1.1vw;
      height: 1.4vw;
      margin-right: 0.4vw;
    }
  }
}
</style>

<style>
.BMap_cpyCtrl {
  display: none;
}

.anchorBL {
  display: none;
}
</style>
