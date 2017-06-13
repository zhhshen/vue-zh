<template lang="html">
<div class="subheader">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'ms-subheader'
}
</script>

<style lang="less">
.subheader {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-size: 16px;
  color: #444;
  font-weight: 500;
  padding: 10px 16px;
}
</style>
