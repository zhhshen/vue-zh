<template lang="html">
<div class="chart-wrap">
  <div :id="uid" class="chart-inner"></div>
</div>
</template>

<script>
// 使用d3实现的桑基图
import { UUID } from '@/utils/help'
let d3 = Object.assign({}, require('d3'), require('d3-sankey'))
let formatNumber = d3.format(',.0f')
let format = function(d) {
  return formatNumber(d) + ''
}
let color = d3.scaleOrdinal(d3.schemeCategory20)
let svg, sankey, link, node
export default {
  name: 'ms-sankey',
  data () {
    return {
      target: null
    }
  },
  props: {
    others: Object
  },
  computed: {
    uid () {
      return 'd3-chart_' + UUID.generate()
    },
    options () {
      return this.others || {}
    }
  },
  watch: {
    others (newVal) {
      console.log(newVal)
      if (newVal) {
        this.updateSankey(newVal)
      }
    }
  },
  mounted () {
    this.startSankey(this.options)
  },
  methods: {
    // 绘制桑基图
    startSankey (options) {
      let dom = '#' + this.uid
      options = {
        width: options.width || 800,
        height: options.height || 600,
        graph: options.graph || {
          nodes: [],
          links: []
        }
      }
      let margin = {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
      }
      d3.select(dom)
        .append('div')
          .attr('class', 'd3-tooltip')
      svg = d3.select(dom).append('svg').attr('width', options.width + margin.left + margin.right).attr('height', options.height + margin.top + margin.bottom)
      sankey = d3.sankey().nodeWidth(20).nodePadding(20).extent([[1, 1], [options.width - 1, options.height - 6]])
      // update
      this.updateSankey(options)

    },

    updateSankey (options) {
      let updateW = options.width
      let updateH = options.height
      let updateGraph = options.graph
      svg.selectAll('*').remove()
      // define link
      link = svg.append('g')
                .attr('class', 'links')
                .attr('fill', 'none')
                .attr('stroke', '#000')
                .attr('stroke-opacity', 0.2)
              .selectAll(".link")

      // define node
      node = svg.append('g').selectAll('.node')
      // update svg size
      svg.attr('width', updateW).attr('height', updateH)
      sankey.extent([[1, 1], [updateW - 1, updateH - 6]])
      // insert data
      sankey(updateGraph)

      // update link
      link.data(updateGraph.links)
        .enter().append('path')
        .attr('class', 'link')
        .attr('d', d3.sankeyLinkHorizontal())
        .style('stroke-width', function (d) {
          return Math.max(1, d.width)
        })
        .sort(function (a, b) {
          return b.width - a.width;
        })
        .append('title')
        .text(function (d) { return d.source.name + " → " + d.target.name + '\n' + format(d.value) })

      // update nodes
      node = node.data(updateGraph.nodes)
        .enter().append('g')
        .attr('class', 'node')

      node.append('rect')
        .attr('x', function (d) { return d.x0 })
        .attr('y', function (d) { return d.y0 })
        .attr('height', function (d) { return d.y1 - d.y0 })
        .attr('width', function (d) { return d.x1 - d.x0 })
        .attr('fill', function (d) { return color(d.name.replace(/ .*/, '')) })
        .attr('stroke', function (d) { return d3.rgb(d.color).darker(2) })
        .append('title')
          .text(function(d) { return d.name + '\n' + format(d.value) })

      node.append('text')
        .attr('x', function (d) { return d.x0 - 6 })
        .attr('y', function (d) { return (d.y1 + d.y0) / 2 })
        .attr('dy', '0.35em')
        .attr('text-anchor', 'end')
        .text(function(d) { return d.name })
      .filter(function(d) { return d.x0 < updateW / 2 })
        .attr('x', function(d) { return d.x1 + 6 })
        .attr('text-anchor', 'start')
    }
  }
}
</script>

<style lang="less">
.node rect {
  fill-opacity: .9;
  shape-rendering: crispEdges;
  stroke-width: 0;
  cursor: pointer;
}
.node text {
  text-shadow: 0 1px 0 #fff;
}
.link {
  fill: none;
  stroke: #ddd;
  stroke-opacity: 0.4;
  cursor: pointer;
}
.link title {
  visibility: hidden;
}
.link:hover {
  stroke-opacity: 1;
}
.link:hover title{
  visibility: visible;
}
</style>
