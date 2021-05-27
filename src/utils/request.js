import axios from 'axios';
import { getToken } from '@/utils/auth';
import store from '@/store';
// create an axios instance
const service = axios.create({
    baseURL: 'http://127.0.0.1:3000', // url = base url + request url
    timeout: 30000 // request timeout
})

const whiteList = ['/user/login', '/user/register'];// 不需要带token

// 请求
service.interceptors.request.use(
    config => {
        console.log(config, "====config  请求   request===")
        if (whiteList.indexOf(config.url) == -1) {
            if (store.getters.token) {
                config.headers['X-Token'] = getToken()
            }
        }
        return config
    },
    error => {
        console.log(error, "====error  请求错误") // for debug
        return Promise.reject(error)
    }
)

// 响应
service.interceptors.response.use(
    response => {
        const res = response.data || {};
        if (response.headers['x-token']) {
            res.headers = response.headers
        }
        if (res.code !== 200) {
            // Message.error({
            //     content: res.msg || 'Error',
            //     duration: 5
            // })

            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        // console.log('err' + error) // for debug
        // Message.error({
        //     content: error.message,
        //     duration: 5
        // })
        return Promise.reject(error)
    }
)

export default service
