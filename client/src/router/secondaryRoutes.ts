import { RouteRecordRaw } from 'vue-router';

import ProductPage from '../components/entities/products/ProductPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/products/new',
    component: ProductPage,
    name: 'NewProduct',
    meta: {
      title: 'New product',
      idProp: null,
    },
  },
  {
    path: '/products/:id',
    component: ProductPage,
    name: 'Product',
    meta: {
      title: 'Product',
      idProp: 'id',
    },
    props: true,
  },
];

export default routes;
