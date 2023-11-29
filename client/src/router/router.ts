import { createRouter, createWebHashHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';

import LoginPage from '../components/auth/LoginPage.vue';
import AppMain from '../components/main/AppMain.vue';
import sidebarRoutes from './sidebarRoutes';
import secondaryRoutes from './secondaryRoutes';
import store from '../store/Store';

let entryUrl: string | null = null;

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppMain,
    redirect: '/products',
    children: [...sidebarRoutes, ...secondaryRoutes],
  },
  {
    path: '/login',
    component: LoginPage,
    meta: {
      title: 'Login',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/**
 * Redirect to Login page if not logged in,
 * after login redirect to original page
 */
router.beforeEach((to, _from, next) => {
  document.title = `${to.meta?.title} | Admin Panel`;

  if (to.path !== '/login') {
    store.dispatch('authModule/checkAuth', null, { root: true }).then((res: any) => {
      if (res) {
        if (entryUrl) {
          const url = entryUrl;
          entryUrl = null;
          next(url);
        } else {
          next();
        }
      } else {
        entryUrl = to.path;
        next('/login');
      }
    });
  } else {
    store.dispatch('authModule/checkAuth', null, { root: true }).then((res: any) => {
      if (res) {
        next('/');
      } else {
        next();
      }
    });
  }
});

export default router;
