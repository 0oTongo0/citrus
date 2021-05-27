import request from '../utils/request';
// params(post)
// 登录 
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

// 注册
export function signUp(data) {
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}