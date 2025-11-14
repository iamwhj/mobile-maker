import Layout from '@/layout/index'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/appList',
    children: [
      {
        path: 'appList',
        name: 'appList',
        component: () => import('@/views/app-list'),
      },
      {
        path: '/compList',
        name: 'compList',
        component: () => import('@/views/comp-list'),
      },
    ],
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/editor-entry'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
