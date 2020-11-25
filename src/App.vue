<template>
    <div id="app">
        <Header/>
        <Map/>
        <router-view class="main-view"/>
    </div>
</template>
<script>
    import Header from './components/Header';
    import Map from './components/Map';

    export default {
        name: 'app',
        components: {
            Header,
            Map
        }
    };
</script>

<style lang="scss">
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    .main-view {
        z-index: 1;
    }
</style>
