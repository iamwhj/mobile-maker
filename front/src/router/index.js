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
        props: (r) => ({
          activityId: r.query.activityId,
          status: r.query.status,
        }),
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
