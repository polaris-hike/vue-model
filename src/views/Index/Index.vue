<template>
    <div>
        <div class="index" v-if="!isMobile">
            <leftSide />
            <rightSide/>
        </div>
        <MobileIndex v-else/>
    </div>

</template>

<script>
    import leftSide from './leftSIde/leftSide';
    import rightSide from './rightSide/rightSide';
    import MobileIndex from "./mobile/Index";

    export default {
        name: 'Index',
        components: {
            leftSide,
            rightSide,
          MobileIndex
        },
        data() {
            return {
              isMobile:false
            };
        },
      created() {
        this.isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
      }

    };
</script>

<style lang="scss"
  scoped>
    .index {
        position: relative;
         z-index: 1;
        .leftSide {

        }

    }
</style>
