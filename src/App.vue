<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>
<script>
  import Header from "./components/Header";
  export default {
    name:'app',
    components:{
      Header
    }
  }
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
</style>
