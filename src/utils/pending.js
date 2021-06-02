// 声明一个 Map 用于存储每个请求的标识 和 取消函数
// 基本等于没有用（必须条件网络慢而且后端还是会接受到）
import axios from 'axios';
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config 
 */
export const addPending = (config) => {
    const url = [
        config.method,
        config.url,
        JSON.stringify(config.params),
        JSON.stringify(config.data)
    ].join('&')
    config.cancelToken = new axios.CancelToken(function executor(cancel) {
        if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
            console.log(url, "=====11========")
            pending.set(url, cancel)
        }
    })
}
/**
 * 移除请求
 * @param {Object} config 
 */
export const removePending = (config) => {
    const url = [
        config.method,
        config.url,
        JSON.stringify(config.params),
        JSON.stringify(config.data)
    ].join('&')

    if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
        const cancel = pending.get(url)
        cancel(url)
        // console.log(config.baseURL + config.url, "=======2222222======", url)

        pending.delete(url)
    }
}
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
    for (const [url, cancel] of pending) {
        cancel(url)
    }
    pending.clear()
}