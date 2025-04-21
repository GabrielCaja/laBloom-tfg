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
            <div class="flex items-center gap-2 mb-4">
              <span class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {{ producto.categoria || 'General' }}
              </span>
            </div>
            <div class="text-3xl font-bold text-indigo-600 mb-4">
              {{ producto.precio.toFixed(2) }}€
            </div>
          </div>

          <!-- Estado y disponibilidad -->
          <div class="mb-6">
            <div class="flex items-center text-sm text-green-600 mb-4">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Disponible en stock
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
                >
                  -
                </button>
                <input
                  type="number"
                  v-model="cantidad"
                  min="1"
                  class="w-full text-center border-none focus:ring-0 focus:outline-none"
                />
                <button
                  @click="cantidad++"
                  class="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600"
                >
                  +
                </button>
              </div>
              <button
                @click="agregarAlCarrito"
                class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md flex items-center justify-center transition-colors"
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
                Añadir al carrito
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
        </div>

        <div class="py-4">
          <div v-if="tabActiva === 'detalles'" class="prose prose-indigo max-w-none">
            <ul class="list-disc pl-6 space-y-2">
              <li>Categoría: {{ producto.categoria || 'General' }}</li>
              <li>Fecha de publicación: {{ formatearFecha(producto.fecha) }}</li>
              <li>Referencia: #{{ producto.id }}</li>
            </ul>
          </div>

          <div v-if="tabActiva === 'envio'" class="prose prose-indigo max-w-none">
            <p>Enviamos nuestros productos en 24-48h laborables a través de mensajería urgente.</p>
            <p class="mt-4">Devoluciones gratuitas durante los primeros 14 días.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Productos relacionados -->
    <div class="mt-10">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Productos relacionados</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card
          v-for="prod in productosRelacionados"
          :key="prod.id"
          :id="prod.id"
          :nombre="prod.nombre"
          :descripcion="prod.descripcion"
          :precio="prod.precio"
          :imagen="prod.rutaImg"
        />
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Card from '@/components/Card.vue'
import CarritoService from '@/services/CarritoService'

const route = useRoute()
const router = useRouter()
const toast = useToast()

//Estados
const producto = ref(null)
const cargando = ref(true)
const error = ref(null)
const cantidad = ref(1)
const tabActiva = ref('detalles')
const productosRelacionados = ref([])

//obtener el producto de la API por su ID
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
      categoria: respuesta.data.categoria || 'General',
      fecha: new Date(respuesta.data.created_at || Date.now()),
    }

    //Cargar productos relacionados de la misma categoría
    cargarProductosRelacionados()
  } catch (err) {
    console.error('Error al cargar el producto:', err)
    error.value =
      'No pudimos cargar la información del producto. Por favor, inténtalo de nuevo más tarde.'
  } finally {
    cargando.value = false
  }
}

//Cargar productos relacionados
const cargarProductosRelacionados = async () => {
  try {
    if (!producto.value || !producto.value.categoria) return

    const respuesta = await axios.get('http://localhost:8000/api/producto/')

    //Filtrar productos de la misma categoría, excluyendo el actual
    const relacionados = respuesta.data
      .filter((p) => p.categoria === producto.value.categoria && p.id !== producto.value.id)
      .map((p) => ({
        id: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: parseFloat(p.precio),
        rutaImg: p.rutaImg,
        categoria: p.categoria || 'General',
      }))
      .slice(0, 4) //Limitamos a 4 productos relacionados

    productosRelacionados.value = relacionados
  } catch (err) {
    console.error('Error al cargar productos relacionados:', err)
  }
}

//Formatear fecha
const formatearFecha = (fecha) => {
  if (!fecha) return 'Fecha no disponible'
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

//Añadir al carrito
const agregarAlCarrito = async () => {
  if (!producto.value) return

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

//Cargar datos al montar el componente
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
