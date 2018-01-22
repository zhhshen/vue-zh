<template lang="html">
<div class="sidebar">
  <h2>组件</h2>
  <ul>
    <li>
      <h4>组件</h4>
      <ul>
        <li :key="link.name" v-for="link in links">
          <router-link :to="{ name: link.name }">{{ link.title }}</router-link>
        </li>
      </ul>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data () {
    return {
      links: [{
        title: '级联选择器',
        name: 'organization'
      }, {
        title: '多选下拉框',
        name: 'multiple'
      }, {
        title: '表格',
        name: 'table'
      }, {
        title: '分页',
        name: 'pagination'
      }]
    }
  }
}
</script>

<style lang="less">
.sidebar {
  padding: 10px 15px;
  border-right: 1px solid rgba(81, 130, 228, .2);
  h2 {
    text-align: center;
    padding-bottom: 20px;
    font-weight: 400;
  }
  ul {
    padding: 5px;
    li {
      padding: 5px;
      a {
        font-size: 14px;
      }
    }
  }
}
</style>
