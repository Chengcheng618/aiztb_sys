import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/Home/home.vue'
import Member from '../views/member.vue'
import Examine from '../views/Examine/examine.vue'
import Detail from '../views/Examine/detail.vue'
import Data from '../views/Data/data.vue'
import Price from '../views/Price/price.vue'

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
        path: '/Member',
        name: 'Member',
        component: Member
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
    }, {
        path: '/Data',
        name: 'Data',
        component: Data
    }, {
        path: '/Price',
        name: 'Price',
        component: Price
    },
]

const router = new VueRouter({
    routes
})

export default router