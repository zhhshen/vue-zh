import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello'
import Structure from '@/views/Structure'

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
      component: Structure
    }
  ]
})
