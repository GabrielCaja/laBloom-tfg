import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/Perfil.vue'),
    },
    {
      path: '/preguntas-frecuentes',
      name: 'preguntas-frecuentes',
      component: () => import('../views/PreguntasVIew.vue'),
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: () => import('../views/ContactoView.vue'),
    },
    {
      path: '/sobre-nosotros',
      name: 'sobre-nosotros',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: () => import('../views/CarritoView.vue'),
    },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/ProductosView.vue'),
    },
    {
      path: '/producto/:id',
      name: 'ProductoInfo',
      component: () => import('../views/ProductoInfo.vue'),
    },
    {
      path: '/pagos',
      name: 'pagos',
      component: () => import('../views/PagosView.vue'),
    },
    {
      path: '/blog/:id',
      name: 'ArticuloInfo',
      component: () => import('../views/ArticulosInfo.vue'),
    },
  ],
})

export default router
