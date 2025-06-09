<template>
  <Navbar />
  <!-- Breadcumbs -->
  <div class="bg-gray-50 border-b border-gray-200">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center text-sm text-gray-500">
        <router-link to="/" class="hover:text-indigo-600 transition-colors">
          <span class="flex items-center"> Inicio </span>
        </router-link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 mx-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="font-medium text-gray-900">Login</span>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <div class="flex justify-center">
        <img src="/src/logo.png" alt="LOGO TIENDA" class="h-32" />
      </div>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </div>
        <div class="text-center mt-4">
          <p class="text-sm text-gray-600">
            ¿No tienes cuenta? Regístrate
            <router-link to="/register" class="text-blue-500 hover:underline">aquí</router-link>
          </p>
        </div>
      </form>

      <p v-if="errorMessage" class="text-sm text-center text-red-600">{{ errorMessage }}</p>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios'

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login/', {
          email: this.email,
          password: this.password,
        })
        console.log(response.data)

        //Guardar el token (sin importar si es admin o no)
        localStorage.setItem('access_token', response.data.access_token)

        //Opcionalmente, guardar también el rol del usuario
        localStorage.setItem('es_admin', response.data.es_admin)

        //Emitir evento de éxito
        this.$emit('loginSuccess', response.data)

        //Redirigir al usuario
        this.$router.push('/')
      } catch (error) {
        console.error('Error en login:', error)
        this.errorMessage = 'Credenciales inválidas'
      }
    },
  },
}
</script>
