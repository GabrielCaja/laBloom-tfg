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
  ],
})

export default router
