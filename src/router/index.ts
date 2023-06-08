import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/Layout.vue'),
      redirect: () => {
        return { name: 'Game' }
      },
      children: [
        {
          path: 'game',
          name: 'Game',
          component: () => import('@/views/game/Game.vue'),
        },
      ],
    },
  ],
})

export default router
