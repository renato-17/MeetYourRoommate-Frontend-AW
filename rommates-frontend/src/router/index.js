import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home.vue'

Vue.use(VueRouter)

const routes = [
    { path: '', redirectTo: 'home'},
    { path: '/home', name: 'home', component: Home},
    { path: '/login', name: 'login', component: () => import('../pages/login') },
    { path: '/register', name: 'register', component: () => import('../pages/register')},
    { path: '/profile', name: 'profile', component: () => import('../user-pages/student-views/student')},
    { path: '/students/home', name: 'student-home', component: () =>import('../user-pages/student-views/student-main')},
    { path: '/lessors/:id', name: 'lessor', component: () => import('../user-pages/lessor-views/lessor')},
    { path: '/properties/:id', name: 'property', component: () => import('../user-pages/general-views/property')},
    {path: '/ads', name: 'ads', component: () => import('../user-pages/student-views/ads')}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
