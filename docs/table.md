## table表格
---
开发之前也使用和参考了其他组件库中的表格组件，感叹一个表格组件竟可以扩展这么多功能。自己写的话一定考虑不全，可又很好奇表格组件到底怎么写来更使用。
依据项目中的需求，整理了并开发了此组件，基本功能如下:

* 支持左右滑动
* 自定义高度后，支持上下滑动
* 上下滑动的过程中支持表头固定
* 支持操作选项中自定义元素
* 支持按照某个字段排序
* 支持表头字段显示提示文本

[在线预览](https://zhhshen.github.io/vue-zh/#/table)

## 使用组件

#### 带操作按钮的表格

此处使用了vue中的[作用域插槽](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD)

```html
<ms-table :columns="tableHead" :data="tableBody"  actions height="400px">
  <template slot="others" scope="props">
    <a class="ms-button" @click="readRow(props)">查看</a>
    <a class="ms-button ms-info" @click="editRow(props)">编辑</a>
    <a class="ms-button ms-danger" @click="deleteRow(props)">删除</a>
    <a class="ms-button ms-warning" @click="roleRow(props)">权限</a>
  </template>
</ms-table>

......

methods: {
  editRow: function (props) {
    console.log(props.content) // 表格每行的item项
    console.log(props.index) // 表格每行的索引值
  },
  ......
}

```

#### 实现上下滑动

设置高度属性，需要加上单位px

```html
<ms-table :columns="tableHead" :data="tableBody" height="400px">
</ms-table>
```
#### 实现左右滑动

表格body中的展示项是根据表头中有的项展示的，目前设置的每个单元格最小宽度为300px

## 组件API

组件中定义的**props**

```html
props: {
  // 上下滚动的高度
  height: {
    type: [Number, String]
  },
  // thead元素
  columns: {
    type: [Array],
    default: function () {
      return []
    }
  },
  // tbody元素
  data: {
    type: [Array],
    default: function () {
      return []
    }
  },
  // 操作项
  actions: Boolean
},
```
