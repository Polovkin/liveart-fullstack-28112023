import { RouteRecordRaw } from 'vue-router';

import CategoryTable from '../components/entities/categories/CategoryTable.vue';
import CategoryDialog from '../components/entities/categories/CategoryDialog.vue';

import ProductTable from '../components/entities/products/ProductTable.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/products',
    component: ProductTable,
    name: 'Products-Item',
    meta: {
      title: 'Products',
      icon: 'mdi-hexagon',
      isSideBarIncludes: true,
    },
  },

  {
    path: '/categories',
    component: CategoryTable,
    name: 'Categories-Item',
    meta: {
      title: 'Categories',
      icon: 'mdi-database',
      isSideBarIncludes: true,
    },
    children: [
      {
        path: 'new',
        components: {
          default: CategoryTable,
          editDialog: CategoryDialog,
        },
        meta: {
          title: 'New category',
        },
        props: { default: false, editDialog: false },
      },
      {
        path: ':id',
        components: {
          default: CategoryTable,
          editDialog: CategoryDialog,
        },
        meta: {
          title: 'Category',
        },
        props: { default: false, editDialog: true },
      },
    ],
  },
];

export default routes;
