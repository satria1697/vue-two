import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/normal-to-camel-view',
      name: 'normal-to-camel',
      component: () => import('../views/NormalToCamelView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/normal-to-class-view',
      name: 'normal-to-class',
      component: () => import('../views/NormalToClassView.vue'),
    },
    {
      path: '/normal-to-object-view',
      name: 'normal-to-object',
      component: () => import('../views/NormalToObjectView.vue'),
    },
  ],
})

export default router
