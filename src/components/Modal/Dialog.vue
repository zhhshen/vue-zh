<template lang="html">
<div class="ms-dialog-wrap" v-show="visible">
  <div class="ms-dialog-inner" :style="style">
    <div class="ms-dialog-title">{{title}}</div>
    <div class="ms-dialog-body" :style="styleContent">
      <div class="ms-dialog-content">
        <slot></slot>
      </div>
    </div>
    <div class="ms-dialog-actions">
      <a class="ms-button" @click="cancelAction">取消</a>
      <a class="ms-button ms-success" @click="confirmSuccess">确定</a>
    </div>
  </div>
  <div class="ms-overlayer" @click="cancelAction"></div>
</div>
</template>

<script>
import { addClass, removeClass } from '@/utils/help'
export default {
  name: 'ms-dialog',
  data () {
    return {}
  },
  props: {
    title: String,
    value: {
      type: Boolean,
      required: false
    },
    width: {
      type: [Number, String]
    },
    scrollArea: [Number, String]
  },
  computed: {
    visible () {
      return this.value
    },

    style () {
      return {
        width: this.width + 'px'
      }
    },

    styleContent () {
      return {
        height: this.scrollArea + 'px'
      }
    }
  },
  watch: {
    visible (newVal) {
      let elem = document.querySelector('html')
      if (newVal) {
        addClass(elem, 'hidden-html')
      } else {
        removeClass(elem, 'hidden-html')
      }
    }
  },
  methods: {
    confirmSuccess: function () {
      this.$emit('confirm-success')
    },
    cancelAction: function () {
      this.$emit('input', false)
    },
    disabledScroll: function (e) {
      e.preventDefault()
    }
  },
  beforeDestroy () {
  }
}
</script>

<style lang="less">
.ms-overlayer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9991;
}
.ms-dialog-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9990;
}
.ms-dialog-inner {
  position: absolute;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  width: 400px;
  height: auto;
  overflow: hidden;
  max-width: 90%;
  max-height: 90%;
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
}
.ms-dialog-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #444;
  font-weight: 500;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}
.ms-dialog-body {
  position: relative;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
}
.ms-dialog-content {
}
.ms-dialog-actions {
  margin-bottom: 15px;
  padding: 0 20px;
  text-align: right;
}
</style>
