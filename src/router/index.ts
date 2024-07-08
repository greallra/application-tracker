import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import DashboardView from '../views/DashboardView.vue'

import General from '../views/General.vue'
import PostApplication from '../views/PostApplication.vue'
import Breakdown from '../views/Breakdown.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'breakdown',
      component: Breakdown
    },
    {
      path: '/graph',
      name: 'graph',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: General
    },
    {
      path: '/post',
      name: 'post',
      component: PostApplication
    },
  ]
})

export default router
