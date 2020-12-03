<template>
  <div id="app">
    <Header v-show="$route.path !== '/login' && !isMobile" />
    <Map v-show="$route.path === '/index'" />
    <router-view class="main-view" />
  </div>
</template>
<script>
import Header from "./components/Header";
import Map from "./components/Map";

export default {
  name: "app",
  components: {
    Header,
    Map,
  },
  data() {
    return {
      isMobile: false,
    };
  },
  created() {
    this.isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
      navigator.userAgent
    );
  },
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
#app {
  background-color: rgb(17, 23, 28);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .main-view {
    color: #fff;
    height: 100%;
    overflow: hidden;
  }
}
</style>
