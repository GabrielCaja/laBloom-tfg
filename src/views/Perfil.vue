<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Encabezado -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Mi perfil</h1>
      <p class="text-gray-600 mt-2">Administra tu información personal</p>
    </div>

    <!-- Alertas -->
    <div
      v-if="mensajeExito"
      class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md"
    >
      <div class="flex items-center">
        <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <p>{{ mensajeExito }}</p>
      </div>
    </div>

    <div
      v-if="mensajeError"
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md"
    >
      <div class="flex items-center">
        <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <p>{{ mensajeError }}</p>
      </div>
    </div>

    <!-- Formulario principal -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">Información básica</h2>
      </div>

      <form @submit.prevent="guardarCambios" class="p-6 space-y-6">
        <!-- Nombre de usuario -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1"
            >Nombre de usuario</label
          >
          <input
            type="text"
            id="username"
            v-model="usuario.username"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p v-if="errores.username" class="mt-1 text-sm text-red-600">{{ errores.username }}</p>
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1"
            >Correo electrónico</label
          >
          <input
            type="email"
            id="email"
            v-model="usuario.email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p v-if="errores.email" class="mt-1 text-sm text-red-600">{{ errores.email }}</p>
        </div>

        <!-- Newsletter -->
        <div class="flex items-center">
          <input
            type="checkbox"
            id="newsletter"
            v-model="usuario.newsletter"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="newsletter" class="ml-2 block text-sm text-gray-700">
            Suscribirme al newsletter para recibir ofertas y novedades
          </label>
        </div>
      </form>
    </div>

    <!-- Sección de cambio de contraseña -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden mt-8">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">Cambiar contraseña</h2>
      </div>

      <div class="p-6 space-y-6">
        <!-- Contraseña actual -->
        <div>
          <label for="current-password" class="block text-sm font-medium text-gray-700 mb-1"
            >Contraseña actual</label
          >
          <input
            type="password"
            id="current-password"
            v-model="passwordForm.currentPassword"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p v-if="errores.currentPassword" class="mt-1 text-sm text-red-600">
            {{ errores.currentPassword }}
          </p>
        </div>

        <!-- Nueva contraseña -->
        <div>
          <label for="new-password" class="block text-sm font-medium text-gray-700 mb-1"
            >Nueva contraseña</label
          >
          <input
            type="password"
            id="new-password"
            v-model="passwordForm.password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p class="mt-1 text-xs text-gray-500">
            La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un
            número y un carácter especial.
          </p>
          <p v-if="errores.password" class="mt-1 text-sm text-red-600">{{ errores.password }}</p>
        </div>

        <!-- Confirmar nueva contraseña -->
        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1"
            >Confirmar nueva contraseña</label
          >
          <input
            type="password"
            id="confirm-password"
            v-model="passwordForm.confirmPassword"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p v-if="errores.confirmPassword" class="mt-1 text-sm text-red-600">
            {{ errores.confirmPassword }}
          </p>
        </div>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="mt-8 flex justify-end space-x-4">
      <button
        @click="cancelar"
        type="button"
        class="px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancelar
      </button>
      <button
        @click="guardarCambios"
        type="button"
        :disabled="cargando"
        class="px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="cargando">Guardando...</span>
        <span v-else>Guardar cambios</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'

// Estado del formulario
const usuario = reactive({
  id: null,
  username: '',
  email: '',
  newsletter: false,
})

const passwordForm = reactive({
  currentPassword: '',
  password: '',
  confirmPassword: '',
})

// Estado de la interfaz
const cargando = ref(false)
const mensajeExito = ref('')
const mensajeError = ref('')
const errores = reactive({})

// Cargar datos del usuario
onMounted(async () => {
  try {
    const token = localStorage.getItem('access_token')
    if (!token) {
      mensajeError.value = 'No has iniciado sesión'
      return
    }

    cargando.value = true
    const response = await axios.get('/api/me', {
      headers: { Authorization: `Bearer ${token}` },
    })

    // Guardar datos del usuario
    usuario.id = response.data.id
    usuario.username = response.data.username
    usuario.email = response.data.email
    usuario.newsletter = response.data.newsletter || false
  } catch (error) {
    console.error('Error al cargar datos del usuario:', error)
    mensajeError.value = 'No se pudieron cargar tus datos. Por favor, intenta más tarde.'
  } finally {
    cargando.value = false
  }
})

// Guardar cambios
const guardarCambios = async () => {
  // Limpiar mensajes y errores previos
  errores = {}
  mensajeExito.value = ''
  mensajeError.value = ''

  try {
    cargando.value = true

    // Validación básica
    if (!usuario.username) {
      errores.username = 'El nombre de usuario es obligatorio'
      throw new Error('Validación fallida')
    }

    if (!usuario.email) {
      errores.email = 'El correo electrónico es obligatorio'
      throw new Error('Validación fallida')
    }

    // Validar formato de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email)) {
      errores.email = 'Por favor, introduce un correo electrónico válido'
      throw new Error('Validación fallida')
    }

    // Si hay datos de contraseña, validamos
    if (passwordForm.password || passwordForm.confirmPassword || passwordForm.currentPassword) {
      if (!passwordForm.currentPassword) {
        errores.currentPassword = 'Debes introducir tu contraseña actual para cambiarla'
        throw new Error('Validación fallida')
      }

      if (passwordForm.password !== passwordForm.confirmPassword) {
        errores.confirmPassword = 'Las contraseñas no coinciden'
        throw new Error('Validación fallida')
      }

      // Validar complejidad de contraseña
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      if (passwordForm.password && !passwordRegex.test(passwordForm.password)) {
        errores.password = 'La contraseña no cumple con los requisitos de seguridad'
        throw new Error('Validación fallida')
      }
    }

    const token = localStorage.getItem('access_token')
    const datosActualizados = { ...usuario }

    // Si hay nueva contraseña, la incluimos
    if (passwordForm.password) {
      datosActualizados.password = passwordForm.password
    }

    // Actualizar datos del usuario
    await axios.put(`/api/usuario/${usuario.id}`, datosActualizados, {
      headers: { Authorization: `Bearer ${token}` },
    })

    // Mostrar mensaje de éxito
    mensajeExito.value = 'Tus datos se han actualizado correctamente'

    // Limpiar formulario de contraseña
    passwordForm.currentPassword = ''
    passwordForm.password = ''
    passwordForm.confirmPassword = ''
  } catch (error) {
    if (error.message !== 'Validación fallida') {
      console.error('Error al actualizar datos:', error)

      if (error.response && error.response.data && error.response.data.errors) {
        // Mapear errores del servidor
        Object.keys(error.response.data.errors).forEach((key) => {
          errores[key] = error.response.data.errors[key][0]
        })
      } else {
        mensajeError.value = 'No se pudieron actualizar tus datos. Por favor, intenta más tarde.'
      }
    }
  } finally {
    cargando.value = false

    // Scroll a la parte superior si hay errores
    if (Object.keys(errores).length > 0 || mensajeError.value) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}

// Cancelar cambios
const cancelar = async () => {
  try {
    // Recargar datos del usuario
    const token = localStorage.getItem('access_token')
    const response = await axios.get('/api/me', {
      headers: { Authorization: `Bearer ${token}` },
    })

    // Restaurar valores originales
    usuario.username = response.data.username
    usuario.email = response.data.email
    usuario.newsletter = response.data.newsletter || false

    // Limpiar formulario de contraseña
    passwordForm.currentPassword = ''
    passwordForm.password = ''
    passwordForm.confirmPassword = ''

    // Limpiar errores y mensajes
    Object.keys(errores).forEach((key) => delete errores[key])
    mensajeExito.value = ''
    mensajeError.value = ''
  } catch (error) {
    console.error('Error al cancelar cambios:', error)
  }
}
</script>
