<template>
  <Navbar />
  <!-- Breadcrumbs con diseño mejorado -->
  <div class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center text-sm text-gray-500">
        <router-link to="/" class="hover:text-indigo-600 transition-colors duration-300">
          <span class="flex items-center"> Inicio </span>
        </router-link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 mx-2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="font-medium text-indigo-800">Perfil</span>
      </div>
    </div>
  </div>

  <div class="bg-gray-50 min-h-screen py-10">
    <div class="container mx-auto px-4">
      <p class="text-gray-600 mt-1">Administra tu información personal</p>

      <!-- Tarjeta de perfil -->
      <div class="max-w-2xl mx-auto">
        <!-- Mensaje de notificación con animación -->
        <transition
          enter-active-class="transform transition duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transform transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
        >
          <div
            v-if="mensaje"
            :class="[
              'p-4 mb-6 rounded-lg shadow-sm border-l-4 flex items-start',
              mensajeExito
                ? 'bg-green-50 text-green-700 border-green-500'
                : 'bg-red-50 text-red-700 border-red-500',
            ]"
          >
            <div class="mr-3 flex-shrink-0">
              <svg v-if="mensajeExito" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg v-else class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            {{ mensaje }}
          </div>
        </transition>

        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <!-- Encabezado del formulario -->
          <div
            class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100"
          >
            <h2 class="text-lg font-medium text-gray-800">Información personal</h2>
            <p class="text-sm text-gray-500">Actualiza tus datos y preferencias</p>
          </div>

          <!-- Formulario -->
          <form class="p-6 space-y-6" @submit.prevent="actualizarPerfil">
            <!-- Nombre de usuario -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="username">
                Nombre de usuario
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  class="w-full pl-10 border border-gray-300 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  v-model="usuario.username"
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="email">
                Email
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  class="w-full pl-10 border border-gray-300 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  v-model="usuario.email"
                />
              </div>
            </div>
            <!-- Confirmar email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="confirmarEmail">
                Confirmar nuevo email
              </label>
              <div class="relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="confirmarEmail"
                  type="email"
                  class="w-full pl-10 border border-gray-300 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  v-model="confirmarEmail"
                  :class="{
                    'border-red-500 focus:ring-red-500 focus:border-red-500':
                      emailNoCoinciden && confirmarEmail,
                  }"
                />
              </div>
              <p v-if="emailNoCoinciden && confirmarEmail" class="mt-1 text-sm text-red-600">
                Los correos electrónicos no coinciden
              </p>
            </div>

            <!-- Grupo de contraseñas -->
            <div class="border border-gray-100 rounded-lg p-5 bg-gray-50">
              <h3 class="text-md font-medium text-gray-700 mb-4">Cambiar contraseña</h3>

              <!-- Nueva contraseña -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1" for="password">
                  Nueva contraseña
                  <span class="text-xs text-gray-500"
                    >(dejar en blanco si no deseas cambiarla)</span
                  >
                </label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    class="w-full pl-10 border border-gray-300 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    v-model="usuario.password"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <!-- Confirmar contraseña -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="confirm-password">
                  Confirmar nueva contraseña
                </label>
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="confirm-password"
                    type="password"
                    class="w-full pl-10 border border-gray-300 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    v-model="confirmarPassword"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <!-- Preferencias -->
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-md font-medium text-gray-700 mb-4">Preferencias</h3>

              <div class="flex items-center">
                <div class="bg-gray-200 rounded-full p-0.5 mr-3">
                  <input
                    id="newsletter"
                    type="checkbox"
                    v-model="usuario.newsletter"
                    class="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out rounded-full focus:ring-blue-500"
                  />
                </div>
                <label for="newsletter" class="text-sm text-gray-700">
                  Suscribirme al newsletter
                  <span class="block text-xs text-gray-500"
                    >Recibirás las últimas novedades y ofertas</span
                  >
                </label>
              </div>
            </div>

            <div class="flex justify-end pt-6 border-t border-gray-100">
              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Guardar cambios
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const usuario = ref({
  id: null,
  username: '',
  email: '',
  password: '',
  newsletter: false,
})

const confirmarPassword = ref('')
const confirmarEmail = ref('') // Nuevo ref para confirmar email
const mensaje = ref('')
const mensajeExito = ref(false)

// Computed property para verificar si los emails coinciden
const emailNoCoinciden = computed(
  () => confirmarEmail.value && usuario.value.email !== confirmarEmail.value,
)

onMounted(() => {
  cargarPerfil()
})

const cargarPerfil = async () => {
  try {
    const token = localStorage.getItem('access_token')
    const response = await axios.get('/api/usuario/perfil', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    //Asignamos los datos recibidos al perfil, excepto password
    usuario.value = {
      ...response.data,
      password: '',
    }

    //También actualizamos el confirmarEmail con el email actual
    confirmarEmail.value = response.data.email
  } catch (error) {
    console.error('Error al cargar perfil:', error)
    mensaje.value = 'No se pudo cargar la información del perfil'
    mensajeExito.value = false
  }
}

const actualizarPerfil = async () => {
  try {
    //Validación del email
    if (emailNoCoinciden.value) {
      mensaje.value = 'Los correos electrónicos no coinciden'
      mensajeExito.value = false
      return
    }

    //Validación de las contraseñas
    if (usuario.value.password && usuario.value.password !== confirmarPassword.value) {
      mensaje.value = 'Las contraseñas no coinciden'
      mensajeExito.value = false
      return
    }

    const token = localStorage.getItem('access_token')
    const datosActualizados = { ...usuario.value }

    //Si no hay contraseña, la eliminamos para no enviarla vacía
    if (!datosActualizados.password) {
      delete datosActualizados.password
    }

    await axios.put('/api/usuario/perfil', datosActualizados, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    mensaje.value = 'Perfil actualizado con éxito'
    mensajeExito.value = true

    //Limpiar campos de contraseña
    usuario.value.password = ''
    confirmarPassword.value = ''
  } catch (error) {
    console.error('Error al actualizar perfil:', error)
    mensaje.value = 'Error al actualizar el perfil'
    mensajeExito.value = false
  }
}
</script>
