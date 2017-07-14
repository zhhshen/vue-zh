import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Base/Home'
// content
import Organization from '@/views/Content/Organization'
import Multiple from '@/views/Content/Multiple'
import Table from '@/views/Content/Table'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/organization',
      children: [
        { path: '/organization', component: Organization, name: 'organization' },
        { path: '/multiple', component: Multiple, name: 'multiple' },
        { path: '/table', component: Table, name: 'table' }
      ]
    }
  ]
})
