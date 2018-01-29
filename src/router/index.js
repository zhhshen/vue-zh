import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Base/Home'
// content
import Organization from '@/views/Content/Organization'
import Multiple from '@/views/Content/Multiple'
import Table from '@/views/Content/Table'
import Pagination from '@/views/Content/Pagination'
import Swiper from '@/views/Content/Swiper'

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
        { path: '/table', component: Table, name: 'table' },
        { path: '/pagination', component: Pagination, name: 'pagination' },
        { path: '/swiper', component: Swiper, name: 'swiper' }
      ]
    }
  ]
})
