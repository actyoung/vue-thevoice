import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/video/:id',
      name: 'video',
      component: () => import('../views/VideoView.vue')
    },
    {
      path: '/rating/:id',
      name: 'rating',
      component: () => import('../views/RatingView.vue')
    }
  ]
})

export default router
