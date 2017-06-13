<template lang="html">
<div class="table-demo">
  <ms-subheader>1 图表左右滚动</ms-subheader>
  <ms-table :columns="columns" :data="data"></ms-table>
  <ms-subheader>2 设置tbody高度，thead固定，tbody超出滚动</ms-subheader>
  <ms-table :columns="columns" :data="data" :height="300"></ms-table>
</div>
</template>

<script>
import MsTable from '@/components/Table/table'
import MsSubheader from '@/components/Subheader'
export default {
  data () {
    return {
      columns: [
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '姓名',
          key: 'name',
          sortable: true,
          sortType: 'asc'
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '年龄',
          key: 'age',
          sortable: true
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '年龄',
          key: 'age',
          sortable: true
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      data: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          date: '2016-10-03',
          address1: '北京市朝阳区芍药居',
          date1: '2016-10-03',
          address2: '北京市朝阳区芍药居',
          date2: '2016-10-03'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          date: '2016-10-01',
          address1: '北京市朝阳区芍药居',
          date1: '2016-10-03',
          address2: '北京市朝阳区芍药居',
          date2: '2016-10-03'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          date: '2016-10-02',
          address1: '北京市朝阳区芍药居',
          date1: '2016-10-03',
          address2: '北京市朝阳区芍药居',
          date2: '2016-10-03'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          date: '2016-10-04',
          address1: '北京市朝阳区芍药居',
          date1: '2016-10-03',
          address2: '北京市朝阳区芍药居',
          date2: '2016-10-03'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          date: '2016-10-02',
          address1: '北京市朝阳区芍药居',
          date1: '2016-10-03',
          address2: '北京市朝阳区芍药居',
          date2: '2016-10-03'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          date: '2016-10-04',
          address1: '北京市朝阳区芍药居',
          date1: '2016-10-03',
          address2: '北京市朝阳区芍药居',
          date2: '2016-10-03'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          date: '2016-10-02',
          address1: '北京市朝阳区芍药居',
          date1: '2016-10-03',
          address2: '北京市朝阳区芍药居',
          date2: '2016-10-03'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          date: '2016-10-04',
          address1: '北京市朝阳区芍药居',
          date1: '2016-10-03',
          address2: '北京市朝阳区芍药居',
          date2: '2016-10-03'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          date: '2016-10-02',
          address1: '北京市朝阳区芍药居',
          date1: '2016-10-03',
          address2: '北京市朝阳区芍药居',
          date2: '2016-10-03'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          date: '2016-10-04',
          address1: '北京市朝阳区芍药居',
          date1: '2016-10-03',
          address2: '北京市朝阳区芍药居',
          date2: '2016-10-03'
        }
      ]
    }
  },
  components: {
    MsTable,
    MsSubheader
  }
}
</script>

<style lang="css">
.table-demo {
  margin: 50px auto;
  width: 800px;
}
</style>
