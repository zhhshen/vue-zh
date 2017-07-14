<template lang="html">
<div class="doc-center">
  <div class="ms-form-item">
    <span>多选:</span>
    <ms-form-multiple-select v-model="selectedMore" :organization="multiple" :custom-style="{ width: '400px' }"></ms-form-multiple-select>
    <p class="tips"><span>选择值：</span>{{selectedMore}}</p>
  </div>
</div>
</template>

<script>
import MsFormMultipleSelect from '@/components/Form/FormMultipleSelect'
import * as api from '@/api'
export default {
  data () {
    return {
      // 选择
      selectedMore: [],
      multiple: []
    }
  },
  created () {
    this.multiple = api.single()
    console.log(api.single())
  },
  components: {
    MsFormMultipleSelect
  }
}
</script>

<style lang="less">
</style>
