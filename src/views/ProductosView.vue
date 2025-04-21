<template>
  <Navbar @search-productos="buscarProductos" />
  <!-- Breadcrumbs -->
  <div class="bg-gray-100 py-2">
    <div class="container mx-auto px-4">
      <div class="flex items-center text-sm text-gray-600">
        <router-link to="/" class="hover:text-indigo-600">Inicio</router-link>
        <span class="mx-2">/</span>
        <span class="font-medium text-gray-800">Catálogo de Productos</span>
      </div>
    </div>
  </div>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold mb-6 text-gray-800">Catálogo de Productos</h1>

    <!-- Filtros y opciones de ordenación -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Filtro de categoría -->
        <div class="w-full md:w-auto flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
          <select
            v-model="categoriaSeleccionada"
            @change="aplicarFiltros"
            class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Todas las categorías</option>
            <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
              {{ categoria.nombre }}
            </option>
          </select>
        </div>

        <div class="w-full md:w-auto flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
          <select
            v-model="ordenarPor"
            @change="aplicarFiltros"
            class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="nombre_asc">Nombre: A-Z</option>
            <option value="nombre_desc">Nombre: Z-A</option>
            <option value="precio_asc">Precio: menor a mayor</option>
            <option value="precio_desc">Precio: mayor a menor</option>
            <option value="mas_recientes">Más recientes</option>
          </select>
        </div>

        <div class="w-full md:w-auto flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Precio máximo: {{ precioMaximo }}€
          </label>
          <input
            v-model="precioMaximo"
            @change="aplicarFiltros"
            type="range"
            min="0"
            max="1000"
            step="10"
            class="w-full accent-indigo-600"
          />
          <div class="flex justify-between text-xs text-gray-500 mt-1">
            <span>0€</span>
            <span>500€</span>
            <span>1000€</span>
          </div>
        </div>

        <!-- Selector de modo de visualizacion -->
        <div class="w-full md:w-auto flex items-end">
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700 mb-2">Visualización</label>
            <div class="flex space-x-2">
              <button
                @click="modoVisualizacion = 'grid'"
                :class="[
                  'p-2 rounded-md focus:outline-none transition-colors',
                  modoVisualizacion === 'grid'
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
                ]"
                title="Vista en cuadrícula"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                @click="modoVisualizacion = 'list'"
                :class="[
                  'p-2 rounded-md focus:outline-none transition-colors',
                  modoVisualizacion === 'list'
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
                ]"
                title="Vista en lista"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado de carga -->
    <div v-if="cargando" class="flex flex-col items-center justify-center py-16">
      <div
        class="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-xl text-gray-600">Cargando productos...</p>
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

    <!-- Grid de productos -->
    <div v-else-if="productosFiltrados.length > 0" class="mb-8">
      <p class="text-gray-600 mb-4">{{ productosFiltrados.length }} productos encontrados</p>

      <!-- Vista en cuadrícula -->
      <div
        v-if="modoVisualizacion === 'grid'"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <Card
          v-for="producto in productosFiltrados"
          :key="producto.id"
          :id="producto.id"
          :nombre="producto.nombre"
          :descripcion="producto.descripcion"
          :precio="producto.precio"
          :imagen="producto.rutaImg"
        />
      </div>

      <!-- Vista en lista -->
      <div v-else class="space-y-4">
        <div
          v-for="producto in productosFiltrados"
          :key="producto.id"
          class="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row gap-4 transition-all hover:shadow-md hover:transform hover:-translate-y-1"
        >
          <div class="md:w-48 h-48 flex-shrink-0">
            <img
              :src="producto.rutaImg || 'https://via.placeholder.com/300'"
              :alt="producto.nombre"
              class="w-full h-full object-cover rounded-md"
            />
          </div>
          <div class="flex-1 flex flex-col">
            <h3 class="text-xl font-medium text-gray-800">{{ producto.nombre }}</h3>
            <p class="text-gray-600 my-2 line-clamp-3">{{ producto.descripcion }}</p>
            <div class="mt-auto flex flex-wrap items-center justify-between gap-4">
              <span class="text-xl font-bold text-indigo-600"
                >{{ producto.precio.toFixed(2) }}€</span
              >
              <router-link
                :to="'/producto/' + producto.id"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Ver detalles
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sin resultados -->
    <div v-else class="text-center py-16 bg-gray-50 rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mx-auto text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="text-xl font-medium text-gray-700 mb-2">No se encontraron productos</h3>
      <p class="text-gray-500 mb-6">Prueba con otros filtros o busca con términos más generales</p>
      <button
        @click="reiniciarFiltros"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
      >
        Mostrar todos los productos
      </button>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Card from '@/components/Card.vue'
import CarritoService from '@/services/CarritoService'

const toast = useToast()
// ...existing code...
// Estados
const productos = ref([])
const categorias = ref([])
const cargando = ref(true)
const error = ref(null)
const terminoBusqueda = ref('')
const categoriaSeleccionada = ref('')
const ordenarPor = ref('nombre_asc')
const precioMaximo = ref(1000)
const productosFiltrados = ref([])
const modoVisualizacion = ref('grid') // Nuevo: 'grid' o 'list'

// Obtener datos de la API de productos
const cargarProductos = async () => {
  try {
    cargando.value = true
    error.value = null

    const respuesta = await axios.get('http://localhost:8000/api/producto/')

    productos.value = respuesta.data.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: parseFloat(producto.precio),
      rutaImg: producto.rutaImg,
      categoria_id: producto.categoria_id, // Asegúrate de que tu API devuelve el id de la categoría
      categoria_nombre: producto.categoria_nombre || 'General', // Nombre de la categoría si lo tienes
      fecha: new Date(producto.created_at || Date.now()),
    }))

    // Ya no extraemos las categorías de los productos aquí
    // En su lugar, llamamos a la función para cargar categorías de la API
    await cargarCategorias()

    aplicarFiltros()
  } catch (err) {
    console.error('Error al cargar productos:', err)
    error.value = 'No pudimos cargar los productos. Por favor, inténtalo de nuevo más tarde.'
  } finally {
    cargando.value = false
  }
}

// Nueva función para cargar categorías desde la API
const cargarCategorias = async () => {
  try {
    const respuesta = await axios.get('http://localhost:8000/api/categoria/')
    categorias.value = respuesta.data.map((categoria) => ({
      id: categoria.id,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
    }))
  } catch (err) {
    console.error('Error al cargar categorías:', err)
    toast.error('No pudimos cargar las categorías')
  }
}

//Función para aplicar filtros
const aplicarFiltros = () => {
  let resultado = [...productos.value]

  //Aplicar filtro de búsqueda
  if (terminoBusqueda.value) {
    const busqueda = terminoBusqueda.value.toLowerCase()
    resultado = resultado.filter(
      (p) =>
        p.nombre.toLowerCase().includes(busqueda) || p.descripcion.toLowerCase().includes(busqueda),
    )
  }

  //Aplicar filtro de categoría
  if (categoriaSeleccionada.value) {
    resultado = resultado.filter((p) => p.categoria_id == categoriaSeleccionada.value)
  }

  //Aplicar filtro de precio
  resultado = resultado.filter((p) => p.precio <= precioMaximo.value)

  //Aplicar ordenación
  switch (ordenarPor.value) {
    case 'nombre_asc':
      resultado.sort((a, b) => a.nombre.localeCompare(b.nombre))
      break
    case 'nombre_desc':
      resultado.sort((a, b) => b.nombre.localeCompare(a.nombre))
      break
    case 'precio_asc':
      resultado.sort((a, b) => a.precio - b.precio)
      break
    case 'precio_desc':
      resultado.sort((a, b) => b.precio - a.precio)
      break
    case 'mas_recientes':
      resultado.sort((a, b) => b.fecha.getTime() - a.fecha.getTime())
      break
  }

  productosFiltrados.value = resultado
}
// ...existing code...

//Restablecer todos los filtros
const reiniciarFiltros = () => {
  terminoBusqueda.value = ''
  categoriaSeleccionada.value = ''
  ordenarPor.value = 'nombre_asc'
  precioMaximo.value = 1000
  aplicarFiltros()
  toast.info('Filtros restablecidos')
}
//Función para buscar productos desde navbar
const buscarProductos = (query) => {
  terminoBusqueda.value = query
  aplicarFiltros()
}

//Cargar productos al montar el componente
onMounted(() => {
  cargarProductos()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mejora visual al pasar el ratón sobre las tarjetas */
:deep(.card-container) {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

:deep(.card-container:hover) {
  transform: translateY(-5px);
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Estilos para la vista en lista */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
