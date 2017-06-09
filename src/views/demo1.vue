<template>
  <div class="hello">
    <div class="title">
      <h4>后端处理数据的情况</h4>
    </div>
    <div class="ms-form">
      <div class="ms-form-item">
        <label class="ms-form-label">一级级联:</label>
        <div class="ms-form-input-block">
          <form-organization :organization="organization" v-model="seleted"></form-organization>
        </div>
      </div>
      <div class="ms-form-item">
        <label class="ms-form-label">二级级联:</label>
        <div class="ms-form-input-block">
          <form-organization :organization="organization2" v-model="seleted2"></form-organization>
        </div>
      </div>
      <div class="ms-form-item">
        <label class="ms-form-label">三级级联:</label>
        <div class="ms-form-input-block">
          <form-organization :organization="organization3" v-model="seleted3"></form-organization>
        </div>
      </div>
    </div>
    <div class="router-links">
      <router-link :to="{ path: '/structure' }">查看前端处理数据的情况</router-link>
    </div>
  </div>
</template>

<script>
import FormOrganization from '../components/FormOrganization'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      seleted: [],
      seleted2: [],
      seleted3: [],
      organization: [],
      organization2: [],
      organization3: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.genOrganization()
      this.genOrganization2()
      this.genOrganization3()
    },
    genOrganization () {
      let self = this
      setTimeout(() => {
        let data = [{
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
        data.forEach(function (item) {
          self.organization.push(item)
        })
      }, 1000)
    },
    genOrganization2 () {
      let self = this
      setTimeout(() => {
        let data = [{
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
        data.forEach(function (item) {
          self.organization2.push(item)
        })
      }, 1000)
    },
    genOrganization3 () {
      let self = this
      setTimeout(() => {
        let data = [{
          value: 'beijing',
          label: '北京',
          children: [{
            value: 'chaoyang',
            label: '朝阳',
            children: [{
              value: 'wangjing',
              label: '望京'
            }]
          }, {
            value: 'haidian',
            label: '海淀',
            children: [{
              value: 'zhongguancun',
              label: '中关村'
            }]
          }, {
            value: 'changping',
            label: '昌平',
            children: [{
              value: 'huoying',
              label: '霍营'
            }]
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
        data.forEach(function (item) {
          self.organization3.push(item)
        })
      }, 1000)
    }
  },
  components: {
    FormOrganization
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.ms-form {
  background: #fff;
  padding: 20px;
}

/*表单项*/
.ms-form-item {
  position: relative;
  margin-bottom: 15px;
  clear: both;
  *zoom:1;
}
.ms-form-label {
  display: block;
  position: absolute;
  padding: 8px 15px;
  width: 100px;
  font-weight: 600;
  text-align: right;
  line-height: 20px;
}
.ms-form-input-block {
  display: inline-block;
  position: relative;
  margin-left: 120px;
  min-height: 36px;
}
.form-input-text {
  display: inline-block;
  margin: 8px 10px 0 0;
  width: 300px;
  height: 38px;
  line-height: 28px;
  padding: 5px 10px;
  border: 1px solid #d6c6c6;
  border-radius: 3px;
  vertical-align: middle;
  outline: none;
}
.ms-form-input-after {
  position: absolute;
  top: 0px;
  right: 10px;
}

</style>
