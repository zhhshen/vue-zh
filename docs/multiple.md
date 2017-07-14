## 多选下拉框
---
多选下拉框是我们平时开发中经常用到的，从下拉框中选择多个选项，还有情况还需求在其他地方展示所选择的选项，这就要求从组件中的传递出来的数据，不只是所选元素的value值而已，最好是连同此value值对应的其他字段，方便我们展示多选的内容。

[在线预览](https://zhhshen.github.io/vue-zh/#/multiple)

## 引入组件

组件内部使用的是[vue中的自定义事件的表单输入组件](https://cn.vuejs.org/v2/guide/components.html#使用自定义事件的表单输入组件)

```html

<ms-form-multiple-select :value="selectedMore" :organization="multiple" :custom-style="{ width: '400px' }" @input="changeMultiple"></ms-form-multiple-select>

......

methods: {
  // 此处$emit出来2个变量, arguments[0]是选中的value值，类型是数组，
  // arguments[1]是选中的value值，对应的item项，类型也是数组
  changeMultiple: function (vals, items) {
    console.log(vals) // ['010', '021', '022']
    console.log(items) // [{ value: '010', label: '北京'}, { value: '021', label: '上海'}, { value: '022', label: '天津'}]
  },
  ......
}

```

## 组件API

组件中定义的**props**

```html
props: {
  // 下拉数据源
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
  // 定义组件的样式， 默认宽度是200px
  customStyle: {
    type: Object,
    default: () => {}
  }
}
```
