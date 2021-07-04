<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  .float-left {
    float: left;
  }
  .float-right {
    float: right;
  }
  #app {
    min-width: 1140px;
  }
  a {
    text-decoration: none;
  }
  * {
    padding: 0;
    margin: 0;
  }
  .margin-bottom-20 {
    margin-bottom: 20px;
  }

  .margin-bottom-10 {
    margin-bottom: 10px;
  }

  .clearfix {
    overflow: auto;
    zoom: 1;
  }
</style>
