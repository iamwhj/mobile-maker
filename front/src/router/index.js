import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/index.vue';

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
        component: () => import('@/views/activity/activityList.vue'),
      },
      {
        path: 'activityEdit',
        name: 'activityEdit',
        component: () => import('@/views/activity/activityEdit.vue'),
      },
      {
        path: '/component',
        name: 'component',
        component: () => import('@/views/material'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
