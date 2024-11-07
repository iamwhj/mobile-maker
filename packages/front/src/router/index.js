import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/layout/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/activity',
    children: [
      {
        path: 'activity',
        name: 'activity',
        component: () => import('@/views/activity/ActivityList'),
      },
      {
        path: 'activityEdit',
        name: 'activityEdit',
        component: () => import('@/views/activity/ActivityEdit'),
        props: (r) => ({
          activityId: r.query.activityId,
          status: r.query.status,
        }),
      },
      {
        path: '/componentManage',
        name: 'componentManage',
        component: () => import('@/views/componentManage'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
