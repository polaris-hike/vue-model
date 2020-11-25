<template>
    <div></div>
</template>

<script>
  export default {
    name: "pieSelect",
    data() {
      return {
        timer: null,
        pieSelectName: '',
        pieSelectIndex: 0
      }
    },
    props: {
      timeout: {
        type: Number,
        default: 3000
      },
      // itemNames: Array
    },
    computed:{
      itemNames(){
        return this.$parent.options.series[0].data.map(ele=>ele.name)
      }
    },
    methods: {
      stopAnimate() {
        window.clearInterval(this.timer)
        this.$parent.$refs.ecInstance.dispatchAction({
          name: this.pieSelectName,
          type: 'pieUnSelect',
        })
      },
      startAnimate() {
        let vm = this
        vm.timer = setInterval(() => {
          let dataLength = vm.itemNames.length;
          let index = vm.pieSelectIndex % dataLength;
          let name = vm.itemNames[index];
          vm.itemNames.map(name=>{
            this.$parent.$refs.ecInstance.dispatchAction({
              type: 'pieUnSelect',
              name:name
            })
          })

          vm.$parent.$refs.ecInstance.dispatchAction({
            type: 'pieSelect',
            // 图例名称
            name: name
          })
          vm.pieSelectName = name
          vm.pieSelectIndex += 1
        }, vm.timeout)
      },
    },
    watch: {
      'itemNames.length'(length) {
        if (length <= 1) {
          window.clearInterval(this.timer)
        }
      }
    },
    beforeMount() {
      this.$nextTick(() => {
        this.itemNames.length > 1 && this.startAnimate()
        // this.$refs.ecInstance
      })
    },
    beforeDestroy() {
      window.clearInterval(this.timer)
    }
  }
</script>

<style scoped>

</style>
