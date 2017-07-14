<template lang="html">
<div class="doc-center">
  <div class="ms-form-item">
    <span>下拉单选:</span>
    <ms-form-organization v-model="selectedOne" :organization="single"></ms-form-organization>
    <span>选择值：</span>
    <span>{{selectedOne}}</span>
  </div>
  <div class="ms-form-item">
    <span>省市区联动(后端返回固定数据格式):</span>
    <ms-form-organization v-model="selectedMore1" :organization="multiple"></ms-form-organization>
    <span>选择值：</span>
    <span>{{selectedMore1}}</span>
    <p class="tips">提示: 例子中的省份城市是随机产生的</p>
  </div>
  <div class="ms-form-item">
    <span>省市区联动(前端处理数据格式):</span>
    <ms-form-organization v-model="selectedMore2" :organization="currStructure"></ms-form-organization>
    <span>选择值：</span>
    <span>{{selectedMore2}}</span>
    <p class="tips">提示: 下拉数据源是一个平面表</p>
  </div>
</div>
</template>

<script>
import MsFormOrganization from '@/components/Form/FormOrganization'
import * as api from '@/api'
export default {
  data () {
    return {
      // 单选
      selectedOne: '',
      single: [],
      // 多级联动
      selectedMore1: [],
      selectedMore2: [],
      multiple: [],
      structure: [],
      currStructure: []
    }
  },
  created () {
    this.single = api.single()
    this.multiple = api.multiple()
    this.genOrganizaion()
  },
  methods: {
    genOrganizaion () {
      let data = [{
        code: 420000,
        name: '湖北省',
        parentCode: 0
      },
      {
        code: 420100,
        name: '武汉市',
        parentCode: 420000
      },
      {
        code: 420101,
        name: '市辖区',
        parentCode: 420100
      },
      {
        code: 420102,
        name: '江岸区',
        parentCode: 420100
      },
      {
        code: 420103,
        name: '江汉区',
        parentCode: 420100
      },
      {
        code: 420104,
        name: '硚口区',
        parentCode: 420100
      },
      {
        code: 420105,
        name: '汉阳区',
        parentCode: 420100
      },
      {
        code: 421000,
        name: '荆州市',
        parentCode: 420000
      },
      {
        code: 421001,
        name: '市辖区',
        parentCode: 421000
      },
      {
        code: 421002,
        name: '沙市区',
        parentCode: 421000
      },
      {
        code: 421003,
        name: '荆州区',
        parentCode: 421000
      },
      {
        code: 430000,
        name: '湖南省',
        parentCode: 0
      },
      {
        code: 430100,
        name: '长沙市',
        parentCode: 430000
      },
      {
        code: 430101,
        name: '市辖区',
        parentCode: 430100
      },
      {
        code: 430102,
        name: '芙蓉区',
        parentCode: 430100
      },
      {
        code: 430103,
        name: '天心区',
        parentCode: 430100
      },
      {
        code: 430104,
        name: '岳麓区',
        parentCode: 430100
      }]
      for (let i = 0; i < data.length; i++) {
        this.structure.push({
          value: data[i].code,
          parentValue: data[i].parentCode,
          label: data[i].name,
          nodeData: data[i]
        })
      }
      this.currStructure = this.buildTree(this.structure)
    },
    buildTree (nodes) {
      let len = nodes.length // 节点数量
      let tops = [] // 顶级节点数组，如果只有一个顶级节点，该数组只有一个元素，并且该顶级节点是根节点。
      if (len === 1) return nodes[0]
      tops = nodes.filter((m) => {
        if (!m.parentValue) {
          return m
        } else {
          let hasParent = nodes.find((n) => {
            if (n.value === m.parentValue) {
              if (!n.children) {
                n.children = []
              }
              n.children.push(m)
              n.leaf = false
              return n
            }
          })
          if (!hasParent) {
            return m
          }
        }
      })
      return tops
    }
  },
  components: {
    MsFormOrganization
  }
}
</script>

<style lang="less">
</style>
