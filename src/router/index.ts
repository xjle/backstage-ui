import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
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

export default router
