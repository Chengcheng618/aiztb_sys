import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录
import Login from '../views/login.vue'
// 首页
import Home from '../views/Home//home/home.vue'
// 会员中心
import Member from '../views/member.vue'
// 审核中心-招标发布
import Bidding from '../views/Examine/bidding.vue'
// 审核中心-需求发布
import Demand from '../views/Examine/demand.vue'
// 审核中心-企业认证
import Attestation from '../views/Examine/attestation.vue'
// 审核详情
import Detail from '../views/Examine/detail.vue'
// 数据中心
import Userinfo from '../views/Data/userinfo/userinfo.vue'
// 充值金额
import Price from '../views/Price/price.vue'
// 通知中心
import noticeCenter from '../views/noticeCenter.vue'
// 会员充值收入
import memberRecharge from '../views/Home/memberRecharge/memberRecharge.vue'
// 访问记录
import Record from '../views/Home/record/record.vue'
// 个人信息详情
import UserinfoDeatils from '../views/Data/userinfo_details/userinfo_details.vue'

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
        path: '/Detail',
        name: 'Detail',
        component: Detail
    }, {
        path: '/Userinfo',
        name: 'Userinfo',
        component: Userinfo
    }, {
        path: '/Price',
        name: 'Price',
        component: Price
    }, {
        path: '/Bidding',
        name: 'Bidding',
        component: Bidding
    }, {
        path: '/Demand',
        name: 'Demand',
        component: Demand
    }, {
        path: '/Attestation',
        name: 'Attestation',
        component: Attestation
    }, {
        path: '/noticeCenter',
        name: 'noticeCenter',
        component: noticeCenter
    }, {
        path: '/memberRecharge',
        name: 'memberRecharge',
        component: memberRecharge
    }, {
        path: '/Record',
        name: 'Record',
        component: Record
    }, {
        path: '/UserinfoDeatils',
        name: 'UserinfoDeatils',
        component: UserinfoDeatils
    },
]

const router = new VueRouter({
    routes
})

export default router