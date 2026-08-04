import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import CatalogPage from '@/views/CatalogPage.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'catalog',
    component: CatalogPage,
    meta: { title: 'Каталог' },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/CartPage.vue'),
    meta: { title: 'Корзина' },
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: () => import('@/views/DeliveryPage.vue'),
    meta: { title: 'Доставка' },
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('@/views/PaymentPage.vue'),
    meta: { title: 'Оплата' },
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('@/views/ContactsPage.vue'),
    meta: { title: 'Контакты' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutPage.vue'),
    meta: { title: 'О компании' },
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.afterEach((to) => {
  const pageTitle = (to.meta && to.meta.title) || 'Banki.shop';
  document.title = `${pageTitle} — Banki.shop`;
});

export default router;
