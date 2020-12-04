const  lineOptions ={
  grid: {
    width: "90%",
    height: "80%",
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    axisTick:{
      show:false
    },
    axisLine:{
      show:false
    },
    axisLabel:{
      color:"rgba(255,255,255,0.6)"
    },
    type: 'category',
      boundaryGap: false,
      data: ['11月28日', '11月29日', '11月30日', '12月1日', '12月2日', '12月3日', '12月4日']
  },
  yAxis: {
    axisLine:{
      show:false
    },
    axisLabel:{
      color:"rgba(255,255,255,0.6)"
    },
    axisTick:{
      show:false
    },
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line',
    areaStyle: {}
  }]
};



const pieOption={
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
        show:false
      },
      data: [
        {
          value: 30,
          name: '非法用水',
          itemStyle: {
            color: '#0162fe',
            color2:'rgba(1,98,254,0.1)'

          },
        },
        {
          value: 30,
          name: '水压异常',
          itemStyle: {
            color: '#00b4ff',
            color2:'rgba(0,180,255,0.1)'

          },
        },
        {
          value: 40,
          name: '电压异常',
          itemStyle: {
            color: '#00ffff',
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
          name: '非法用水',
          itemStyle: {
            color: '#0162fe',
            opacity: 0.4,
          },
        },
        {
          value: 30,
          name: '水压异常',
          itemStyle: {
            color: '#00b4ff',
            opacity: 0.4,
          },
        },
        {
          value: 40,
          name: '电压异常',
          itemStyle: {
            color: '#00ffff',
            opacity: 0.4,
          },
        }
      ],
      labelLine: {
        show: false,
      },
    },
    {
      tooltup:{
        show:false
      },
      type: 'pie',
      radius: ['40%', '41%'],
      center: ['50%', '50%'],
      hoverAnimation: false,
      clockWise: false,
      data: [100],
      itemStyle: {
        normal: {
          borderColor: 'rgba(3,244,255,.2)',
          borderWidth: 2,
          color:"rgba(3,244,255,.2)"
        }
      },
      label: {
        show: false
      }
    }
  ],
}
export {lineOptions,pieOption}