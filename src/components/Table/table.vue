<template lang="html">
<div class="table-wrap" ref="tableWrap">
  <div class="ms-table-header"  v-if="columns.length" >
    <table cellspacing="0" ref="tableHead" :style="style">
      <thead class="table_thead">
        <tr>
          <th v-for="(item, index) in columns" class="table_cell">
            <div>
              <span>{{item.title}}</span>
              <span class="ms-table-sort" v-if="item.sortable">
                <i class="ms-sort-arrow-up" :class="{'cur': item.sortType === 'asc'}" @click="handleSort(item, 'asc')"></i>
                <i class="ms-sort-arrow-down" :class="{'cur': item.sortType === 'desc'}" @click="handleSort(item, 'desc')"></i>
              </span>
            </div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="ms-table-body" :style="styleBody" >
    <table cellspacing="0" :style="style" ref="tableBody">
      <tbody class="table_body" v-if="sortData.length">
        <tr v-for="item in sortData">
          <td class="table_cell" v-for="value in item">{{value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="ms-table-body">
    <div class="empty_data" v-if="!sortData.length">暂无数据</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ms-table',
  props: {
    height: {
      type: Number
    },
    columns: {
      type: [Array],
      default: function () {
        return []
      }
    },
    data: {
      type: [Array],
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      style: null,
      styleBody: null,
      filterKey: '',
      filterMethod: ''
    }
  },
  computed: {
    sortData () {
      let key = this.filterKey
      let type = this.filterMethod
      let arr = this.data.slice()
      arr.sort((a, b) => {
        if (type === 'asc') {
          return a[key] > b[key] ? 1 : -1
        } else if (type === 'desc') {
          return a[key] < b[key] ? 1 : -1
        }
      })
      return arr
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.computedStyle()
    })
  },
  methods: {
    handleSort (item, type) {
      this.filterKey = item.key
      this.filterMethod = type
      item.sortType = type
    },
    computedStyle () {
      let wrap = this.$refs.tableWrap
      let thead = this.$refs.tableHead
      let tbody = this.$refs.tableBody
      let main = window.getComputedStyle(wrap, null).width
      let head = window.getComputedStyle(thead, null).width
      let body = window.getComputedStyle(tbody, null).width
      let arr = [main, head, body]
      arr = arr.map((item) => {
        return Number(item.replace('px', ''))
      })
      arr.sort(function (a, b) {
        return b - a
      })
      let maxWidth = arr[0] + 'px'
      this.style = {
        width: maxWidth
      }
      if (this.height) {
        let height = this.height
        if (typeof (this.height) === 'number') {
          height = this.height + 'px'
        }
        this.styleBody = {
          width: maxWidth,
          height: height
        }
      } else {
        this.styleBody = {
          width: maxWidth
        }
      }
    }
  }
}
</script>

<style lang="less">
.table-wrap {
  position: relative;
  width: 100%;
  overflow-y: hidden;
	overflow-x: scroll;
  padding: 20px;
  background: #fff;
}
.table-wrap table {
  font-size: 14px;
  background-color: #fff;
  text-align: center;
  border-top: 1px solid #e7e7eb;
  border-bottom: 1px solid #e7e7eb;
  border-spacing: 0;

}
.ms-table-header {
  table {
    // border-bottom: none;
  }
}
.ms-table-body {
  position: relative;
	overflow-y: scroll;
  .table_cell {
    border-top: 1px solid #e7e7eb;
    border-right: 1px solid #e7e7eb;
  }
  table {
    border-top: none;
  }
}
.table_cell {
  padding: 10px 8px;
  min-width: 200px;
}
.ms-table-sort {
  display: inline-block;
  position: relative;
  width: 10px;
  height: 12px;
  margin-left: 4px;
  margin-top: -1px;
  vertical-align: middle;
  overflow: hidden;
  cursor: pointer;
  i {
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    color: #bbbec4;
    transition: color .2s ease-in-out;
    &.cur {
      border-color: transparent transparent #2d8cf0 transparent;
    }
    &:first-child {
      top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent #bbbec4 transparent;
    }
    &:last-child {
      bottom: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #bbbec4 transparent transparent transparent;
    }
    &.cur {
      &:first-child {
        border-bottom-color: #2d8cf0;
      }
      &:last-child {
        border-top-color: #2d8cf0;
      }
    }
  }
}
.empty_data {
  padding: 100px 0;
  text-align: center;
  font-size: 14px;
  color: #8d8d8d;
}
</style>
