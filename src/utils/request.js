import axios from 'axios'
import store from '@/store'
import Message from 'ant-design-vue/lib/message'
import 'ant-design-vue/lib/button/style/css'
import { getToken } from '@/utils/auth'
import config from '@/utils/config'

// create an axios instance
const service = axios.create({
    baseURL: config.dev, // url = base url + request url
    timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers.Authorization = getToken()
        }
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        if (response.headers.authorization || !response.data.code) {
            return response
        }
        const res = response.data

        if (res.code !== 200) {
            Message.error({
                content: res.msg || 'Error',
                duration: 5
            })

            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message.error({
            content: error.message,
            duration: 5
        })
        return Promise.reject(error)
    }
)

export default service
