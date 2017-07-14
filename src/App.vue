<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import "./assets/less/base.less";
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  color: rgba(81, 130, 228, 1);
  text-decoration: none;
}
.doc-center {
  padding: 20px;
  background-color: #fff;
}

</style>
