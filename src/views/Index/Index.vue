<template>
    <div class="index">
        <!--<Map />-->
        <div class="leftSide"></div>
        <rightSide />
    </div>
</template>

<script>
  import rightSide from "./rightSide/rightSide";
  import Map from "../../components/Map";
  export default {
    name: "Index",
    components:{
      rightSide,
      Map
    },
    data(){
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
    .index {
        position: relative;
        .leftSide {

        }

    }
</style>
