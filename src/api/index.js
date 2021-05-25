import request from '@/utils/request';
export function getSignature(params) {
    return request({
        url: '/oss/api/v1/oss/getSignature',
        method: 'get',
        params
    })
}