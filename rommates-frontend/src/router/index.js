import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/lessors/:id',
    name: 'Lessor',
    component: () => import('../components/lessor')
  },
  {
    path: '/properties/:id',
    name: 'Property',
    component: () => import('../components/property')
  },
  {
    path: '/ads',
    name: 'Ads',
    component: () => import('../components/ads')
  },
  {
    path: '/lessors/:id/properties',
    name: 'properties',
    component: () => import('../components/properties')
  },
  {
    path: '/lessors/:id/properties/add-property',
    name: 'add-property',
    component: () => import('../pages/add-property')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
