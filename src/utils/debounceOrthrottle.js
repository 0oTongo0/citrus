// 防抖
export function debounce(fn, delay) {
    // 记录上一次的延时器
    var timer = null;
    var delay = delay || 200;
    return function () {
        var args = arguments;
        var that = this;
        // 清除上一次延时器
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(that, args)
        }, delay);
    }
}
// 节流
export function throttle(fn, interval) {
    var last;
    var timer;
    var interval = interval || 500;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
}