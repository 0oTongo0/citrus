import { createRouter, createWebHashHistory } from 'vue-router'; 17
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: () => import('@/views/index/index'), },
        { path: '/login', component: () => import('@/views/login/index'), }
    ]
})

export default router