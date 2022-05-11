import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import { axiosPost, axiosGet } from './axios/axios'
import * as echarts from 'echarts';
import VueAMap from 'vue-amap'; //引入高德地图

Vue.prototype.$axiosPost = axiosPost
Vue.prototype.$axiosGet = axiosGet
Vue.prototype.$echarts = echarts



Vue.use(ElementUI);
Vue.use(VueAMap);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')