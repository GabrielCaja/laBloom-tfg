<template>
  <Navbar />

  <!-- Breadcrumbs -->
  <div class="bg-gray-100 py-2">
    <div class="container mx-auto px-4">
      <div class="flex items-center text-sm text-gray-600">
        <router-link to="/" class="hover:text-indigo-600">Inicio</router-link>
        <span class="mx-2">/</span>
        <router-link to="/productos" class="hover:text-indigo-600"
          >Catálogo de Productos</router-link
        >
        <span class="mx-2">/</span>
        <span class="font-medium text-gray-800">{{
          producto?.nombre || 'Detalle del producto'
        }}</span>
      </div>
    </div>
  </div>

  <div class="container mx-auto px-4 py-8">
    <!-- Estado de carga -->
    <div v-if="cargando" class="flex flex-col items-center justify-center py-16">
      <div
        class="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-xl text-gray-600">Cargando producto...</p>
    </div>

    <!-- Mensaje de error -->
    <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg my-8">
      <div class="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-red-500 mr-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p class="text-red-800">{{ error }}</p>
      </div>
    </div>

    <!-- Información del producto -->
    <div v-else-if="producto" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="md:flex">
        <!-- Imagen del producto -->
        <div class="md:w-1/2 p-4">
          <div
            class="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center h-full"
          >
            <img
              :src="producto.rutaImg || 'https://via.placeholder.com/600x400?text=Sin+imagen'"
              :alt="producto.nombre"
              class="object-contain max-h-[500px] w-full"
            />
          </div>
        </div>

        <!-- Detalles del producto -->
        <div class="md:w-1/2 p-8 flex flex-col">
          <!-- Encabezado -->
          <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-1">{{ producto.nombre }}</h1>
            <div class="flex items-center gap-2 mb-4"></div>
            <div class="text-3xl font-bold text-indigo-600 mb-4">
              {{ formatPrice(producto.precio) }}
            </div>
          </div>

          <!-- Estado y disponibilidad -->
          <div class="mb-6">
            <div v-if="!producto.visible" class="flex items-center text-sm text-red-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Producto no disponible
            </div>
            <div
              v-else-if="producto.stock > 0"
              class="flex items-center text-sm text-green-600 mb-4"
            >
              <span :class="{ 'text-red-600 font-medium': producto.stock <= 10 }">
                {{
                  producto.stock > 10
                    ? 'Disponible en stock'
                    : `¡Solo quedan ${producto.stock} unidades!`
                }}
              </span>
            </div>
            <div v-else class="flex items-center text-sm text-orange-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Agotado temporalmente
            </div>
          </div>

          <!-- Descripción -->
          <div class="mb-8">
            <h3 class="text-lg font-medium text-gray-800 mb-2">Descripción</h3>
            <p class="text-gray-600">{{ producto.descripcion }}</p>
          </div>

          <!-- Cantidad y botón de añadir al carrito -->
          <div class="mt-auto">
            <div class="flex flex-col sm:flex-row items-stretch gap-4">
              <div class="flex rounded-md overflow-hidden border border-gray-300 w-32">
                <button
                  @click="cantidad > 1 ? cantidad-- : null"
                  class="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600"
                  :disabled="!producto.visible || producto.stock <= 0"
                >
                  -
                </button>
                <input
                  type="number"
                  v-model="cantidad"
                  min="1"
                  :max="producto.stock"
                  class="w-full text-center border-none focus:ring-0 focus:outline-none"
                  :disabled="!producto.visible || producto.stock <= 0"
                  @change="validarCantidad"
                />
                <button
                  @click="cantidad < producto.stock ? cantidad++ : null"
                  class="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600"
                  :disabled="cantidad >= producto.stock || !producto.visible || producto.stock <= 0"
                >
                  +
                </button>
              </div>
              <button
                @click="agregarAlCarrito"
                :disabled="!producto.visible || producto.stock <= 0"
                :class="[
                  'flex-1 px-6 py-3 rounded-md flex items-center justify-center transition-colors',
                  !producto.visible || producto.stock <= 0
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white',
                ]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {{
                  !producto.visible || producto.stock <= 0 ? 'No disponible' : 'Añadir al carrito'
                }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pestañas de información adicional -->
      <div class="border-t border-gray-200 px-8 py-6">
        <div class="flex border-b border-gray-200">
          <button
            @click="tabActiva = 'detalles'"
            :class="[
              'px-6 py-3 text-sm font-medium transition-colors',
              tabActiva === 'detalles'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            Detalles técnicos
          </button>
          <button
            @click="tabActiva = 'envio'"
            :class="[
              'px-6 py-3 text-sm font-medium transition-colors',
              tabActiva === 'envio'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            Envío y devoluciones
          </button>
          <button
            @click="tabActiva = 'valoraciones'"
            :class="[
              'px-6 py-3 text-sm font-medium transition-colors',
              tabActiva === 'valoraciones'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            Valoraciones ({{ resumenValoraciones.total_valoraciones }})
          </button>
        </div>

        <div class="py-4">
          <div v-if="tabActiva === 'detalles'" class="prose prose-indigo max-w-none">
            <ul class="list-disc pl-6 space-y-2">
              <li>Categoría: {{ producto.categoria || 'General' }}</li>
              <li>Stock disponible: {{ producto.stock }} unidades</li>
              <li>Fecha de publicación: {{ formatearFecha(producto.fecha) }}</li>
              <li>Referencia: #{{ producto.id }}</li>
            </ul>
          </div>

          <div v-if="tabActiva === 'envio'" class="prose prose-indigo max-w-none">
            <p>Enviamos nuestros productos en 24-48h laborables a través de mensajería urgente.</p>
            <p class="mt-4">Devoluciones gratuitas durante los primeros 14 días.</p>
          </div>

          <!-- Sección de Valoraciones -->
          <div v-if="tabActiva === 'valoraciones'" class="space-y-6">
            <!-- Resumen de valoraciones -->
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h3 class="text-xl font-semibold text-gray-800">Valoraciones de clientes</h3>
                <button
                  v-if="usuarioAutenticado && !yaValorado"
                  @click="mostrarFormularioValoracion = !mostrarFormularioValoracion"
                  class="mt-2 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  {{ mostrarFormularioValoracion ? 'Cancelar' : 'Escribir valoración' }}
                </button>
              </div>

              <!-- Estadísticas de valoraciones -->
              <div
                v-if="resumenValoraciones.total_valoraciones > 0"
                class="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <!-- Promedio y estrellas -->
                <div class="text-center md:text-left">
                  <div class="text-4xl font-bold text-gray-800 mb-2">
                    {{ resumenValoraciones.promedio.toFixed(1) }}
                  </div>
                  <div class="flex items-center justify-center md:justify-start mb-2">
                    <div class="flex text-yellow-400 text-xl mr-2">
                      <span v-for="i in 5" :key="i">
                        {{ i <= Math.round(resumenValoraciones.promedio) ? '★' : '☆' }}
                      </span>
                    </div>
                    <span class="text-sm text-gray-600"
                      >({{ resumenValoraciones.total_valoraciones }} valoraciones)</span
                    >
                  </div>
                </div>

                <!-- Distribución de estrellas -->
                <div class="space-y-2">
                  <div
                    v-for="estrella in [5, 4, 3, 2, 1]"
                    :key="estrella"
                    class="flex items-center text-sm"
                  >
                    <span class="w-12 text-right mr-2">{{ estrella }} ★</span>
                    <div class="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        class="bg-yellow-400 h-2 rounded-full"
                        :style="{
                          width: `${getDistribucionPorcentaje(estrella)}%`,
                        }"
                      ></div>
                    </div>
                    <span class="w-8 text-left">{{
                      resumenValoraciones.distribucion[estrella] || 0
                    }}</span>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-8">
                <p class="text-gray-500 mb-4">Este producto aún no tiene valoraciones</p>
                <p class="text-sm text-gray-400">¡Sé el primero en valorarlo!</p>
              </div>
            </div>

            <!-- Formulario para nueva valoración -->
            <div
              v-if="mostrarFormularioValoracion && usuarioAutenticado && !yaValorado"
              class="bg-white border rounded-lg p-6 shadow-sm"
            >
              <h4 class="text-lg font-medium text-gray-800 mb-4">Escribe tu valoración</h4>

              <form @submit.prevent="enviarValoracion" class="space-y-4">
                <!-- Selector de estrellas -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Puntuación *</label>
                  <div class="flex items-center space-x-1">
                    <button
                      v-for="estrella in 5"
                      :key="estrella"
                      type="button"
                      @click="nuevaValoracion.valoracion = estrella"
                      class="text-3xl transition-colors focus:outline-none hover:scale-110"
                      :class="
                        estrella <= nuevaValoracion.valoracion
                          ? 'text-yellow-400'
                          : 'text-gray-300 hover:text-yellow-200'
                      "
                    >
                      ★
                    </button>
                    <span class="ml-2 text-sm text-gray-600">
                      ({{ nuevaValoracion.valoracion }}/5)
                    </span>
                  </div>
                </div>

                <!-- Comentario -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Comentario *</label>
                  <textarea
                    v-model="nuevaValoracion.comentario"
                    placeholder="Comparte tu experiencia con este producto..."
                    rows="4"
                    maxlength="500"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    required
                  ></textarea>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ nuevaValoracion.comentario.length }}/500 caracteres
                  </p>
                </div>

                <!-- Botones -->
                <div class="flex space-x-3">
                  <button
                    type="submit"
                    :disabled="!puedeEnviarValoracion || enviandoValoracion"
                    class="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md transition-colors flex items-center"
                  >
                    <span
                      v-if="enviandoValoracion"
                      class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
                    ></span>
                    {{ enviandoValoracion ? 'Enviando...' : 'Publicar valoración' }}
                  </button>
                  <button
                    type="button"
                    @click="cancelarValoracion"
                    class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>

            <!-- Mensaje para usuarios no autenticados -->
            <div
              v-else-if="!usuarioAutenticado"
              class="bg-blue-50 border border-blue-200 rounded-lg p-4"
            >
              <p class="text-blue-800 text-center">
                <router-link to="/login" class="font-medium hover:underline">
                  Inicia sesión
                </router-link>
                para escribir una valoración
              </p>
            </div>

            <!-- Mensaje si ya valoró -->
            <div v-else-if="yaValorado" class="bg-green-50 border border-green-200 rounded-lg p-4">
              <p class="text-green-800 text-center">Ya has valorado este producto</p>
            </div>

            <!-- Lista de valoraciones -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <h4 class="text-lg font-medium text-gray-800">
                  Todas las valoraciones ({{ valoraciones.length }})
                </h4>

                <!-- Filtro por estrellas -->
                <div v-if="valoraciones.length > 0" class="flex items-center space-x-2">
                  <span class="text-sm text-gray-600">Filtrar:</span>
                  <select
                    v-model="filtroEstrella"
                    class="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="">Todas</option>
                    <option v-for="i in 5" :key="i" :value="i">{{ i }} ★</option>
                  </select>
                </div>
              </div>

              <div
                v-if="valoracionesFiltradas.length === 0 && valoraciones.length > 0"
                class="text-center py-8"
              >
                <p class="text-gray-500">No hay valoraciones con {{ filtroEstrella }} estrellas</p>
              </div>

              <div v-else-if="valoraciones.length === 0" class="text-center py-8">
                <p class="text-gray-500">No hay valoraciones para mostrar</p>
              </div>

              <div
                v-for="valoracion in valoracionesPaginadas"
                :key="valoracion.id"
                class="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <!-- Encabezado de la valoración -->
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center"
                    >
                      <span class="text-indigo-600 font-medium">
                        {{ getInicialUsuario(valoracion.user?.username) }}
                      </span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-800">
                        {{ valoracion.user?.username || 'Usuario anónimo' }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ formatearFechaValoracion(valoracion.created_at) }}
                      </p>
                    </div>
                  </div>
                  <div class="flex text-yellow-400 text-lg">
                    <span v-for="i in 5" :key="i">
                      {{ i <= valoracion.valoracion ? '★' : '☆' }}
                    </span>
                  </div>
                </div>

                <!-- Comentario -->
                <p class="text-gray-700 leading-relaxed mb-3">{{ valoracion.comentario }}</p>

                <!-- Botón para eliminar (solo si es del usuario actual) -->
                <div
                  v-if="usuarioActual?.id === valoracion.user_id"
                  class="pt-3 border-t border-gray-100"
                >
                  <button
                    @click="eliminarValoracion(valoracion.id)"
                    class="text-sm text-red-600 hover:text-red-800 transition-colors flex items-center"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                    Eliminar mi valoración
                  </button>
                </div>
              </div>

              <!-- Paginación -->
              <div v-if="totalPaginasValoraciones > 1" class="flex justify-center space-x-2 mt-6">
                <button
                  @click="paginaActualValoraciones--"
                  :disabled="paginaActualValoraciones === 1"
                  class="px-3 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  Anterior
                </button>

                <button
                  v-for="pagina in totalPaginasValoraciones"
                  :key="pagina"
                  @click="paginaActualValoraciones = pagina"
                  :class="[
                    'px-3 py-1 rounded transition-colors',
                    pagina === paginaActualValoraciones
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700',
                  ]"
                >
                  {{ pagina }}
                </button>

                <button
                  @click="paginaActualValoraciones++"
                  :disabled="paginaActualValoraciones === totalPaginasValoraciones"
                  class="px-3 py-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
/* Animaciones y efectos visuales */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

/* Estilos para las pestañas */
.prose ul {
  margin-top: 0;
  margin-bottom: 0;
}

/* Estilos para la cantidad */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import CarritoService from '@/services/CarritoService'
import { useCurrency } from '@/composables/useCurrency'

const { formatPrice } = useCurrency()

const route = useRoute()
const router = useRouter()
const toast = useToast()

// Estados existentes
const producto = ref(null)
const cargando = ref(true)
const error = ref(null)
const cantidad = ref(1)
const tabActiva = ref('detalles')
const productosRelacionados = ref([])

// Estados para valoraciones
const valoraciones = ref([])
const resumenValoraciones = ref({
  total_valoraciones: 0,
  promedio: 0,
  distribucion: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
})
const mostrarFormularioValoracion = ref(false)
const enviandoValoracion = ref(false)
const usuarioActual = ref(null)
const paginaActualValoraciones = ref(1)
const valoracionesPorPagina = 5
const filtroEstrella = ref('')

// Estado para nueva valoración
const nuevaValoracion = ref({
  valoracion: 0,
  comentario: '',
})

// Computadas existentes y nuevas para valoraciones
const usuarioAutenticado = computed(() => !!usuarioActual.value)

const yaValorado = computed(() => {
  if (!usuarioActual.value) return false
  return valoraciones.value.some((v) => v.user_id === usuarioActual.value.id)
})

const puedeEnviarValoracion = computed(() => {
  return nuevaValoracion.value.valoracion > 0 && nuevaValoracion.value.comentario.trim().length > 0
})

const valoracionesFiltradas = computed(() => {
  if (!filtroEstrella.value) return valoraciones.value
  return valoraciones.value.filter((v) => v.valoracion === parseInt(filtroEstrella.value))
})

const totalPaginasValoraciones = computed(() => {
  return Math.ceil(valoracionesFiltradas.value.length / valoracionesPorPagina)
})

const valoracionesPaginadas = computed(() => {
  const inicio = (paginaActualValoraciones.value - 1) * valoracionesPorPagina
  const fin = inicio + valoracionesPorPagina
  return valoracionesFiltradas.value.slice(inicio, fin)
})

// Métodos existentes y nuevos para valoraciones
const obtenerUsuarioActual = async () => {
  try {
    const token = localStorage.getItem('access_token')
    if (!token) return

    const response = await axios.get('http://88.198.109.171:8000/api/usuario/perfil', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    usuarioActual.value = response.data
  } catch (error) {
    console.log('Usuario no autenticado')
    usuarioActual.value = null
  }
}

const cargarValoraciones = async () => {
  if (!producto.value?.id) return

  try {
    const response = await axios.get(`http://88.198.109.171:8000/api/valoraciones`)
    // Filtrar valoraciones por producto
    valoraciones.value = response.data.filter((v) => v.producto_id === producto.value.id)

    // Cargar información de usuarios para cada valoración
    await cargarDatosUsuarios()
  } catch (error) {
    console.error('Error al cargar valoraciones:', error)
    valoraciones.value = []
  }
}

const cargarDatosUsuarios = async () => {
  try {
    const token = localStorage.getItem('access_token')
    if (!token) return

    const response = await axios.get('http://88.198.109.171:8000/api/usuario', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const usuarios = response.data

    // Agregar datos de usuario a cada valoración
    valoraciones.value = valoraciones.value.map((valoracion) => {
      const usuario = usuarios.find((u) => u.id === valoracion.user_id)
      return {
        ...valoracion,
        user: usuario || { username: 'Usuario eliminado' },
      }
    })
  } catch (error) {
    console.error('Error al cargar datos de usuarios:', error)
  }
}

const calcularResumenValoraciones = () => {
  if (valoraciones.value.length === 0) {
    resumenValoraciones.value = {
      total_valoraciones: 0,
      promedio: 0,
      distribucion: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    }
    return
  }

  const total = valoraciones.value.length
  const suma = valoraciones.value.reduce((acc, v) => acc + v.valoracion, 0)
  const promedio = suma / total

  const distribucion = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  valoraciones.value.forEach((v) => {
    distribucion[v.valoracion]++
  })

  resumenValoraciones.value = {
    total_valoraciones: total,
    promedio: promedio,
    distribucion: distribucion,
  }
}

const enviarValoracion = async () => {
  if (!puedeEnviarValoracion.value) {
    toast.warning('Por favor completa todos los campos')
    return
  }

  if (!usuarioActual.value) {
    toast.error('Debes iniciar sesión para valorar')
    return
  }

  try {
    enviandoValoracion.value = true

    const datosValoracion = {
      user_id: usuarioActual.value.id,
      producto_id: producto.value.id,
      valoracion: nuevaValoracion.value.valoracion,
      comentario: nuevaValoracion.value.comentario.trim(),
    }

    const token = localStorage.getItem('access_token')
    const response = await axios.post('http://88.198.109.171:8000/api/valoraciones', datosValoracion, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    // Agregar la nueva valoración a la lista con datos del usuario
    const nuevaValoracionCompleta = {
      ...response.data,
      user: usuarioActual.value,
    }
    valoraciones.value.unshift(nuevaValoracionCompleta)

    // Recalcular resumen
    calcularResumenValoraciones()

    // Reiniciar formulario
    nuevaValoracion.value = { valoracion: 0, comentario: '' }
    mostrarFormularioValoracion.value = false

    toast.success('Valoración enviada correctamente')
  } catch (error) {
    console.error('Error al enviar valoración:', error)

    if (error.response?.status === 422) {
      toast.error('Ya has valorado este producto anteriormente')
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Error al enviar la valoración')
    }
  } finally {
    enviandoValoracion.value = false
  }
}

const eliminarValoracion = async (valoracionId) => {
  if (!confirm('¿Estás seguro de que quieres eliminar tu valoración?')) {
    return
  }

  try {
    const token = localStorage.getItem('access_token')
    await axios.delete(`http://88.198.109.171:8000/api/valoraciones/${valoracionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    // Eliminar de la lista local
    valoraciones.value = valoraciones.value.filter((v) => v.id !== valoracionId)

    // Recalcular resumen
    calcularResumenValoraciones()

    toast.success('Valoración eliminada correctamente')
  } catch (error) {
    console.error('Error al eliminar valoración:', error)
    toast.error('Error al eliminar la valoración')
  }
}

const cancelarValoracion = () => {
  nuevaValoracion.value = { valoracion: 0, comentario: '' }
  mostrarFormularioValoracion.value = false
}

const formatearFechaValoracion = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getInicialUsuario = (username) => {
  if (!username) return 'U'
  return username.charAt(0).toUpperCase()
}

const getDistribucionPorcentaje = (estrella) => {
  if (resumenValoraciones.value.total_valoraciones === 0) return 0
  return (
    (resumenValoraciones.value.distribucion[estrella] /
      resumenValoraciones.value.total_valoraciones) *
    100
  )
}

// Obtener el producto de la API por su ID
const cargarProducto = async () => {
  const id = route.params.id

  if (!id) {
    error.value = 'ID de producto no válido'
    cargando.value = false
    return
  }

  try {
    cargando.value = true
    error.value = null

    const respuesta = await axios.get(`http://88.198.109.171:8000/api/producto/${id}/`)

    producto.value = {
      id: respuesta.data.id,
      nombre: respuesta.data.nombre,
      descripcion: respuesta.data.descripcion,
      precio: parseFloat(respuesta.data.precio),
      rutaImg: respuesta.data.rutaImg,
      fecha: new Date(respuesta.data.created_at || Date.now()),
      stock: respuesta.data.stock || 0,
      visible: respuesta.data.visible === true || respuesta.data.visible === 1,
    }

    // Cargar valoraciones después de cargar el producto
    await cargarValoraciones()
    calcularResumenValoraciones()
  } catch (err) {
    console.error('Error al cargar el producto:', err)
    error.value =
      'No pudimos cargar la información del producto. Por favor, inténtalo de nuevo más tarde.'
  } finally {
    cargando.value = false
  }
}

// Validar que la cantidad seleccionada no exceda el stock disponible
const validarCantidad = () => {
  if (!producto.value) return

  if (cantidad.value > producto.value.stock) {
    cantidad.value = producto.value.stock
    toast.info(`Solo hay ${producto.value.stock} unidades disponibles`)
  }

  if (cantidad.value < 1) {
    cantidad.value = 1
  }
}

// Formatear fecha
const formatearFecha = (fecha) => {
  if (!fecha) return 'Fecha no disponible'
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Añadir al carrito
const agregarAlCarrito = async () => {
  if (!producto.value) return

  // Verificar disponibilidad y stock antes de añadir al carrito
  if (!producto.value.visible) {
    toast.error('Este producto no está disponible actualmente.')
    return
  }

  if (producto.value.stock <= 0) {
    toast.error('Este producto está agotado.')
    return
  }

  if (cantidad.value > producto.value.stock) {
    cantidad.value = producto.value.stock
    toast.warning(`Solo hay ${producto.value.stock} unidades disponibles`)
    return
  }

  try {
    // Llamar al método con los parámetros correctos: ID y cantidad
    await CarritoService.agregarProducto(producto.value.id, cantidad.value)

    toast.success(
      `${cantidad.value} ${cantidad.value > 1 ? 'unidades' : 'unidad'} de ${producto.value.nombre} añadidas al carrito`,
    )
  } catch (error) {
    console.error('Error al añadir al carrito:', error)
    toast.error('Error al añadir el producto al carrito')
  }
}

// Watcher para resetear paginación cuando cambie el filtro
watch(filtroEstrella, () => {
  paginaActualValoraciones.value = 1
})

// Cargar datos al montar el componente
onMounted(async () => {
  await obtenerUsuarioActual()
  await cargarProducto()
})
</script>
