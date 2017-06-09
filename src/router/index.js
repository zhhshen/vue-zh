import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/demo1'
import Hello2 from '@/views/demo2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Hello
    },
    {
      path: '/structure',
      name: 'structure',
      component: Hello2
    }
  ]
})
