<template>
  <Navbar />
  <!-- Breadcrumbs -->
  <div class="bg-gray-100 py-2">
    <div class="container mx-auto px-4">
      <div class="flex items-center text-sm text-gray-600">
        <router-link to="/" class="hover:text-indigo-600">Inicio</router-link>
        <span class="mx-2">/</span>
        <span class="font-medium text-gray-800">Blog</span>
      </div>
    </div>
  </div>
  <div class="bg-gray-50 min-h-screen">
    <!-- Cabecera del blog -->
    <header class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
      <div class="container mx-auto px-4">
        <p class="text-xl text-center max-w-2xl mx-auto opacity-90">
          Descubre los últimos artículos, noticias y tendencias
        </p>
      </div>
    </header>

    <!-- Contenido principal -->
    <div class="container mx-auto px-4 py-12">
      <!-- Estado de carga -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-24">
        <div
          class="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-xl text-gray-600">Cargando artículos...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="bg-red-50 border-l-4 border-red-600 p-8 rounded-lg my-8">
        <div class="flex items-center">
          <svg
            class="w-10 h-10 text-red-600 mr-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p class="text-xl text-red-600">{{ error }}</p>
        </div>
      </div>

      <!-- Lista de artículos -->
      <div v-else class="max-w-4xl mx-auto">
        <article
          v-for="(articulo, index) in articulos"
          :key="articulo.id"
          class="bg-white rounded-xl overflow-hidden shadow-lg mb-12 transition-all duration-300 hover:shadow-2xl"
        >
          <!-- Contenedor flexible para layout -->
          <div class="md:flex">
            <!-- Imagen del artículo -->
            <div class="md:w-1/3 h-64 md:h-auto">
              <img
                :src="articulo.rutaImg"
                :alt="articulo.titulo"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Contenido del artículo -->
            <div class="md:w-2/3 p-8">
              <!-- Título del artículo -->
              <h2
                class="text-3xl font-bold text-gray-800 mb-4 hover:text-indigo-600 transition-colors"
              >
                {{ articulo.titulo }}
              </h2>

              <!-- Metadatos del artículo -->
              <div class="flex items-center text-sm text-gray-500 mb-6">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>Publicado el {{ formatearFecha(articulo.created_at) }}</span>

                <span
                  v-if="articulo.updated_at !== articulo.created_at"
                  class="flex items-center ml-4"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span class="italic"
                    >Actualizado el {{ formatearFecha(articulo.updated_at) }}</span
                  >
                </span>
              </div>

              <!-- Contenido truncado -->
              <div class="text-gray-600 mb-6 line-clamp-3">
                {{ articulo.contenido }}
              </div>

              <!-- Acciones -->
              <div class="flex items-center justify-between mt-6">
                <button
                  class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition-colors flex items-center font-medium"
                >
                  Leer artículo completo
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>

                <div class="flex space-x-2">
                  <button
                    class="text-gray-400 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    class="text-gray-400 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Separador entre artículos -->
          <div v-if="index !== articulos.length - 1" class="border-b border-gray-100"></div>
        </article>

        <!-- Si no hay artículos -->
        <div v-if="articulos.length === 0" class="bg-gray-50 rounded-lg p-12 text-center">
          <svg
            class="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            ></path>
          </svg>
          <p class="text-xl text-gray-600">No hay artículos disponibles actualmente.</p>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const articulos = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(() => {
  getArticulos()
})

const getArticulos = async () => {
  try {
    loading.value = true
    const response = await axios.get('http://localhost:8000/api/articulo/')
    articulos.value = response.data
    console.log(response.data)
    error.value = null
  } catch (err) {
    console.error(err)
    error.value = 'Error al cargar los artículos. Por favor, inténtalo de nuevo.'
  } finally {
    loading.value = false
  }
}

const formatearFecha = (fechaStr) => {
  const fecha = new Date(fechaStr)
  return fecha.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
