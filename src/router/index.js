import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
        auth: true
      }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignupView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
        auth: false
    }
  },
  {
    path: '/product_detail/:product_id',
    name: 'product',
    component: () => import('@/views/ProductDetailView.vue'),
    meta: {
        auth: true
    }
  },
  {
    path: '/:NotFound(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
        auth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    const requireAuth = to.meta.auth

    if (requireAuth && store.getters['auth/isAuthenticated']) {
      next()
    } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
      next('/login?message=auth')
    } else {
      next()
    }
  })

export default router
