import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StudentRegister from '../pages/Student-register'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    ame: 'Login',
    component: () => import('../pages/Login'),
  },
  {
    path: '/login/students',
    name: 'RegisterStudent',
    component: StudentRegister
  },
  {
    path: '/students/:id',
    name: 'Student',

    component: ()=> import('../components/Student')
  },
  {
    path: '/home/:id',
    name: 'HomeApp',
    component: ()=>import('../pages/Main-page')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
