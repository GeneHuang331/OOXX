import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login.vue'
import gameView from '@/views/gameView.vue'
const router = createRouter({
  history: createWebHistory('/OOXX/'),
  routes: [
    {
      path: '/:id',
      redirect: (to) => {
        // the function receives the target route as the argument
        // a relative location doesn't start with `/`
        // or { path: 'profile'}
        return '/'
      }
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/start',
      name: 'gameView',
      component: gameView
    }
  ]
})

export default router
