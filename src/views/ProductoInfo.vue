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
            Valoraciones ({{ valoraciones.length }})
          </button>
        </div>

        <div class="py-4">
          <!-- Contenido existente de detalles y envío -->
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

          <!-- Nueva sección de valoraciones -->
          <div v-if="tabActiva === 'valoraciones'" class="space-y-6">
            <!-- Resumen de valoraciones -->
            <div class="bg-gray-50 p-6 rounded-lg">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-medium text-gray-900">Valoraciones de clientes</h3>
                <div class="flex items-center">
                  <div class="flex text-yellow-400 mr-2">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      class="w-5 h-5"
                      :class="i <= promedioValoraciones ? 'text-yellow-400' : 'text-gray-300'"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                  <span class="text-sm text-gray-600">
                    {{ promedioValoraciones.toFixed(1) }} de 5 ({{ valoraciones.length }}
                    valoraciones)
                  </span>
                </div>
              </div>
            </div>

            <!-- Formulario para nueva valoración -->
            <div v-if="usuarioLogueado" class="bg-white border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4">Escribe tu valoración</h4>
              <form @submit.prevent="enviarValoracion">
                <!-- Sistema de estrellas para valorar -->
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Puntuación</label>
                  <div class="flex items-center space-x-1">
                    <button
                      v-for="i in 5"
                      :key="i"
                      type="button"
                      @click="nuevaValoracion.puntuacion = i"
                      @mouseover="hoverEstrella = i"
                      @mouseleave="hoverEstrella = 0"
                      class="focus:outline-none"
                    >
                      <svg
                        class="w-8 h-8 transition-colors"
                        :class="
                          i <= (hoverEstrella || nuevaValoracion.puntuacion)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Comentario -->
                <div class="mb-4">
                  <label for="comentario" class="block text-sm font-medium text-gray-700 mb-2">
                    Comentario
                  </label>
                  <textarea
                    id="comentario"
                    v-model="nuevaValoracion.comentario"
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Comparte tu experiencia con este producto..."
                    required
                  ></textarea>
                </div>

                <!-- Botón enviar -->
                <button
                  type="submit"
                  :disabled="enviandoValoracion || nuevaValoracion.puntuacion === 0"
                  class="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md transition-colors flex items-center"
                >
                  <svg
                    v-if="enviandoValoracion"
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {{ enviandoValoracion ? 'Enviando...' : 'Publicar valoración' }}
                </button>
              </form>
            </div>

            <!-- Mensaje para usuarios no logueados -->
            <div v-else class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="text-blue-800">
                  <router-link to="/login" class="font-medium underline">Inicia sesión</router-link>
                  para escribir una valoración
                </span>
              </div>
            </div>

            <!-- Lista de valoraciones -->
            <div class="space-y-4">
              <div v-if="valoraciones.length === 0" class="text-center py-8 text-gray-500">
                <svg
                  class="w-16 h-16 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p>Aún no hay valoraciones para este producto.</p>
                <p class="text-sm">¡Sé el primero en valorarlo!</p>
              </div>

              <div
                v-for="valoracion in valoraciones"
                :key="valoracion.id"
                class="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center">
                    <div class="flex text-yellow-400 mr-3">
                      <svg
                        v-for="i in 5"
                        :key="i"
                        class="w-4 h-4"
                        :class="i <= valoracion.puntuacion ? 'text-yellow-400' : 'text-gray-300'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </div>
                    <span class="font-medium text-gray-900">{{ valoracion.usuario }}</span>
                  </div>
                  <span class="text-sm text-gray-500">{{ formatearFecha(valoracion.fecha) }}</span>
                </div>
                <p class="text-gray-700">{{ valoracion.comentario }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Card from '@/components/Card.vue'
import CarritoService from '@/services/CarritoService'
import { useCurrency } from '@/composables/useCurrency'

const { formatPrice } = useCurrency()

const route = useRoute()
const router = useRouter()
const toast = useToast()

//Estados existentes
const producto = ref(null)
const cargando = ref(true)
const error = ref(null)
const cantidad = ref(1)
const tabActiva = ref('detalles')
const productosRelacionados = ref([])

// Nuevos estados para valoraciones
const valoraciones = ref([])
const nuevaValoracion = ref({
  puntuacion: 0,
  comentario: '',
})
const hoverEstrella = ref(0)
const enviandoValoracion = ref(false)
const cargandoValoraciones = ref(false)

// Computed para verificar si el usuario está logueado
const usuarioLogueado = computed(() => {
  return !!localStorage.getItem('access_token')
})

// Computed para calcular el promedio de valoraciones
const promedioValoraciones = computed(() => {
  if (valoraciones.value.length === 0) return 0
  const suma = valoraciones.value.reduce((acc, val) => acc + val.puntuacion, 0)
  return suma / valoraciones.value.length
})

/// Función para cargar valoraciones
const cargarValoraciones = async () => {
  if (!producto.value?.id) return

  try {
    cargandoValoraciones.value = true
    const respuesta = await axios.get(`http://localhost:8000/api/valoraciones`)

    // Filtrar valoraciones por producto_id
    const valoracionesProducto = respuesta.data.filter(
      (val) => val.producto_id === producto.value.id,
    )

    valoraciones.value = valoracionesProducto.map((val) => ({
      id: val.id,
      puntuacion: val.valoracion,
      comentario: val.comentario,
      usuario: val.usuario?.username || 'Usuario anónimo',
      fecha: val.created_at,
    }))
  } catch (err) {
    console.error('Error al cargar valoraciones:', err)
  } finally {
    cargandoValoraciones.value = false
  }
}

// Función para enviar nueva valoración
const enviarValoracion = async () => {
  if (!usuarioLogueado.value) {
    toast.warning('Necesitas iniciar sesión para valorar este producto')
    router.push('/login')
    return
  }

  if (nuevaValoracion.value.puntuacion === 0) {
    toast.error('Por favor, selecciona una puntuación')
    return
  }

  if (!nuevaValoracion.value.comentario.trim()) {
    toast.error('Por favor, escribe un comentario')
    return
  }

  try {
    enviandoValoracion.value = true

    const token = localStorage.getItem('access_token')
    await axios.post(
      `http://localhost:8000/api/producto/${producto.value.id}/valoraciones/`,
      {
        puntuacion: nuevaValoracion.value.puntuacion,
        comentario: nuevaValoracion.value.comentario.trim(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    toast.success('¡Valoración publicada correctamente!')

    // Resetear formulario
    nuevaValoracion.value = {
      puntuacion: 0,
      comentario: '',
    }

    // Recargar valoraciones
    await cargarValoraciones()
  } catch (err) {
    console.error('Error al enviar valoración:', err)
    if (err.response?.status === 400) {
      toast.error('Ya has valorado este producto anteriormente')
    } else {
      toast.error('Error al publicar la valoración. Inténtalo de nuevo.')
    }
  } finally {
    enviandoValoracion.value = false
  }
}

// Función existente actualizada para cargar también valoraciones
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

    const respuesta = await axios.get(`http://localhost:8000/api/producto/${id}/`)

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
  } catch (err) {
    console.error('Error al cargar el producto:', err)
    error.value =
      'No pudimos cargar la información del producto. Por favor, inténtalo de nuevo más tarde.'
  } finally {
    cargando.value = false
  }
}

// Resto de funciones existentes...
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

const formatearFecha = (fecha) => {
  if (!fecha) return 'Fecha no disponible'
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const agregarAlCarrito = async () => {
  if (!producto.value) return

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
    await CarritoService.agregarProducto(producto.value.id, cantidad.value)

    toast.success(
      `${cantidad.value} ${cantidad.value > 1 ? 'unidades' : 'unidad'} de ${producto.value.nombre} añadidas al carrito`,
    )
  } catch (error) {
    console.error('Error al añadir al carrito:', error)
    toast.error('Error al añadir el producto al carrito')
  }
}

onMounted(() => {
  cargarProducto()
})
</script>

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
