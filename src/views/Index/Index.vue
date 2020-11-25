<template>
    <div class="index">
        <Map />
        <leftSide />
        <rightSide/>
    </div>
</template>

<script>
    import leftSide from './leftSIde/leftSide';
    import rightSide from './rightSide/rightSide';
    import Map from '../../components/Map';

    export default {
        name: 'Index',
        components: {
            leftSide,
            rightSide,
            Map
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
