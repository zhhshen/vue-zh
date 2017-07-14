<template lang="html">
  <div class="chart-wrap">
    <div :id="uid" ref="chart" class="chart-inner" :style="styles"></div>
  </div>
</template>

<script>
import { UUID } from '@/utils/help'
import Highcharts from 'highcharts'
require('highcharts/highcharts-more.js')(Highcharts)
require('highcharts/modules/map')(Highcharts)
// 默认设置
const defaultOpt = {
  credits: {
    enabled: false // 去掉水印
  },
  chart: {
    title: null
  },
  title: {
    text: null
  },
  tooltip: {
    shared: true,
    backgroundColor: '#fff',   // 背景颜色
    borderRadius: 3,             // 边框圆角
    borderWidth: 1,             // 边框宽度
    borderColor: '#eee',         // 边框颜色
    shadow: true,                 // 是否显示阴影
    animation: true,               // 是否启用动画效果
    style: {                      // 文字内容相关样式
      fontSize: '14px',
      padding: '10px'
    },
    headerFormat: '<small style="font-size: 14px;">{point.key}</small><br/>'
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    x: 0,
    y: 0,
    verticalAlign: 'middle',
    borderWidth: 0
  },
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal'
        },
        yAxis: {
          labels: {
            align: 'left',
            x: 0,
            y: -10
          },
          title: {
            text: null
          },
          tickPixelInterval: 40
        },
        subtitle: {
          text: null
        },
        credits: {
          enabled: false
        }
      }
    }]
  }
}
export default {
  name: 'ms-highchart',
  data () {
    return {
      target: null
    }
  },
  props: {
    layout: Object,
    others: [Object, String],
    resizable: Boolean
  },
  watch: {
    others: function (newVal) {
      if (newVal) {
        this.startDraw(newVal)
      }
    }
  },
  computed: {
    uid () {
      return 'chart_' + UUID.generate()
    },
    styles () {
      return this.layout
    },
    options () {
      return this.others || {}
    }
  },
  mounted () {
    this.startDraw(this.options)
    if (this.resizable) {
      this.resize()
    }
  },
  methods: {
    startDraw (opts) {
      this.$nextTick(function () {
        let dom = this.$refs.chart.id
        this.target = Highcharts.chart(dom, Object.assign({}, defaultOpt, opts))
      })
    },
    resize () {
      let self = this
      let resizeTimer = null
      window.onresize = function () {
        if (resizeTimer) clearTimeout(resizeTimer)
        resizeTimer = setTimeout(function () {
          self.startDraw(self.options)
        }, 100)
      }
    }
  },
  beforeDestroy () {
    this.target.destroy()
  }
}
</script>

<style lang="less">
.chart-inner {
  text-align: center;
}
</style>
