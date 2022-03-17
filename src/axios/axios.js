import axios from 'axios'
import qs from 'qs'
// 引入接口地址
import { base_url } from './config'

axios.defaults.retryDelay = 600 /* 请求延迟 */
axios.defaults.timeout = 1500000 /* 响应超时时间 */
    //自动切换环境
axios.defaults.baseURL = base_url

// 请求拦截
axios.interceptors.request.use(
        (config) => {
            let token = window.sessionStorage.getItem('access_token')
            if (token) {
                config.headers['token'] = token
            }
            if (config.method === 'post' && config['Content-Type'] == 'application/json') {
                config.data = qs.stringify(config.data);
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        }
    )
    /* 返回状态判断(添加响应拦截器) */
axios.interceptors.response.use((res) => {
    /* 对返回数据是否成功做判断 */
    return res
}, (error) => {
    console.log(error)
    return Promise.reject(error)
})

// 封装get方法
/* 返回一个Promise(发送get请求) 采用query格式*/
export function axiosGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: param })
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//封装post方法
export function axiosPost(url, params, headers) {
    if (!headers) {
        headers = {}
        headers['Content-Type'] = 'application/json'
    } else {
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json'
        }
    }
    return new Promise((resolve, reject) => {
        axios.post(url, params, headers).then(response => {
            resolve(response)
        }, err => {
            reject(err)
        }).catch(error => {
            reject(error)
        })
    })
}