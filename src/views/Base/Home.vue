<template lang="html">
<div class="main">
  <div class="page-wrapper">
    <div class="page-side">
      <ms-side></ms-side>
    </div>
    <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>

<script>
import MsSide from './Side'
export default {
  components: {
    MsSide
  }
}
</script>

<style lang="less">
.page-wrapper {
  display: flex;
  padding-top: 80px;
  background: #fff;
}
.page-side {
  width: 240px;
}
.page-content {
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
}
</style>
