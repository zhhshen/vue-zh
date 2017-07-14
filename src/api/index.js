let Mock = require('mockjs')
const single = function () {
  let data = Mock.mock({
    'list|1-20': [{
      'label': '@province',
      'value': '@string',
      'id': '@id'
    }]
  })
  return data.list
}
const multiple = function () {
  let data = Mock.mock({
    'list|1-20': [{
      'label': '@province',
      'value': '@date',
      'children|1-20': [{
        'label': '@city',
        'value': '@string',
        'children|1-20': [{
          'label': '@county',
          'value': '@string'
        }]
      }]
    }]
  })
  return data.list
}
const table = function () {
  let data = Mock.mock({
    table: {
      tableHead: [{
        title: 'Id',
        key: 'id',
        sortable: true
      }, {
        title: '指标名称',
        key: 'name'
      }, {
        title: '数据库',
        key: 'dbName',
        sortable: true,
        tip: true,
        tipText: '数据库数据库数据库数据库数据库数据库数据库数据库数据库数据库数据库数据库数据据库数据库数据库数据库'
      }, {
        title: '数据表',
        key: 'dbTableName'
      }, {
        title: '数据表',
        key: 'age'
      }, {
        title: '数据表',
        key: 'sex'
      }, {
        title: '属相',
        key: 'shuxiang'
      }, {
        title: '学校',
        key: 'school'
      }, {
        title: '籍贯',
        key: 'city'
      }, {
        title: '地址',
        key: 'address'
      }],
      'tableBody|1-40': [{
        'id|+1': 1,
        name: function () {
          return '指标名称' + this.id
        },
        dbName: function () {
          return '数据库' + this.id
        },
        dbTableName: function () {
          return '数据表' + this.id
        },
        age: function () {
          return '数据表' + this.id
        },
        sex: function () {
          return '数据表' + this.id
        },
        shuxiang: function () {
          return '数据表' + this.id
        },
        school: function () {
          return '数据表' + this.id
        },
        city: function () {
          return '数据表' + this.id
        },
        address: function () {
          return '数据表' + this.id
        },
        request: function () {
          return '其他字段' + this.id
        }
      }]
    }
  })
  return data.table
}
export {
  single,
  multiple,
  table
}
