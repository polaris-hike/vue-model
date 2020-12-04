import echarts from 'echarts'
const lineOptions = {
  grid: {
    width: "90%",
    height: "80%",
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      snap: true,
      lineStyle: {
        color: 'rgba(255,255,255,.2)'
      },
      label: {
        show: false,
        backgroundColor: 'red'
      }
    }
  },
  xAxis: {
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },

    axisLabel: {
      color: "rgba(255,255,255,0.6)"
    },
    type: 'category',
    boundaryGap: false,
    data: ['11月28日', '11月29日', '11月30日', '12月1日', '12月2日', '12月3日', '12月4日']
  },
  yAxis: {
    axisLine: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255,255,255,.2)'
      }
    },
    axisLabel: {
      color: "rgba(255,255,255,0.6)"
    },
    axisTick: {
      show: false
    },
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line',
    symbolSize: 0,
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: '#b94041'
      }, {
        offset: 1,
        color: 'rgba(251,44,75,0)'
      }])
    }
  }]
};



const pieOption = {
  backgroundColor: 'transparent',
  tooltip: {
    show: true,
  },
  series: [
    {
      type: 'pie',
      radius: ['68%', '75%'],
      center: ['50%', '50%'],
      hoverAnimation: false,
      z: 10,
      label: {
        show: false
      },
      data: [
        {
          value: 30,
          name: '电压异常',
          itemStyle: {
            color: '#ffd506',
            color2: 'rgba(1,98,254,0.1)'

          },
        },
        {
          value: 30,
          name: '水压异常',
          itemStyle: {
            color: '#ff0000',
            color2: 'rgba(0,180,255,0.1)'

          },
        },
        {
          value: 40,
          name: '非法用水',
          itemStyle: {
            color: '#33e2ff',
          }
        }
      ],
      labelLine: {
        show: false,
      },
    },
    {
      type: 'pie',
      radius: ['54%', '68%'],
      center: ['50%', '50%'],
      hoverAnimation: false,
      label: {
        show: false,
      },
      data: [
        {
          value: 30,
          name: '电压异常',
          itemStyle: {
            color: '#ffd506',
            opacity: 0.4,
          },
        },
        {
          value: 30,
          name: '水压异常',
          itemStyle: {
            color: '#ff0000',
            opacity: 0.4,
          },
        },
        {
          value: 40,
          name: '非法用水',
          itemStyle: {
            color: '#33e2ff',
            opacity: 0.4,
          },
        }
      ],
      labelLine: {
        show: false,
      },
    },
    {
      tooltup: {
        show: false
      },
      type: 'pie',
      radius: ['0%', '41%'],
      center: ['50%', '50%'],
      hoverAnimation: false,
      clockWise: false,
      data: [100],
      itemStyle: {
        normal: {
          borderColor: 'rgba(24, 37, 43,.5)',
          borderWidth: 0,
          color: "rgba(24, 37, 43,1)"
        }
      },
      label: {
        show: false
      }
    }
  ],
}
export { lineOptions, pieOption }