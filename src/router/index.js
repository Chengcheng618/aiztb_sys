import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Member from '../views/member.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Member',
    component: Member
  },
]

const router = new VueRouter({
  routes
})

export default router
