<template lang="html">
  <div class="ms-confirm-wrap" v-show="visible">
    <div class="ms-confirm-inner">
      <div class="ms-confirm-title">{{title}}</div>
      <div class="ms-confirm-body">
        <div class="ms-confirm-content">
          <slot></slot>
        </div>
        <div class="ms-confirm-actions">
          <a class="ms-button" @click="cancelAction">取消</a>
          <a class="ms-button ms-success" @click="confirmSuccess">确定</a>
        </div>
      </div>
    </div>
    <div class="ms-overlayer" @click="cancelAction"></div>
  </div>
</template>

<script>
export default {
  name: 'ms-confirm',
  data: function () {
    return {}
  },
  props: {
    title: String,
    text: [String, Number],
    value: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    visible: function () {
      return this.value
    }
  },
  methods: {
    confirmSuccess: function () {
      this.$emit('confirm-success')
    },
    cancelAction: function () {
      this.$emit('input', false)
    }
  },
  beforeDestroy: function () {
  }
}
</script>

<style lang="less">
.ms-confirm-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9990;
  transition: .3s ease-in-out;
}
.ms-confirm-inner {
  position: absolute;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  width: 400px;
  height: auto;
  overflow-y: auto;
  max-width: 60%;
  max-height: 80%;
  -ms-transform: translate(-50%,-50%);
  -o-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.3);
  -moz-transition: all 1s;
  -ms-transition: all 1s;
  -webkit-transition: all 1s;
  transition: all 1s;
  z-index: 9992;
  overflow: hidden;
}
.ms-confirm-title {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}
.ms-confirm-body {
  padding: 20px;
}
.ms-confirm-search input {
  display: inline-block;
  width: 100%;
  height: 38px;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
}
.ms-confirm-error-tips {
  color: rgb(255, 56, 96);
  padding: 5px 0;
  font-size: 12px;
}
.ms-confirm-actions {
  margin-top: 15px;
  text-align: right;
}
.ms-overlayer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9991;
  pointer-events: auto;
}
</style>
