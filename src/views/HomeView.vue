<template>
  <!-- Navbar -->
  <Navbar @search-productos="searchProductos" />

  <!-- Hero Section con Carousel -->
  <section class="relative">
    <Carousel />
    <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div class="text-center px-4">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">LaBloom</h1>
        <p class="text-xl md:text-2xl text-white mb-6">Flores frescas para cada ocasión</p>
        <button
          class="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold transition duration-300 shadow-lg"
        >
          Explorar colección
        </button>
      </div>
    </div>
  </section>

  <!-- Categorías -->
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8 text-gray-800">Nuestras Categorías</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="(categoria, index) in categorias"
          :key="index"
          class="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
        >
          <div class="h-40 bg-emerald-50 flex items-center justify-center">
            <span class="text-4xl">{{ categoria.icono }}</span>
          </div>
          <div class="p-4 text-center">
            <h3 class="font-semibold text-gray-800">{{ categoria.nombre }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ categoria.cantidadProductos }} productos</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Productos -->
  <section class="py-12">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-gray-800">Nuestros Arreglos Florales</h2>

        <!-- Filtros -->
        <div class="flex gap-2">
          <select
            class="border rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            <option>Todos</option>
            <option>Más vendidos</option>
            <option>Novedades</option>
            <option>De temporada</option>
          </select>
        </div>
      </div>

      <!-- Estado de carga -->
      <div v-if="isLoading" class="flex justify-center py-16">
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-emerald-300 border-t-emerald-600"
        ></div>
      </div>

      <!-- Mensaje de error -->
      <div v-else-if="error" class="bg-red-100 text-red-700 p-4 rounded-lg text-center my-8">
        {{ error }}
      </div>

      <!-- Productos -->
      <div
        v-else-if="filteredProducts.length"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <Card
          v-for="producto in filteredProducts"
          :key="producto.id"
          :id="producto.id"
          :nombre="producto.nombre"
          :descripcion="producto.descripcion"
          :precio="producto.precio"
          :imagen="producto.rutaImg"
          class="transform hover:scale-105 transition duration-300"
        />
      </div>

      <!-- Sin resultados -->
      <div v-else class="p-12 text-center bg-gray-50 rounded-lg">
        <span class="text-5xl mb-4 block">🌷</span>
        <h3 class="text-2xl font-semibold text-gray-700">No se encontraron resultados</h3>
        <p class="text-gray-600 mt-2">Intenta con otra búsqueda o explora nuestras categorías</p>
      </div>

      <!-- Paginación -->
      <div class="flex justify-center mt-8" v-if="filteredProducts.length">
        <button class="mx-1 px-3 py-1 rounded border hover:bg-emerald-100">1</button>
        <button class="mx-1 px-3 py-1 rounded border hover:bg-emerald-100">2</button>
        <button class="mx-1 px-3 py-1 rounded border hover:bg-emerald-100">3</button>
      </div>
    </div>
  </section>

  <!-- Testimonios -->
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-10 text-gray-800">
        Lo que dicen nuestros clientes
      </h2>
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(testimonio, index) in testimonios"
          :key="index"
          class="bg-white p-6 rounded-lg shadow-md"
        >
          <div class="flex items-center mb-4">
            <div
              class="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold"
            >
              {{ testimonio.iniciales }}
            </div>
            <div class="ml-4">
              <h4 class="font-semibold">{{ testimonio.nombre }}</h4>
              <div class="flex text-yellow-400">
                <span v-for="n in 5" :key="n" class="mr-1">★</span>
              </div>
            </div>
          </div>
          <p class="text-gray-600 italic">"{{ testimonio.comentario }}"</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Servicios -->
  <section class="py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-10 text-gray-800">Nuestros Servicios</h2>
      <div class="grid gap-6 md:grid-cols-3">
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <div
            class="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
          >
            <span class="text-2xl">🚚</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Entrega a domicilio</h3>
          <p class="text-gray-600">
            Llevamos tus flores frescas donde las necesites en menos de 24 horas
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <div
            class="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
          >
            <span class="text-2xl">🎁</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Regalos personalizados</h3>
          <p class="text-gray-600">Diseñamos arreglos únicos para cada ocasión especial</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md text-center">
          <div
            class="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
          >
            <span class="text-2xl">💐</span>
          </div>
          <h3 class="text-xl font-semibold mb-2">Suscripción floral</h3>
          <p class="text-gray-600">
            Recibe flores frescas periódicamente con nuestros planes mensuales
          </p>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>

<script setup>
import Carousel from '@/components/Carousel.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Card from '../components/Card.vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const productos = ref([])
const searchQuery = ref('')
const isLoading = ref(true)
const error = ref(null)

// Datos para categorías adaptados a una floristería
const categorias = ref([
  { nombre: 'Ramos', cantidadProductos: 24, icono: '💐' },
  { nombre: 'Plantas', cantidadProductos: 18, icono: '🌱' },
  { nombre: 'Eventos', cantidadProductos: 15, icono: '🎊' },
  { nombre: 'Decoración', cantidadProductos: 21, icono: '🏡' },
])

// Testimonios adaptados al contexto de floristería
const testimonios = ref([
  {
    nombre: 'María López',
    iniciales: 'ML',
    comentario:
      'El ramo que envié a mi madre por su cumpleaños era precioso. Las flores duraron más de dos semanas. ¡Increíble calidad!',
  },
  {
    nombre: 'Carlos García',
    iniciales: 'CG',
    comentario:
      'Contratamos LaBloom para decorar nuestra boda y superaron todas nuestras expectativas. Profesionales y creativos.',
  },
  {
    nombre: 'Laura Martínez',
    iniciales: 'LM',
    comentario:
      'Me encanta la suscripción mensual de flores. Siempre recibo arreglos preciosos y diferentes.',
  },
])

onMounted(async () => {
  console.log('Cargando catálogo de flores...')
  try {
    const response = await axios.get('http://localhost:8000/api/producto/')
    productos.value = response.data
    console.log(response.data)
  } catch (err) {
    console.error('Error al obtener productos:', err)
    error.value = 'No pudimos cargar nuestro catálogo. Por favor, intenta más tarde.'
  } finally {
    isLoading.value = false
  }
})

const filteredProducts = computed(() => {
  if (!searchQuery.value) return productos.value
  return productos.value.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const searchProductos = (query) => {
  searchQuery.value = query
}
</script>

<style scoped>
/* Animaciones para los elementos */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Sombreado suave para las tarjetas */
.shadow-md {
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Efecto hover mejorado para los botones */
button.rounded-full {
  transition: all 0.3s ease;
}

button.rounded-full:hover {
  transform: translateY(-2px);
}
</style>
