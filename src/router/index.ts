import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/index.vue')
  },
  {
    path: '/auto',
    name: 'Auto',
    component: () => import('../views/auto/index.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('../views/notFound/index.vue')
  }]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/auto') {
    const token = store.state.token
    if (!token) {
      return '/auto'
    }
  }
  // 4使用
  // if (to.path === '/main') {
  //   return firstMenu.url
  // }
})

export default router
