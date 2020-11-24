const  lineOptions ={
  xAxis: {
    axisTick:{
      show:false
    },
    axisLine:{
      show:false
    },
    type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  grid: {
    width: "90%",
      height: "80%",
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
  },
  yAxis: {
    axisLine:{
      show:false
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

export {lineOptions}