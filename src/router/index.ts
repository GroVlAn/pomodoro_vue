import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import MainPage from '../views/mainPage/main-page.vue';
import StatisticsPage from '../views/statistics/statistics-page.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
  },
  {
    path: '/statistics',
    name: 'statistics',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => StatisticsPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
