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
  },
  {
    path: '/chat',
    component: ChatPage,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach((to, from, next) => {
  if (to.path === '/chat' && !store.state.connected) {
    next('/login')
  } else if (to.path === '/login' && store.state.connected) {
    next('/chat')
  } else {
    next()
  }
})

export default router
