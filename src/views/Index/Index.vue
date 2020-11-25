<template>
    <div class="index">
        <leftSide />
        <rightSide/>
    </div>
</template>

<script>
    import leftSide from './leftSIde/leftSide';
    import rightSide from './rightSide/rightSide';


    export default {
        name: 'Index',
        components: {
            leftSide,
            rightSide,
        },
        data() {
            return {};
        }
    };
</script>

<style lang="scss"
  scoped>
    .index {
        position: relative;

        .leftSide {

        }

    }
</style>
