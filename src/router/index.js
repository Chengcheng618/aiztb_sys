import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/Home.vue'
import Examine from '../views/examine.vue'
import Detail from '../views/detail.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home
    },
    {
        path: '/Examine',
        name: 'Examine',
        component: Examine
    },
    {
        path: '/Detail',
        name: 'Detail',
        component: Detail
    },
]

const router = new VueRouter({
    routes
})

export default router