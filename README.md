# 基于vue2.0实现的级联选择器

> 基于Vue的级联选择器，可以单项，二级， 三级级联，多级级联

web开发中我们经常会遇到级联选择器的问题，尤其是在表单中,无外乎几种情况：

* 单个级联 (下拉选择框，单选)
* 单个级联 (多项选择)
* 二级联动 （省份和城市联动）
* 三级联动 (省市区联动)

在jquery中有很多好用的插件，比如[select2](https://github.com/select2/select2), 单选，多选的功能都具备。

本文探讨一下在vue中的实现级联选择器，自己在项目中碰到过以下两种情况的后端数据,查阅资料后也证实了这两种数据的合理性:

[预览地址](https://zhhshen.github.io/form-orgination/docs)

[github地址](https://github.com/zhhshen/form-orgination)

#### 1 后端处理数据逻辑

这种情况是**比较推荐**的，大量的数据运算放在后端来进行，只需前后端商量好数据格式即可

一般的数据格式可能如下：
```javascript
[{
  value: 'beijing',
  label: '北京',
  children: [{
    value: 'chaoyang',
    label: '朝阳'
  }, {
    value: 'haidian',
    label: '海淀'
  }, {
    value: 'changping',
    label: '昌平'
  }, {
    value: 'shunyi',
    label: '顺义'
  }]
}, {
  value: 'shanghai',
  label: '上海',
  children: [{
    value: 'baoshan',
    label: '宝山'
  }, {
    value: 'jiading',
    label: '嘉定'
  }, {
    value: 'songjiang',
    label: '松江'
  }, {
    value: 'pudong',
    label: '浦东'
  }]
}]
```
特点：数据之间层级嵌套，上下级的关系很清晰

#### 2 前端处理数据逻辑

这种情况适合数据量较小的数据，或者由于某种原因后端只能返给你这种数据，那所有的数据处理就需要前端来操作，最终拼成的格式也与上述情况类似，只不过是多几个或少几个字段的问题。

数据格式可能会是这样：

```javascript
[{
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
```
特点：数据格式是个平面表，每一条数据中都带有与之相对应的上下级关系。当我们查看某个数据的上下级时，都需要重新去遍历一遍数据。

#### 如何在组件中使用

```html
<div class="hello">
  <form-organization :organization="organization" v-model="seleted"></form-organization>
</div>

<script>
import FormOrganization from '@/components/FormOrganization'
export default {
  name: 'hello',
  data () {
    return {
      seleted: [],
      organization: [{
        value: 'beijing',
        label: '北京'
      }, {
        value: 'shanghai',
        label: '上海'
      }, {
        value: 'shenzhen',
        label: '深圳'
      }, {
        value: 'hangzhou',
        label: '杭州'
      }, {
        value: 'zhengzhou',
        label: '郑州'
      }, {
        value: 'guangzhou',
        label: '广州'
      }, {
        value: 'xiamen',
        label: '厦门'
      }]
    }
  },
  components: {
    FormOrganization
  }
}
</script>

```

#### API

| props        | type         |  description |
| :-------------: |:-------------:| :-----:|
| origanization | Array | 级联数据源，格式必须按照第一种数据中的格式显示 |
|  value   | Array      |  选中中或默认值,可以直接用v-model语法糖，具体可以查看例子 |


参考资料： [Web中树形数据(层级关系数据)的实现](http://blog.csdn.net/accountwcx/article/details/46851713)
