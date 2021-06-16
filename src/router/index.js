import { createRouter, createWebHashHistory } from 'vue-router';
import { getToken, removeToken } from '@/utils/auth'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        { path: '/login', component: () => import('@/views/login/index'), },
        { path: '/index', component: () => import('@/views/index/index'), }
    ]
})

const whiteList = ['/login'] // 未验证token的路由

router.beforeEach((to, from, next) => {
    const hasToken = getToken();
    if (hasToken) {
        next()
        if (to.path === '/login') {
            next('/login')
            removeToken()
        }
        console.log(to.path, "====to.path===")
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }

})


export default router