<template>
  <Navbar @search-productos="buscarProductos" />

  <!-- Breadcrumbs -->
  <div class="bg-gray-50 py-3 border-b">
    <div class="container mx-auto px-4">
      <div class="flex items-center text-sm text-gray-600">
        <router-link to="/" class="hover:text-green-600 transition-colors">Inicio</router-link>
        <span class="mx-2 text-gray-400">/</span>
        <span class="font-medium text-gray-800">Catálogo de Productos</span>
      </div>
    </div>
  </div>

  <div class="container mx-auto px-4 py-6 lg:py-8">
    <!-- Header mejorado -->
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
        Catálogo de Productos
      </h1>
      <p class="text-gray-600 text-sm md:text-base">
        Descubre nuestra selección de productos únicos
      </p>
    </div>

    <!-- Filtros mejorados y más responsive -->
    <div class="bg-white rounded-xl shadow-sm border p-4 md:p-6 mb-6 md:mb-8">
      <!-- Filtros principales en móvil -->
      <div class="flex flex-col space-y-4">
        <!-- Primera fila: Categoría y Ordenar (móvil: stack vertical) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Filtro de categoría -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Categoría</label>
            <select
              v-model="categoriaSeleccionada"
              @change="aplicarFiltros"
              class="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
            >
              <option value="">Todas las categorías</option>
              <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                {{ categoria.nombre }}
              </option>
            </select>
          </div>

          <!-- Ordenar por -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Ordenar por</label>
            <select
              v-model="ordenarPor"
              @change="aplicarFiltros"
              class="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
            >
              <option value="nombre_asc">Nombre: A-Z</option>
              <option value="nombre_desc">Nombre: Z-A</option>
              <option value="precio_asc">Precio: menor a mayor</option>
              <option value="precio_desc">Precio: mayor a menor</option>
              <option value="mas_recientes">Más recientes</option>
            </select>
          </div>
        </div>

        <!-- Segunda fila: Precio y controles adicionales -->
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4 pt-4 border-t border-gray-200">
          <div class="space-y-3 flex flex-col items-center">
            <label class="block text-sm font-medium text-gray-700 text-center">
              Precio máximo: <span class="font-bold text-green-600">{{ precioMaximo }}€</span>
            </label>
            <input
              v-model="precioMaximo"
              @input="aplicarFiltros"
              type="range"
              min="0"
              max="100"
              step="5"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div class="flex justify-between text-xs text-gray-500 w-full">
              <span>0€</span>
              <span>25€</span>
              <span>50€</span>
              <span>75€</span>
              <span>100€</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado de carga mejorado -->
    <div v-if="cargando" class="flex flex-col items-center justify-center py-16 md:py-24">
      <div class="relative">
        <div
          class="w-16 h-16 md:w-20 md:h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"
        ></div>
        <div
          class="absolute inset-0 w-16 h-16 md:w-20 md:h-20 border-4 border-transparent border-r-green-400 rounded-full animate-spin animation-delay-150"
        ></div>
      </div>
      <p class="text-lg md:text-xl text-gray-600 mt-6 font-medium">Cargando productos...</p>
      <p class="text-sm text-gray-500 mt-2">Esto no debería tardar mucho</p>
    </div>

    <!-- Mensaje de error mejorado -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 my-8">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-red-500"
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
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error al cargar productos</h3>
          <p class="text-sm text-red-700 mt-1">{{ error }}</p>
          <button
            @click="cargarProductos"
            class="mt-3 text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-md transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>

    <!-- Resultados -->
    <div v-else-if="productosFiltrados.length > 0" class="mb-8">
      <!-- Header de resultados mejorado -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600">
            <span class="font-semibold text-gray-900">{{ productosFiltrados.length }}</span>
            producto{{ productosFiltrados.length !== 1 ? 's' : '' }} encontrado{{
              productosFiltrados.length !== 1 ? 's' : ''
            }}
          </span>
          <div v-if="terminoBusqueda || categoriaSeleccionada" class="flex items-center space-x-1">
            <span class="text-gray-400">•</span>
            <button
              @click="reiniciarFiltros"
              class="text-xs text-green-600 hover:text-green-700 font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      <!-- Vista en cuadrícula mejorada -->
      <div
        v-if="modoVisualizacion === 'grid'"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
      >
        <Card
          v-for="producto in productosFiltrados"
          :key="producto.id"
          :id="producto.id"
          :nombre="producto.nombre"
          :descripcion="producto.descripcion"
          :precio="producto.precio"
          :imagen="producto.rutaImg"
          :stock="producto.stock"
          :visible="producto.visible"
          @agregar-al-carrito="handleAgregarAlCarrito"
          class="transform transition-all duration-300 hover:scale-105"
        />
      </div>

      <!-- Vista en lista mejorada y más responsive -->
      <div v-else class="space-y-4">
        <div
          v-for="producto in productosFiltrados"
          :key="producto.id"
          class="bg-white rounded-xl shadow-sm border hover:shadow-md p-4 md:p-6 transition-all duration-300 hover:border-green-200"
        >
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Imagen del producto -->
            <div
              class="w-full sm:w-32 md:w-48 h-48 sm:h-32 md:h-48 flex-shrink-0 cursor-pointer group"
              @click="router.push('/producto/' + producto.id)"
            >
              <img
                :src="producto.rutaImg || 'https://via.placeholder.com/300'"
                :alt="producto.nombre"
                class="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- Contenido del producto -->
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <h3
                  class="text-lg md:text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-green-600 transition-colors"
                  @click="router.push('/producto/' + producto.id)"
                >
                  {{ producto.nombre }}
                </h3>

                <!-- Indicador de disponibilidad mejorado -->
                <div class="mb-3">
                  <div
                    v-if="!producto.visible"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 mr-1"
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
                    No disponible
                  </div>
                  <div
                    v-else-if="producto.stock > 10"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    <div class="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    En stock
                  </div>
                  <div
                    v-else-if="producto.stock > 0"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                  >
                    <div class="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                    Solo {{ producto.stock }} unidades
                  </div>
                  <div
                    v-else
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3 w-3 mr-1"
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
                    Agotado
                  </div>
                </div>

                <p class="text-gray-600 text-sm md:text-base mb-4 line-clamp-2 md:line-clamp-3">
                  {{ producto.descripcion }}
                </p>
              </div>

              <!-- Precio y acciones -->
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <span class="text-2xl md:text-3xl font-bold text-green-600">
                  {{ producto.precio.toFixed(2) }}€
                </span>
                <div class="flex flex-col sm:flex-row gap-2">
                  <router-link
                    :to="'/producto/' + producto.id"
                    class="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg transition-colors text-center text-sm font-medium"
                  >
                    Ver detalles
                  </router-link>
                  <button
                    @click="handleAgregarAlCarrito(producto.id)"
                    :disabled="!producto.visible || producto.stock <= 0"
                    :class="[
                      'flex-1 sm:flex-none px-4 py-2.5 rounded-lg transition-colors text-sm font-medium',
                      !producto.visible || producto.stock <= 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white',
                    ]"
                  >
                    {{
                      !producto.visible || producto.stock <= 0
                        ? 'No disponible'
                        : 'Añadir al carrito'
                    }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sin resultados mejorado -->
    <div v-else class="text-center py-16 md:py-24">
      <div class="max-w-md mx-auto">
        <div
          class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
          No se encontraron productos
        </h3>
        <p class="text-gray-600 mb-8 text-sm md:text-base">
          Intenta ajustar tus filtros o busca términos diferentes
        </p>
        <button
          @click="reiniciarFiltros"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
        >
          Mostrar todos los productos
        </button>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Card from '@/components/Card.vue'
import CarritoService from '@/services/CarritoService'

const toast = useToast()
const router = useRouter()

//Estados
const productos = ref([])
const categorias = ref([])
const cargando = ref(true)
const error = ref(null)
const terminoBusqueda = ref('')
const categoriaSeleccionada = ref('')
const ordenarPor = ref('nombre_asc')
const precioMaximo = ref(100)
const productosFiltrados = ref([])
const modoVisualizacion = ref('grid')
const logeado = ref(false)
//Obtener datos de la API de productos
const cargarProductos = async () => {
  try {
    cargando.value = true
    error.value = null

    const respuesta = await axios.get('http://localhost:8000/api/producto/')

    //Filtrar solo los productos visibles antes de procesarlos
    productos.value = respuesta.data
      .filter((producto) => producto.visible === true || producto.visible === 1)
      .map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: parseFloat(producto.precio),
        rutaImg: producto.rutaImg,
        categoria_id: producto.categoria_id,
        categoria_nombre: producto.categoria_nombre || 'General',
        fecha: new Date(producto.created_at || Date.now()),
        stock: producto.stock || 0,
        visible: true,
      }))

    await cargarCategorias()

    aplicarFiltros()
  } catch (err) {
    console.error('Error al cargar productos:', err)
    error.value = 'No pudimos cargar los productos. Por favor, inténtalo de nuevo más tarde.'
  } finally {
    cargando.value = false
  }
}

//Función para cargar categorías desde la API
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

//Restablecer todos los filtros
const reiniciarFiltros = () => {
  terminoBusqueda.value = ''
  categoriaSeleccionada.value = ''
  ordenarPor.value = 'nombre_asc'
  precioMaximo.value = 100
  aplicarFiltros()
  toast.info('Filtros restablecidos')
}

//Función para buscar productos desde navbar
const buscarProductos = (query) => {
  terminoBusqueda.value = query
  aplicarFiltros()
}

// Función para verificar el estado de login
const checkLoginStatus = () => {
  const token = localStorage.getItem('access_token')
  logeado.value = !!token
}

//Función para gestionar la acción de añadir al carrito
const handleAgregarAlCarrito = (productoId) => {
  if (!logeado.value) {
    toast.warning('Necesitas iniciar sesión para añadir productos al carrito')
    router.push('/login')
    return
  }

  // Buscar el producto por ID
  const producto = productos.value.find((p) => p.id === productoId)

  // Verificar disponibilidad y stock
  if (!producto.visible) {
    toast.error('Este producto no está disponible actualmente.')
    return
  }

  if (producto.stock <= 0) {
    toast.error('Este producto está agotado.')
    return
  }

  // Añadimos una cantidad por defecto de 1
  CarritoService.agregarProducto(productoId, 1)
    .then(() => {
      toast.success('Producto añadido al carrito correctamente')
    })
    .catch((error) => {
      console.error('Error al añadir al carrito:', error)
      toast.error('No se pudo añadir el producto al carrito')
    })
}
//Verificar si hay un token al cargar el componente
onMounted(() => {
  cargarProductos()
  checkLoginStatus()
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
