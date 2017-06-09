<template lang="html">
<div class="structure-wrap hello">
  <div class="title">
    <h4>前端处理数据的情况</h4>
  </div>
  <div class="ms-form">
    <div class="ms-form-item">
      <label class="ms-form-label">组织架构:</label>
      <div class="ms-form-input-block">
        <form-organization :organization="currStructure" v-model="seleted"></form-organization>
      </div>
    </div>
    <div class="ms-form-item">
      <label class="ms-form-label">组织架构:</label>
      <div class="ms-form-input-block">
        <form-organization :organization="currStructure" v-model="seleted2"></form-organization>
      </div>
    </div>
  </div>
  <div class="router-links">
    <router-link :to="{ path: '/' }">查看后端处理数据情况</router-link>
  </div>
</div>
</template>

<script>
import FormOrganization from '../components/FormOrganization'
export default {
  name: 'structure',
  data () {
    return {
      structure: [],
      seleted: [],
      seleted2: [],
      currStructure: []
    }
  },
  computed: {
  },
  created () {
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
    this.currStructure = this.buildTree2(this.structure)
  },
  methods: {
    /**
     *构建树，如果传入的参数有多个跟节点，则返回数组，如果只有一个根节点，则返回根节点。
     *节点格式：{id: 1, parentId: null, text: '', children: [], leaf: true}
     * 返回树的根节点
     */
    buildTree (nodes) {
      // 如果传入的参数不是数组或者是空数组，则退出
      if (Object.prototype.toString.call(nodes) !== '[object Array]' || nodes.length === 0) {
        return null
      }
      let child
      let parent
      let hasParent
      let len = nodes.length // 节点数量
      let tops = [] // 顶级节点数组，如果只有一个顶级节点，该数组只有一个元素，并且该顶级节点是根节点。
      if (len === 1) return nodes[0]
      for (let i = 0; i < len; i++) {
        child = nodes[i]
        hasParent = false
        if (!child.parentValue) {
          tops.push(child)
          continue
        }
        console.log(child)
        for (let j = 0; j < len; j++) {
          parent = nodes[j]
          if (parent.value === child.parentValue) {
            // 添加子节点
            if (!parent.children) {
              parent.children = []
            }
            parent.children.push(child)
            parent.leaf = false
            hasParent = true
            break
          }
        }
        // 如果child没有父节点，则child是顶级节点
        if (!hasParent) {
          tops.push(child)
        }
      }
      return tops.length === 1 ? tops[0] : tops
    },
    buildTree2 (nodes) {
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
    FormOrganization
  }
}
</script>

<style lang="css">
</style>
