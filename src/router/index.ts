import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainPage from '../views/mainPage/main-page.vue';
import StatisticsPage from '../views/statistics/statistics-page.vue';
import SignIn from '../views/auth/sign-in.vue';
import SignUp from '../views/auth/sign-up.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: StatisticsPage,
  },
  {
    path: '/auth/sign-in',
    name: 'sign-in',
    component: SignIn,
  },
  {
    path: '/auth/sign-up',
    name: 'sign-up',
    component: SignUp,
  },
  { path: '/:pathMatch(.*)*', redirect: { path: '/' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
