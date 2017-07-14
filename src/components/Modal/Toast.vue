<template lang="html">
<div class="ms-toast-wrap" v-show="visible" :class="classes" :style="styles">
  <div v-text="toastText"></div>
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'ms-toast',
  data () {
    return {
      timer: null
    }
  },
  props: {
    value: Boolean,
    text: {
      required: false
    },
    delay: {
      type: Number,
      default: 3000
    },
    type: String,
    top: {
      type: [String, Number]
    }
  },
  computed: {
    toastText: function () {
      return this.text
    },
    visible: function () {
      return this.value
    },
    classes: function () {
      return {
        'ms-toast-success': this.type === 'success',
        'ms-toast-info': this.type === 'info',
        'ms-toast-error': this.type === 'error',
        'ms-toast-warn': this.type === 'warn'
      }
    },
    styles: function () {
      return {
        top: this.top + '%'
      }
    }
  },
  watch: {
    visible: function (newVal) {
      if (newVal) {
        var self = this
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(function () {
          self.$emit('input', false)
        }, self.delay)
      }
    }
  }
}
</script>

<style lang="less">
.ms-toast-wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 10px 20px;
  border-radius: 1px;
  max-width: 300px;
  -webkit-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  z-index: 9999;
}
.ms-toast-success {
  background-color: #23d160;
  color: #fff;
}
.ms-toast-error {
  background-color: #ff3860;
  color: #fff;
}
.ms-toast-info {
  background-color: #3273dc;
  color: #fff;
}
</style>
