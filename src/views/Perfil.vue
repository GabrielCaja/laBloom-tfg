<template>
  <Navbar />
  <!-- Breadcrumbs -->
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
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
      <p class="text-gray-600 mt-1">Administra tu información personal y pedidos</p>

      <!-- Navegación por pestañas -->
      <div class="max-w-6xl mx-auto mt-8">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="tabActiva = 'perfil'"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                tabActiva === 'perfil'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              Información Personal
            </button>
            <button
              @click="tabActiva = 'pedidos'"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                tabActiva === 'pedidos'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              Mis Pedidos
            </button>
          </nav>
        </div>

        <!-- Contenido de las pestañas -->
        <div class="mt-8">
          <!-- Pestaña de Información Personal -->
          <div v-if="tabActiva === 'perfil'">
            <!-- Mensaje de notificación -->
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

            <!-- Formulario de perfil -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div
                class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100"
              >
                <h2 class="text-lg font-medium text-gray-800">Información personal</h2>
                <p class="text-sm text-gray-500">Actualiza tus datos y preferencias</p>
              </div>

              <!-- Formulario -->
              <form class="p-6 space-y-6" @submit.prevent="actualizarPerfil">
                <!-- Nombre de usuario -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="relative">
                    <label class="block text-sm font-medium text-gray-700 mb-2" for="username">
                      Nombre de usuario
                    </label>
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <input
                        id="username"
                        v-model="usuario.username"
                        type="text"
                        required
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                        placeholder="Tu nombre de usuario"
                      />
                    </div>
                  </div>
                </div>

                <!-- Email -->
                <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div class="relative">
                    <label class="block text-sm font-medium text-gray-700 mb-2" for="email">
                      Correo electrónico
                    </label>
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </div>
                      <input
                        id="email"
                        v-model="usuario.email"
                        type="email"
                        required
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <!-- Confirmar email -->
                  <div class="relative">
                    <label
                      class="block text-sm font-medium text-gray-700 mb-2"
                      for="confirmarEmail"
                    >
                      Confirmar correo electrónico
                    </label>
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <input
                        id="confirmarEmail"
                        v-model="confirmarEmail"
                        type="email"
                        required
                        :class="[
                          'block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors duration-300',
                          emailNoCoinciden
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
                        ]"
                        placeholder="Confirma tu email"
                      />
                    </div>
                    <p v-if="emailNoCoinciden" class="mt-1 text-sm text-red-600">
                      Los correos electrónicos no coinciden
                    </p>
                  </div>
                </div>

                <!-- Contraseña -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="relative">
                    <label class="block text-sm font-medium text-gray-700 mb-2" for="password">
                      Nueva contraseña (opcional)
                    </label>
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <input
                        id="password"
                        v-model="usuario.password"
                        type="password"
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                        placeholder="Deja vacío para mantener actual"
                      />
                    </div>
                  </div>

                  <!-- Confirmar contraseña -->
                  <div class="relative" v-if="usuario.password">
                    <label
                      class="block text-sm font-medium text-gray-700 mb-2"
                      for="confirmarPassword"
                    >
                      Confirmar nueva contraseña
                    </label>
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                      >
                        <svg
                          class="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <input
                        id="confirmarPassword"
                        v-model="confirmarPassword"
                        type="password"
                        required
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                        placeholder="Confirma tu nueva contraseña"
                      />
                    </div>
                  </div>
                </div>

                <!-- Newsletter -->
                <div class="relative">
                  <div class="flex items-center">
                    <input
                      id="newsletter"
                      v-model="usuario.newsletter"
                      type="checkbox"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-300"
                    />
                    <label for="newsletter" class="ml-3 block text-sm text-gray-700">
                      Quiero recibir newsletters y ofertas especiales
                    </label>
                  </div>
                </div>

                <!-- Botón de envío -->
                <div class="flex justify-end pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <div class="flex items-center">
                      <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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

          <!-- Pestaña de Pedidos -->
          <div v-else-if="tabActiva === 'pedidos'">
            <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div
                class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100"
              >
                <h2 class="text-lg font-medium text-gray-800">Historial de Pedidos</h2>
                <p class="text-sm text-gray-500">Consulta el estado de tus pedidos realizados</p>
              </div>

              <div class="p-6">
                <!-- Estado de carga -->
                <div v-if="cargandoPedidos" class="flex justify-center py-12">
                  <div
                    class="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"
                  ></div>
                </div>

                <!-- Error -->
                <div v-else-if="errorPedidos" class="text-center py-8">
                  <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-12 w-12 mx-auto text-red-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p class="text-red-600">{{ errorPedidos }}</p>
                  </div>
                </div>

                <!-- Sin pedidos -->
                <div v-else-if="pedidos.length === 0" class="text-center py-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-16 w-16 mx-auto text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 mb-2">No tienes pedidos</h3>
                  <p class="text-gray-500 mb-4">
                    Aún no has realizado ningún pedido en nuestra tienda
                  </p>
                  <router-link
                    to="/productos"
                    class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Explorar productos
                  </router-link>
                </div>

                <!-- Lista de pedidos -->
                <div v-else class="space-y-6">
                  <div
                    v-for="pedido in pedidos"
                    :key="pedido.id"
                    class="border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <!-- Cabecera del pedido -->
                    <div
                      class="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div
                        class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
                      >
                        <div>
                          <p class="text-sm font-medium text-gray-900">Pedido #{{ pedido.id }}</p>
                          <p class="text-sm text-gray-500">
                            {{ formatearFecha(pedido.fecha_pedido) }}
                          </p>
                        </div>
                        <div
                          :class="[
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            obtenerClaseEstado(pedido.estado),
                          ]"
                        >
                          {{ obtenerTextoEstado(pedido.estado) }}
                        </div>
                      </div>
                      <div class="mt-2 sm:mt-0">
                        <p class="text-lg font-semibold text-gray-900">
                          {{ formatPrice(pedido.total) }}€
                        </p>
                      </div>
                    </div>

                    <!-- Detalles del pedido -->
                    <div class="px-6 py-4">
                      <div class="space-y-3">
                        <div
                          v-for="item in pedido.productos"
                          :key="item.id"
                          class="flex items-center space-x-4"
                        >
                          <img
                            :src="item.rutaImg || 'https://via.placeholder.com/64'"
                            :alt="item.nombre"
                            class="w-16 h-16 object-cover rounded-lg"
                          />
                          <div class="flex-1">
                            <p class="font-medium text-gray-900">{{ item.nombre }}</p>
                            <p class="text-sm text-gray-500">Cantidad: {{ item.cantidad }}</p>
                          </div>
                          <div class="text-right">
                            <p class="font-medium text-gray-900">
                              {{ formatPrice(item.precio * item.cantidad) }}€
                            </p>
                          </div>
                        </div>
                      </div>

                      <!-- Información adicional -->
                      <div v-if="pedido.direccion_envio" class="mt-4 pt-4 border-t border-gray-200">
                        <h4 class="text-sm font-medium text-gray-900 mb-2">Dirección de envío</h4>
                        <p class="text-sm text-gray-600">{{ pedido.direccion_envio }}</p>
                      </div>

                      <!-- Desglose de precios -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

// Variables existentes
const usuario = ref({
  id: null,
  username: '',
  email: '',
  password: '',
  newsletter: false,
})

const confirmarPassword = ref('')
const confirmarEmail = ref('')
const mensaje = ref('')
const mensajeExito = ref(false)

// Nuevas variables para pedidos
const tabActiva = ref('perfil')
const pedidos = ref([])
const cargandoPedidos = ref(false)
const errorPedidos = ref(null)

// Computed existente
const emailNoCoinciden = computed(
  () => confirmarEmail.value && usuario.value.email !== confirmarEmail.value,
)

onMounted(() => {
  cargarPerfil()
  cargarPedidos()
})

// Funciones existentes
const cargarPerfil = async () => {
  try {
    const token = localStorage.getItem('access_token')
    const response = await axios.get('/api/usuario/perfil', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    usuario.value = {
      ...response.data,
      password: '',
    }

    confirmarEmail.value = response.data.email
  } catch (error) {
    console.error('Error al cargar perfil:', error)
    mensaje.value = 'No se pudo cargar la información del perfil'
    mensajeExito.value = false
  }
}

const actualizarPerfil = async () => {
  try {
    if (emailNoCoinciden.value) {
      mensaje.value = 'Los correos electrónicos no coinciden'
      mensajeExito.value = false
      return
    }

    if (usuario.value.password && usuario.value.password !== confirmarPassword.value) {
      mensaje.value = 'Las contraseñas no coinciden'
      mensajeExito.value = false
      return
    }

    const token = localStorage.getItem('access_token')
    const datosActualizados = { ...usuario.value }

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

    usuario.value.password = ''
    confirmarPassword.value = ''
  } catch (error) {
    console.error('Error al actualizar perfil:', error)
    mensaje.value = 'Error al actualizar el perfil'
    mensajeExito.value = false
  }
}

// Pedidos
const cargarPedidos = async () => {
  try {
    cargandoPedidos.value = true
    errorPedidos.value = null

    const token = localStorage.getItem('access_token')
    const response = await axios.get('/api/pedidos/mis-pedidos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    pedidos.value = response.data
  } catch (error) {
    console.error('Error al cargar pedidos:', error)
    errorPedidos.value = 'No se pudieron cargar los pedidos'
  } finally {
    cargandoPedidos.value = false
  }
}

const formatearFecha = (fechaStr) => {
  if (!fechaStr) return 'Fecha no disponible'

  const fecha = new Date(fechaStr)
  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatPrice = (price) => {
  return parseFloat(price || 0).toFixed(2)
}

const obtenerClaseEstado = (estado) => {
  const clases = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    procesando: 'bg-blue-100 text-blue-800',
    enviado: 'bg-indigo-100 text-indigo-800',
    entregado: 'bg-green-100 text-green-800',
    completado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800',
  }
  return clases[estado] || 'bg-gray-100 text-gray-800'
}

const obtenerTextoEstado = (estado) => {
  const textos = {
    pendiente: 'Pendiente',
    procesando: 'Procesando',
    enviado: 'Enviado',
    entregado: 'Entregado',
    completado: 'Completado',
    cancelado: 'Cancelado',
  }
  return textos[estado] || 'Desconocido'
}
</script>
