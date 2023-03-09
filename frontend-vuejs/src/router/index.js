import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Users',
    component: () => import('../components/LoginComp.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/showusers',
    name: 'showusers',
    component: () => import('../components/ShowUsers.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../components/AllUsers.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../components/AddUser.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
