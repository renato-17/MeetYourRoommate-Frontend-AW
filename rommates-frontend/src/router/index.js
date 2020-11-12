import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/lessors/:id',
    name: 'Lessor',
    component: () => import('../components/lessors')
  },
  {
    path: '/lessors/:lessorId/properties',
    name: 'Property',
    component: () => import('../components/property')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
