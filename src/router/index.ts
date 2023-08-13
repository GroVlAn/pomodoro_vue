import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => StatisticsPage,
  },
  {
    path: '/auth/sign-in',
    name: 'sign-in',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => SignIn,
  },
  {
    path: '/auth/sign-up',
    name: 'sign-up',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => SignUp,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
