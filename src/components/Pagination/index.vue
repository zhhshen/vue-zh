<template lang="html">
<div class="pagination-wrap" :style="styles">
  <ul class="ms-pagination" v-bind:class="classes">
  <li>
    <a href="#!" class="ms-pagination__navigation"
      v-bind:class="{ 'ms-pagination__navigation--disabled': value === 1 }"
      v-on:click.prevent="$emit('input', value - 1)"
    >
    ＜
    </a>
  </li>
  <li v-for="n in items">
    <a href="#!" class="ms-pagination__item"
      v-bind:class="{ 'ms-pagination__item--active': value === n }"
      v-on:click.prevent="$emit('input', n)"
      v-if="!isNaN(n)"
      v-text="n"
    >
    </a>
    <span class="ms-pagination__more" v-else v-text="n"></span>
  </li>
  <li>
    <a href="#!" class="ms-pagination__navigation"
      v-bind:class="{ 'ms-pagination__navigation--disabled': value === length }"
      v-on:click.prevent="$emit('input', value + 1)"
    >
    ＞
    </a>
  </li>
</ul>
</div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    circle: Boolean,
    disabled: Boolean,
    length: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    styles () {
     return {
       textAlign: this.position
     }
    },

    classes: function () {
      return {
        'ms-pagination--circle': this.circle,
        'ms-pagination--disabled': this.disabled
      }
    },

    items: function () {
      if (this.length <= 5) {
        return this.range(1, this.length)
      }

      var min = this.value - 3
      min = min > 0 ? min : 1

      var max = min + 6
      max = max <= this.length ? max : this.length

      if (max === this.length) {
        min = this.length - 6
      }

      var range = this.range(min, max)

      if (this.value >= 4 && this.length > 6) {
        range.splice(0, 2, 1, '...')
      }

      if (this.value + 3 < this.length && this.length > 6) {
        range.splice(range.length - 2, 2, '...', this.length)
      }

      return range
    }
  },

  methods: {
    range: function (from, to) {
      var range = []

      from = from > 0 ? from : 1

      for (var i = from; i <= to; i++) {
        range.push(i)
      }
      return range
    }
  }
}
</script>

<style lang="less">
.pagination-wrap {
  padding: 20px 0;
}
.ms-pagination {
  font-size: 16px;
  list-style-type: none;
  display: inline-flex;
  align-items: center;
  padding: 0;
  margin: 0;
  height: 40px;
  align-items: center;
}
.ms-pagination a {
  -webkit-transition: 0.3s cubic-bezier(0, 0, 0.2, 1);
  transition: 0.3s cubic-bezier(0, 0, 0.2, 1);
}
.ms-pagination--circle .pagination__item,
.ms-pagination--circle .pagination__more,
.ms-pagination--circle .pagination__navigation {
  border-radius: 50%;
}
.ms-pagination--disabled {
  pointer-events: none;
  opacity: .6;
}
.ms-pagination__item {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: #444;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  height: 34px;
  width: 34px;
  margin: .3rem;
  text-decoration: none;
  border: 0;
  outline: none;
}
.ms-pagination__item--active {
  /*background: #2196f3;*/
  background: #4caf50;
  color: #FFFFFF;
}
.ms-pagination__navigation {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #444;
  height: 2rem;
  border-radius: 4px;
  width: 2rem;
  margin: .3rem 15px;
}
.ms-pagination__navigation--disabled {
  pointer-events: none;
  opacity: 0.6;
}
.ms-pagination__more {
  margin: .3rem;
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  height: 2rem;
  width: 2rem;
}
</style>
