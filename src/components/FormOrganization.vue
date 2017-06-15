<template lang="html">
<div class="ms-organization-wrap">
    <div class="ms-organization-title" @click="toggleChild">
      <span v-if="!result.length">请选择</span>
      {{result | filterContent}}
    </div>
    <div class="ms-organization-body" v-show="visible" :class="classes">
      <div class="ms-organization-body-header">
        <div  class="ms-organization-search" v-if="search">
          <input type="text" v-model="searchVal" :placeholder="placeholder">
        </div>
        <div class="ms-organization-router" v-if="organizationNavs.length">
          <span>已选择:</span>
          <a v-for="(nav, inx) in organizationNavs" :key="nav.value" @click.prevent.stop="changeNav(nav, inx)">{{nav.label}}<span v-if="(organizationNavs.length - 1) !== inx">></span></a>
        </div>
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
    value: {
      required: false
    },
    search: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '按拼音或汉字搜索'
    }
  },
  data: function () {
    return {
      organizationNavs: [],
      currOrganization: [],
      currParent: null,
      content: [],
      visible: false,
      cur: '',
      searchVal: '',
      result: [],
      position: false
    }
  },
  created: function () {
    this.currOrganization = this.organization
    this.initValue()
  },
  computed: {
    filterSearch: function () {
      var newVal = this.searchVal
      if (!newVal) {
        return this.currOrganization.slice(0)
      } else {
        return this.currOrganization.filter(function (item) {
          return (item.value.indexOf(newVal) !== -1 || item.label.indexOf(newVal) !== -1)
        })
      }
    },
    classes: function () {
      return {
        'ms-organization-body-top': this.position,
        'ms-organization-body-with-search': this.search
      }
    }
  },
  filters: {
    filterContent: function (content) {
      return content.length ? content.map(function (i) {
        return i.label
      }).join('/') : ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // var top = this.$el.getBoundingClientRect().top
      // var bottom = this.$el.getBoundingClientRect().bottom
      // if (top > bottom) {
      //   this.position = true
      // }
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
    showChild: function (item) {
      this.result = []
      var organizationNavs = this.organizationNavs
      var currOrganization = this.currOrganization
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
        this.$emit('input', [])
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
        this.result = this.content
        this.$emit('input', this.content.map(function (i) {
          return i.value
        }))
      }
    },
    changeNav: function (nav, inx) {
      this.result = []
      var organizationNavs = this.organizationNavs
      var content = this.content
      this.currOrganization = nav.parentNode
      if (inx === 0) {
        this.content = []
        this.organizationNavs = []
      } else {
        this.organizationNavs = organizationNavs.splice(0, inx)
        this.content = content.splice(0, inx)
      }
      this.cur = ''
      this.$emit('input', [])
    },

    initValue: function () {
      this.content = []
      this.result = []
      var output = {}
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
      var currOrganization = this.organization
      var seletedValues = this.value
      if (seletedValues && seletedValues.length) {
        for (var i = 0; i < seletedValues.length; i++) {
          var parent = filterArray(currOrganization, seletedValues[i])
          var node = parent.node
          if (node) {
            if (node.children && node.children.length) {
              this.organizationNavs.push({
                value: node.value,
                label: node.label,
                children: node.children,
                parentNode: parent.parentNode
              })
              currOrganization = node.children
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
        this.result = this.content
      }
    }
  },
  beforeDestroy: function () {
    this.hide()
  }
}
</script>

<style>
.ms-organization-wrap {
  position: relative;
}
.ms-organization-title{
  width: 300px;
  height: 38px;
  line-height: 28px;
  padding: 5px 10px;
  border: 1px solid #d6c6c6;
  border-radius: 3px;
}
.ms-organization-body {
  position: absolute;
  top: 50px;
  left: 0px;
  z-index: 100;
  width: 300px;
  height: 300px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: hidden;
  box-shadow: 0 5px 5px -3px rgba(0,0,0,.2);
}
.ms-organization-body-header {
  position: relative;
}
.ms-organization-search {
  padding: 10px;
}
.ms-organization-search input {
  width: 100%;
  height: 34px;
  padding: 5px;
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
  position: relative;
  /*padding-top: 30px;*/
}
.ms-organization-options {
  list-style: none;
  padding: 15px 0px;
  overflow-y: scroll;
  height: 215px;
}
.ms-organization-options li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}
.ms-organization-options li:hover{
  background: rgba(0,0,0,.12);
}
.ms-organization-options li.active{
  color: #fff;
  background-color: #5FB878;
}
.ms-organization-body-with-search .ms-organization-body-header{
}
.ms-organization-body-with-search .ms-organization-content{
}
</style>
