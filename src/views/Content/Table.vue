<template lang="html">
<div class="doc-center">
  <ms-subheader>1 带操作项的表格</ms-subheader>
  <div class="ms-form-item">
    <ms-table :columns="tableHead1" :data="tableBody1" height="300px" actions>
      <template slot="others" scope="props">
        <a class="ms-button" @click="readRow(props)">查看</a>
        <a class="ms-button ms-info" @click="editRow(props)">编辑</a>
        <a class="ms-button ms-danger" @click="deleteRow(props)">删除</a>
        <a class="ms-button ms-warning" @click="roleRow(props)">权限</a>
      </template>
    </ms-table>
    <p>操作项中传递的数据: </p>
    <ul class="result-content" v-if="actionItem">
      <li>每一行的所有数据: {{actionItem.content}}</li>
      <li>每一行的索引值: {{actionItem.index}}</li>
    </ul>
  </div>
  <ms-subheader>2 可上下滑动的表格<span class="tips">(滑动时候表头固定)</span></ms-subheader>
  <div class="ms-form-item">
    <ms-table :columns="tableHead2" :data="tableBody2" height="300px"></ms-table>
  </div>
  <ms-subheader>3 可左右滑动的表格</ms-subheader>
  <div class="ms-form-item">
    <ms-table :columns="tableHead3" :data="tableBody3"></ms-table>
  </div>
</div>
</template>

<script>
import MsTable from '@/components/Table/table'
import MsSubheader from '@/components/Subheader'
import * as api from '@/api'
export default {
  data () {
    return {
      // 选择
      tableHead1: [],
      tableBody1: [],
      actionItem: null,

      tableHead2: [],
      tableBody2: [],
      tableHead3: [],
      tableBody3: []
    }
  },
  created () {
    let table = api.table()
    this.tableHead1 = table.tableHead.slice(0, 2)
    this.tableBody1 = table.tableBody.slice(0, 10)
    this.tableHead2 = table.tableHead.slice(0, 2)
    this.tableHead3 = table.tableHead.slice(0, 10)
    this.tableBody2 = table.tableBody.slice(0, 10)
    this.tableBody3 = table.tableBody.slice(0, 10)
  },
  methods: {
    readRow (item) {
      this.actionItem = item
    }
  },
  components: {
    MsTable,
    MsSubheader
  }
}
</script>

<style lang="less">
.result-content {
  padding: 10px;
  background: #e7e7e7;
}
</style>
