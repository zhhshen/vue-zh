<template lang="html">
  <div class="multiple-select-wrap" :style="customStyle" ref="multipleSelect">
    <div class="multiple-select-title" @click.stop="toggleChild">
      <span v-if="!selectedItems.length">{{hint}}</span>
      <div class="multiple-select-result" v-if="selectedItems.length">
        <span v-for="(item, inx) in selectedItems" @click.stop="toFrom(item, inx)">
          <i class="ion-android-cancel multiple-select-icon_cancel">x</i></a>
          <em>{{ item.label }}</em>
        </span>
      </div>
      <i class="ion-chevron-down multiple-select-icon"></i>
    </div>
    <div class="multiple-select-body" v-show="visible" :style="[customStyle, fixedStyle]">
      <div class="multiple-select-body-inner">
        <div  class="multiple-select-search">
          <input type="text" :placeholder="placeholder" v-model="filterKey">
        </div>
        <div  class="multiple-select-content">
          <ul class="multiple-select-options" v-if="filterItems.length">
            <li :class="{ active: item.active }" :key="item.value" v-for="(item, inx) in filterItems" @click.stop="toEnd(item, inx)"><div>{{item.label}}</div></li>
          </ul>
          <ul class="multiple-select-options" v-else>
            <li><div>没有匹配项</div></li>
          </ul>
          <div class="multiple-select-options-meta" v-if="actions">
            <label ><input type="checkbox" name="" v-model="isFullSelect">全选</label>
            <span @click="deleteAll">清空</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-multiple-select',
  data () {
    return {
      filterKey: '', // 搜索词
      isFullSelect: false, // 是否全选
      lastItem: 200,
      visible: false,
      fixedStyle: {},
      defaultVals: [],
      curOrganization: [],
      inputValue: this.value,
      endItems: []
    }
  },
  props: {
    organization: {
      type: Array,
      default: () => []
    },
    hint: {
      type: String,
      default: '请选择'
    },
    placeholder: {
      type: String,
      default: '请输入搜索关键词'
    },
    actions: Boolean,
    value: {
      required: false
    },
    customStyle: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    filterItems () {
      let key = this.filterKey
      if (key) {
        return this.curOrganization.filter((item) => {
          return (item.value.indexOf(key) !== -1 || item.label.indexOf(key) !== -1)
        })
      } else {
        return this.curOrganization.slice(0)
      }
    },

    selectedItems () {
      if (this.inputValue === (null || '')) return []
      if (this.inputValue.length === 0) return []
      let result = []
      let selected = []
      if (Array.isArray(this.inputValue)) {
        selected = this.inputValue.slice(0)
      } else if (this.inputValue !== null) {
        selected.push(this.inputValue)
      }
      if (selected && selected.length > 0) {
        if (this.curOrganization.length) {
          result = this.curOrganization.filter(item => {
            if (selected.indexOf(item.value) !== -1) {
              item.active = true
              return item
            }
          })
        }
      }
      this.endItems = result
      return result
    }
  },
  watch: {
    isFullSelect (newVal, oldVal) {
      this.endItems.splice(0)
      this.organization.map(function (item) {
        if (newVal) {
          this.endItems.push(item.id)
          item.active = true
        } else {
          item.active = false
        }
        return item
      })
    },
    value (newVal) {
      this.inputValue = newVal
    },
    inputValue (items) {
      this.$emit('input', items, this.selectedItems.map(i => {
        return {
          value: i.value,
          label: i.label
        }
      }))
    }
  },
  created () {
    this.curOrganization = this.organization
  },
  mounted () {
    this.$nextTick(function () {
      let content = this.$el.querySelector('.multiple-select-options')
      content.addEventListener('scroll', this.onScroll, false)
    })
  },
  methods: {
    toggleChild: function () {
      this.visible ? this.hide() : this.show()
    },
    show () {
      this.visible = true
      document.addEventListener('click', this.closeOnDocumentClick, false)
    },

    hide () {
      this.visible = false
      document.removeEventListener('click', this.closeOnDocumentClick, false)
    },

    closeOnDocumentClick (e) {
      if (!this.$el.contains(e.target)) {
        this.hide()
      }
    },
    // 撤销选择
    toFrom (deleteItem, inx) {
      deleteItem.active = false
      this.filterItems.splice(this.filterItems.indexOf(deleteItem), 1, deleteItem)
      this.endItems.splice(inx, 1)
      this.inputValue = this.endItems.map(i => i.value)
    },
    // 选中
    toEnd (select, inx) {
      select.active = true
      this.filterItems.splice(inx, 1, select)
      if (this.endItems.length) {
        let isSelect = this.endItems.indexOf(select)
        // 存在则删除
        if (isSelect !== -1) {
          select.active = false
          this.filterItems.splice(inx, 1, select)
          this.endItems.splice(isSelect, 1)
        } else {
          // 不存在则添加
          this.endItems.push(select)
        }
      } else {
        // 第一条数据
        this.endItems.push(select)
      }
      // 排序
      this.endItems.sort(function (a, b) {
        return a.value - b.value
      })
      this.inputValue = this.endItems.map(i => i.value)
    },
    // 撤销所有
    deleteAll: function () {
      if (this.endItems.length) {
        this.endItems.forEach(function (item, index) {
          item.active = false
          this.curOrganization.splice(index, 1, item)
        })
        this.endItems.splice(0)
        this.isFullSelect = false
      } else if (this.isFullSelect) {
        this.isFullSelect = false
      }
      this.inputValue = this.endItems.map(i => i.value)
    },

    onScroll: function () {
      let content = this.$el.querySelector('.multiple-select-options')
      let showMoreItems = (content.scrollHeight - (content.scrollTop + content.clientHeight)) < 200
      if (showMoreItems) {
        this.lastItem += 200
        if (this.lastItem <= this.curOrganization.length) {
          this.filterItems = this.filterItems.slice(0, this.lastItem)
        } else {
          this.lastItem = this.curOrganization.length
          this.filterItems = this.filterItems.slice(0)
        }
      }
    }
  },

  beforeDestroy () {
    let content = this.$el.querySelector('.multiple-select-options')
    content.removeEventListener('scroll', this.onScroll, false)
  }
}
</script>

<style lang="less" scoped>
.multiple-select-wrap {
  position: relative;
  min-width: 200px;
  width: 200px;
  display: inline-block;
}
.multiple-select-title{
  position: relative;
  width: 100%;
  min-height: 38px;
  padding: 5px 10px;
  border-bottom: 1px solid rgba(81,130,228,.5);
  transition: all .5s ease;
}
.multiple-select-icon_cancel {
  font-style: normal;
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  border-radius: 50%;
  background: rgba(0, 0, 0, .5);
  color: #fff;
}
.multiple-select-result {
  span {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    background: #e0e0e0;
    position: relative;
    margin: 0 8px 8px 0;
    padding: 8px 10px;
    color: rgba(0,0,0,.87);
    border-radius: 3px;
    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    em {
      display: flex;
      align-items: center;
      font-style: normal;
      padding-left: 5px;
    }
  }
}
.multiple-select-body {
  position: relative;
  top: 0;
  left: 0px;
  z-index: 100;
  min-width: 200px;
  height: 0.1px;
}
.multiple-select-body-inner {
  position: absolute;
  top: 0;
  left: 0px;
  z-index: 100;
  min-width: 200px;
  width: 100%;
  height: auto;
  min-height: 100px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.1), 0 0 12px 5px rgba(0,0,0,.1);
}
.multiple-select-search {
  padding: 10px;
  input {
    width: 100%;
    height: 34px;
    padding: 5px;
    border: none;
    border-bottom: 1px solid rgba(81,130,228,.5);
    outline: none;
  }
}
.multiple-select-options {
  list-style: none;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 160px;
  li {
    padding: 10px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(10,18,32,.64);
    &:hover {
      color: rgba(10,18,32,.87);
      background-color: rgba(232,235,237,.6)
    }
    &.active {
      color: rgba(81,130,228,1);
    }
  }
  &-meta{
    input {
      margin-right: 10px;
    }
    span {
      cursor: pointer;
    }
    label {
      margin-right: 10px;
      cursor: pointer;
      font-weight: 400;
    }
  }
}
</style>
