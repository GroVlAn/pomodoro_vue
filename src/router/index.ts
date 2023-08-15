import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainPage from '../views/mainPage/main-page.vue';
import StatisticsPage from '../views/statistics/statistics-page.vue';
import SignIn from '../views/auth/sign-in.vue';
import SignUp from '../views/auth/sign-up.vue';
import { globalStore } from '@/shared/api/store/store';

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

router.beforeEach((to) => {
  if (!globalStore.userId) {
    if (to.name == 'statistics') {
      router.replace('/');
      return false;
    }
  } else {
    if (to.name == 'sign-in' || to.name == 'sign-in') {
      router.replace('/');
      return false;
    }
  }
});

export default router;
