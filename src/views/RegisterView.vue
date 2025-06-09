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
        <span class="font-medium text-gray-900">Registro</span>
      </div>
    </div>
  </div>

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
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            required
            class="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Checkbox de aceptación de términos -->
        <div class="mt-6">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="aceptarTerminos"
                v-model="aceptarTerminos"
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                :class="{ 'border-red-500': !aceptarTerminos && mostrarErrorTerminos }"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="aceptarTerminos" class="text-gray-600">
                Acepto los
                <router-link
                  to="/condiciones-de-uso"
                  class="text-blue-600 hover:underline"
                  target="_blank"
                >
                  términos y condiciones de uso </router-link
                >, las
                <router-link
                  to="/condiciones-venta"
                  class="text-blue-600 hover:underline"
                  target="_blank"
                >
                  condiciones de venta
                </router-link>
                y la
                <router-link
                  to="/privacy-policy"
                  class="text-blue-600 hover:underline"
                  target="_blank"
                >
                  política de privacidad
                </router-link>
                de LaBloom.
              </label>
            </div>
          </div>
          <p v-if="!aceptarTerminos && mostrarErrorTerminos" class="text-red-500 text-xs mt-2 ml-7">
            Debes aceptar los términos y condiciones para registrarte.
          </p>
        </div>

        <!-- Checkbox opcional para newsletter -->
        <div class="mt-4">
          <div class="flex items-center">
            <input
              id="newsletter"
              v-model="newsletter"
              type="checkbox"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label for="newsletter" class="ml-3 text-sm text-gray-600">
              Quiero recibir ofertas y novedades por email (opcional)
            </label>
          </div>
        </div>

        <div class="pt-4">
          <button
            type="submit"
            class="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Registrarse
          </button>
        </div>

        <div class="text-center mt-4">
          <p class="text-sm text-gray-600">
            ¿Ya tienes cuenta? Inicia sesión
            <router-link to="/login" class="text-blue-500 hover:underline">aquí</router-link>
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
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      aceptarTerminos: false,
      newsletter: false,
      mostrarErrorTerminos: false,
      errorMessage: '',
    }
  },
  methods: {
    async register() {
      // Reset error states
      this.mostrarErrorTerminos = false
      this.errorMessage = ''

      // Validar contraseñas
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden'
        return
      }

      // Validar aceptación de términos
      if (!this.aceptarTerminos) {
        this.mostrarErrorTerminos = true
        this.errorMessage = 'Debes aceptar los términos y condiciones para registrarte'
        return
      }

      try {
        const response = await axios.post('api/register/', {
          username: this.username,
          email: this.email,
          password: this.password,
          newsletter: this.newsletter,
        })

        console.log(response.data)

        // Mostrar mensaje de éxito y redirigir
        this.errorMessage = ''
        alert('¡Registro exitoso! Ahora puedes iniciar sesión.')
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

<style scoped>
/* Estilos adicionales si necesitas personalizar algo */
</style>
