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
const tableSort = function () {
    let data = Mock.mock({
        "table": {
          "tableBody": [{
            "0": "2017-08-01",
            "1": "163",
            "2": 0.0,
            "3": 0.0,
            "4": 0.0,
            "5": 0.0,
            "6": 0.0,
            "7": 0.0,
            "8": 0.0,
            "9": 0.0,
            "10": 0.0
          }, {
            "0": "2017-08-12",
            "1": "360tf",
            "2": 0.0,
            "3": 2.0,
            "4": 0.0,
            "5": 14.536,
            "6": 0.0,
            "7": 0.0,
            "8": 0.0,
            "9": 0.0,
            "10": 0.0
          }, {
            "0": "2017-08-21",
            "1": "360tf1",
            "2": 0.0,
            "3": 0.0,
            "4": 0.0,
            "5": 0.0,
            "6": 0.0,
            "7": 0.0,
            "8": 0.0,
            "9": 0.0,
            "10": 0.0
          }, {
            "0": "2017-08-16",
            "1": "360tf2",
            "2": 0.0,
            "3": 0.0,
            "4": 0.0,
            "5": 2.166,
            "6": 0.0,
            "7": 0.0,
            "8": 0.0,
            "9": 0.0,
            "10": 0.0
          }, {
            "0": "2017-08-02",
            "1": "app store aso",
            "2": 0.0,
            "3": 0.0,
            "4": 0.0,
            "5": 9.941,
            "6": 0.0,
            "7": 0.0,
            "8": 0.0,
            "9": 0.0,
            "10": 0.0
          }, {
            "0": "2017-08-02",
            "1": "app store majia",
            "2": 0.0,
            "3": 1.0,
            "4": 0.0,
            "5": 17.626,
            "6": 18.0,
            "7": 8.0,
            "8": 0.0,
            "9": 0.0,
            "10": 0.0
          }, {
            "0": "2017-08-02",
            "1": "baidu",
            "2": 425.0,
            "3": 926.0,
            "4": 13.0,
            "5": 5.328,
            "6": 1463.0,
            "7": 76.0,
            "8": 0.0,
            "9": 0.0,
            "10": 0.0
          }, {
            "0": "2017-08-02",
            "1": "baidu_family",
            "2": 0.0,
            "3": 0.0,
            "4": 0.0,
            "5": 0.0,
            "6": 0.0,
            "7": 0.0,
            "8": 0.0,
            "9": 0.0,
            "10": 0.0
          }, {
            "0": "2017-08-28",
            "1": "zhidian",
            "2": 0.0,
            "3": 0.0,
            "4": 0.0,
            "5": 0.433,
            "6": 0.0,
            "7": 0.0,
            "8": 0.0,
            "9": 0.0,
            "10": 0.0
          }, {
            "0": "2017-08-24",
            "1": "zht",
            "2": 0.0,
            "3": 0.0,
            "4": 0.0,
            "5": 0.0,
            "6": 0.0,
            "7": 0.0,
            "8": 0.0,
            "9": 0.0,
            "10": 0.0
          }, {
            "0": "2017-08-17",
            "1": "zhuoyi",
            "2": 1.0,
            "3": 1.0,
            "4": 0.0,
            "5": 4.494,
            "6": 0.0,
            "7": 0.0,
            "8": 0.0,
            "9": 0.0,
            "10": 0.0
          }],
          "tableHead": [{
            "sortType": 'date',
            "sortable": true,
            "title": "日期",
            "key": "0"
          }, {
            "sortable": true,
            "title": "渠道",
            "key": "1"
          }, {
            "sortable": true,
            "title": "新增有效设备数",
            "key": "2"
          }, {
            "sortable": true,
            "title": "新增总设备数",
            "key": "3"
          }, {
            "sortable": true,
            "title": "支付设备数",
            "key": "4"
          }, {
            "sortable": true,
            "title": "平均使用时长",
            "key": "5"
          }, {
            "sortable": true,
            "title": "操作数",
            "key": "6"
          }, {
            "sortable": true,
            "title": "操作设备数",
            "key": "7"
          }, {
            "sortable": true,
            "title": "设备7日留存率",
            "key": "8"
          }, {
            "sortable": true,
            "title": "设备次日留存率",
            "key": "9"
          }, {
            "sortable": true,
            "title": "设备30日留存率",
            "key": "10"
          }]
        }
  })
  return data.table
}
export {
  single,
  multiple,
  table,
  tableSort
}
