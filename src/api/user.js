import request from '../utils/request';
// params(get)
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

// 搜索
export function searchUser(data) {
    return request({
        url: '/user/search',
        method: 'post',
        data
    })
}

// 根据用户id查找用户信息
export function userInfo(data) {
    return request({
        url: '/user/userInfo',
        method: 'post',
        data
    })
}

// 根据用户id修改用户信息
export function updataUser(data) {
    return request({
        url: '/user/updataUser',
        method: 'put',
        data
    })
}


// 上传图片
export function upImg(data, headers) {
    return request({
        url: '/uploadImg',
        method: 'post',
        data,
        headers
    })
}