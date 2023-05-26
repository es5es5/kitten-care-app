import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/opening',
      name: 'Opening',
      component: () => import('@/views/Opening.vue'),
    },
    {
      path: '/game',
      name: 'Game',
      component: () => import('@/views/Game.vue'),
    },
  ],
})

export default router
