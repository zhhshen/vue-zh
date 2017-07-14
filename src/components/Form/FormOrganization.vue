<template lang="html">
  <div class="ms-organization-wrap" :style="customStyle" v-if="organization.length">
    <div class="ms-organization-title" @click="toggleChild">
      <span v-show="!selectedItems.length || multipleSwitch">{{hint}}</span>
      <span v-show="(selectedItems.length >0 && !multipleSwitch)">{{selectedItems | filterContent}}</span>
      <i class="ion-chevron-down ms-organization-icon"></i>
    </div>
    <div class="ms-organization-body" v-show="visible" :style="customStyle">
      <div  class="ms-organization-search">
        <input type="text" v-model="searchVal" :placeholder="placeholder">
      </div>
      <div class="ms-organization-router" v-if="organizationNavs.length">
        <span>已选择:</span>
        <a v-for="(nav, inx) in organizationNavs" :key="nav.value" @click.prevent.stop="changeNav(nav, inx)">{{nav.label}}<span v-if="(organizationNavs.length - 1) !== inx">></span></a>
      </div>
      <div  class="ms-organization-content">
        <ul class="ms-organization-options" v-if="filterSearch.length">
          <li :class="{ active: item.value === cur }" :key="item.value" v-for="(item, inx) in filterSearch" @click.stop="showChild(item)"><div>{{item.label}}</div></li>
        </ul>
        <ul class="ms-organization-options" v-else>
          <li><div>没有匹配项</div></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-organization',
  props: {
    organization: {
      type: Array,
      default: function () {
        return []
      }
    },
    hint: {
      type: String,
      default: '请选择'
    },
    value: {
      required: false
    },
    placeholder: {
      type: String,
      default: '搜索'
    },
    customStyle: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      organizationNavs: [],
      currParent: null,
      currOrganization: this.organization,
      content: [],
      result: [],
      visible: false,
      cur: '',
      searchVal: '',
      inputValue: null,
      multipleSwitch: false
    }
  },
  watch: {
    value (newVal) {
      this.inputValue = newVal
    },
    inputValue (newVal) {
      this.$emit('input', newVal)
    }
  },
  created () {
    this.currOrganization = this.organization
    this.inputValue = this.value
  },
  computed: {
    filterSearch () {
      var newVal = this.searchVal
      if (!newVal) {
        return this.currOrganization.slice(0)
      } else {
        return this.currOrganization.filter(item => {
          return (item.value.indexOf(newVal) !== -1 || item.label.indexOf(newVal) !== -1)
        })
      }
    },
    selectedItems () {
      this.cur = ''
      this.content = []
      let seletedValues = []
      if (Array.isArray(this.inputValue)) {
        seletedValues = this.inputValue
      } else if (this.inputValue !== null) {
        seletedValues.push(this.inputValue)
      } else {
        return []
      }
      this.currOrganization = this.organization
      let output = {}
      function filterArray (data, name) {
        for (var i = 0; i < data.length; i++) {
          var obj = data[i]
          if (!obj || !obj.value) {
            continue
          }
          if (obj.value === name) {
            output = {
              parentNode: data,
              node: data[i]
            }
            break
          } else if (obj.children && obj.children.length) {
            filterArray(obj.children, name)
          } else {
          }
        }
        return output
      }
      this.organizationNavs = []
      for (var i = 0; i < seletedValues.length; i++) {
        var parent = filterArray(this.currOrganization, seletedValues[i])
        var node = parent.node
        if (node) {
          if (node.children && node.children.length) {
            this.organizationNavs.push({
              value: node.value,
              label: node.label,
              children: node.children,
              parentNode: parent.parentNode
            })
            this.currOrganization = node.children
          } else {
            this.currOrganization = parent.parentNode
            this.cur = node.value
          }
          this.content.push({
            value: node.value,
            label: node.label
          })
        }
      }
      return this.content
    }
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
    showChild (item) {
      let organizationNavs = this.organizationNavs
      let currOrganization = this.currOrganization
      this.searchVal = ''
      if (item.children && item.children.length) {
        organizationNavs.push({
          value: item.value,
          label: item.label,
          children: item.children,
          parentNode: currOrganization
        })
        this.content.push({
          value: item.value,
          label: item.label
        })
        this.organizationNavs = organizationNavs
        this.currOrganization = item.children
        this.multipleSwitch = true
      } else if (this.content.indexOf(item) === -1) {
        if (this.cur) {
          this.content.pop()
        }
        this.content.push({
          value: item.value,
          label: item.label
        })
        this.cur = item.value
        this.visible = false
        if (this.content.length === 1) {
          this.inputValue = this.content[0].value
          return
        }
        this.multipleSwitch = false
      }
      this.inputValue = this.content.map(i => i.value)
    },
    changeNav (nav, inx) {
      let organizationNavs = this.organizationNavs
      let content = this.content
      this.currOrganization = nav.parentNode
      if (inx === 0) {
        this.content = []
        this.organizationNavs = []
      } else {
        this.organizationNavs = organizationNavs.splice(0, inx)
        this.content = content.splice(0, inx)
      }
      this.cur = ''
      this.multipleSwitch = true
      this.inputValue = this.content.map(i => i.value)
    }
  },
  filters: {
    filterContent: function (content) {
      return content.length ? content.map(i => i.label).join('/') : ''
    }
  },
  beforeDestroy () {
    this.hide()
  }
}
</script>

<style lang="less">
/*级联选择器*/
.ms-organization-wrap {
  display: inline-flex;
  position: relative;
  width: 300px;
}
.ms-organization-title{
  position: relative;
  width: 100%;
  height: 38px;
  line-height: 28px;
  padding: 5px 10px;
  border-bottom: 1px solid rgba(81,130,228,.5);
}
.ms-organization-icon {
  position: absolute;
  display: inline-block;
  top: 10px;
  right: 0px;
  font-size: 10px;
  color: #999;
}
.ms-organization-body {
  position: absolute;
  top: 38px;
  left: 0px;
  z-index: 100;
  width: 300px;
  height: auto;
  min-height: 100px;
  max-height: 300px;
  background: #fff;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.1), 0 0 12px 5px rgba(0,0,0,.1);
}
.ms-organization-search {
  padding: 10px;
}
.ms-organization-search input {
  width: 100%;
  height: 34px;
  padding: 5px;
  border: none;
  border-bottom: 1px solid rgba(81,130,228,.5);
  outline: none;
}
.ms-organization-router {
  line-height: 20px;
  padding: 5px 10px;
  width: 100%;
  overflow-x: scroll;
}
.ms-organization-router a {
  cursor: pointer;
}
.ms-organization-body-top {
  bottom: 60px;
}
.ms-organization-content {
  /*padding: 15px 10px;*/
}
.ms-organization-options {
  list-style: none;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 160px;
}
.ms-organization-options li {
  padding: 10px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(10,18,32,.64)
}
.ms-organization-options li:hover{
  color: rgba(10,18,32,.87);
  background-color: rgba(232,235,237,.6)
}
.ms-organization-options li.active{
  color: rgba(81,130,228,1);
}
</style>
