import { createRouter, createWebHistory } from 'vue-router'
import ChatPage from '@/pages/ChatPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      if (store.state.connected) {
        next('/chat')
      } else {
        next()
      }
    },
  },
  {
    path: '/chat',
    component: ChatPage,
    beforeEnter: (to, from, next) => {
      if (!store.state.connected) {
        next('/')
      } else {
        next()
      }
    },
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
