import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home.vue'

Vue.use(VueRouter)

const routes = [
    { path: '', redirectTo: 'home'},
    { path: '/home', name: 'home', component: Home},
    { path: '/login', name: 'login', component: () => import('../pages/login') },
    { path: '/register', name: 'register', component: () => import('../pages/register')},
    { path: '/student/:id', name: 'student', component: () => import('../user-pages/student-views/student')},
    { path: '/students/home', name: 'student-home', component: () =>import('../user-pages/student-views/student-main')},
    { path: '/students', name: 'students', component: () =>import('../user-pages/student-views/students')},

    { path: '/lessors/:id', name: 'lessor', component: () => import('../user-pages/lessor-views/lessor')},
    { path: '/properties/:id', name: 'property', component: () => import('../user-pages/general-views/property')},
    { path: '/ads', name: 'ads', component: () => import('../user-pages/student-views/ads')},
    {
        path: '/lessors/:id/properties',
        name: 'properties',
        component: () => import('../user-pages/lessor-views/properties')
    },
    {
        path: '/lessors/:id/properties/add-property',
        name: 'add-property',
        component: () => import('../pages/add-property')
    },
    {
        path: '/lessors/:id/reservation/:propertyId/:studentId',
        name: 'reservation',
        component: () => import('../user-pages/lessor-views/reservation')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
