<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <div class="flex justify-center">
        <img src="/src/logo.png" alt="LOGO TIENDA" class="h-32" />
      </div>
      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            id="username"
            type="text"
            v-model="username"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

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
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            id="password"
            type="password"
            v-model="password"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
            >Confirmar Contraseña</label
          >
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Registrarse
          </button>
        </div>
        <h3>
          ¿Ya tienes cuenta? Inicia sesión
          <router-link to="/login" class="text-blue-500 hover:underline">aquí</router-link>
        </h3>
      </form>

      <p v-if="errorMessage" class="text-sm text-center text-red-600">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    }
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden'
        return
      }

      try {
        const response = await axios.post('api/register/', {
          username: this.username,
          email: this.email,
          password: this.password,
        })

        console.log(response.data)
        this.$router.push('/login')
      } catch (error) {
        this.errorMessage = 'Error al registrarse. Por favor, inténtelo de nuevo.'
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message
        }
      }
    },
  },
}
</script>
