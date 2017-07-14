<template lang="html">
<div class="doc-center">
  <div class="ms-form-item">
    <span>下拉单选:</span>
    <ms-form-organization v-model="selectedOne" :organization="single"></ms-form-organization>
    <span>选择值：</span>
    <span>{{selectedOne}}</span>
  </div>
  <div class="ms-form-item">
    <span>省市区三级联动:</span>
    <ms-form-organization v-model="selectedMore" :organization="multiple"></ms-form-organization>
    <span>选择值：</span>
    <span>{{selectedMore}}</span>
    <p class="tips">提示: 例子中的省份城市是随机产生的</p>
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
      selectedMore: [],
      multiple: []
    }
  },
  created () {
    this.single = api.single()
    this.multiple = api.multiple()
  },
  components: {
    MsFormOrganization
  }
}
</script>

<style lang="less">
</style>
