<template>
  <Navbar />
  <div>
    <!-- Hero Section con Carousel -->
    <Carousel />
    <!-- Sección de bienvenida -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="text-4xl font-light text-gray-800 mb-6">Bienvenido a LaBloom</h1>
        <p class="text-xl text-gray-600 mb-8">
          Donde convertimos momentos especiales en recuerdos inolvidables a través de nuestras
          creaciones florales.
        </p>
        <div class="flex justify-center space-x-4">
          <router-link
            to="/sobre-nosotros"
            class="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
          >
            Conócenos
          </router-link>
          <router-link
            to="/productos"
            class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Ver catálogo
          </router-link>
          <router-link
            to="/preguntas-frecuentes"
            class="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
          >
            Preguntas Frecuentes
          </router-link>
        </div>
      </div>
    </section>

    <!-- Categorías destacadas -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-light text-center text-gray-800 mb-12">Nuestras categorías</h2>

        <!-- Estado de carga -->
        <div v-if="loadingCategorias" class="flex justify-center py-12">
          <div
            class="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"
          ></div>
        </div>

        <!-- Error -->
        <div v-else-if="errorCategorias" class="bg-red-50 p-4 rounded-lg text-red-600 text-center">
          {{ errorCategorias }}
        </div>

        <!-- Categorías -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="categoria in categorias"
            :key="categoria.id"
            class="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
          >
            <img
              :src="categoria.rutaImg"
              :alt="categoria.nombre"
              class="w-full h-64 object-cover transition duration-300 transform group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <h3 class="text-xl font-medium text-white">{{ categoria.nombre }}</h3>
              <router-link
                :to="`/productos?categoria=${categoria.id}`"
                class="inline-block mt-2 text-sm text-white hover:underline"
              >
                Ver productos →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Productos destacados -->
    <section class="container mx-auto px-4 py-16">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-light text-gray-800">Productos destacados</h2>
        <router-link
          to="/productos"
          class="text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          Ver todos
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </router-link>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"
        ></div>
      </div>

      <div v-else-if="error" class="bg-red-50 p-4 rounded-lg text-red-600">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          v-for="producto in productosDestacados"
          :key="producto.id"
          :id="producto.id"
          :nombre="producto.nombre"
          :descripcion="producto.descripcion"
          :precio="producto.precio"
          :imagen="producto.rutaImg"
          @agregar-al-carrito="agregarAlCarrito"
        />
      </div>
    </section>

    <!-- Banner promocional -->
    <section class="bg-indigo-600 py-16">
      <div class="container mx-auto px-4">
        <div class="md:flex items-center justify-between">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h2 class="text-3xl font-light text-white mb-4">Envío gratuito en tu primer pedido</h2>
            <p class="text-indigo-100 mb-6">
              Disfruta de envío gratis en tu primer pedido al registrarte en nuestra web.
            </p>
            <router-link
              to="/register"
              class="inline-block px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Registrarme ahora
            </router-link>
          </div>
          <div class="md:w-1/3">
            <img src="" alt="Promoción" class="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>

    <!-- Blog / Consejos -->
    <section class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-light text-gray-800 mb-12 text-center">Nuestro blog</h2>

      <!-- Estado de carga -->
      <div v-if="loadingArticulos" class="flex justify-center py-12">
        <div
          class="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"
        ></div>
      </div>

      <!-- Error -->
      <div v-else-if="errorArticulos" class="bg-red-50 p-4 rounded-lg text-red-600 text-center">
        {{ errorArticulos }}
      </div>

      <!-- Sin artículos -->
      <div v-else-if="articulosRecientes.length === 0" class="text-center py-12">
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p class="text-gray-500">No hay articulos disponibles en este momento.</p>
      </div>

      <!-- Lista de artículos -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="articulo in articulosRecientes"
          :key="articulo.id"
          class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <img :src="articulo.imagen" :alt="articulo.titulo" class="w-full h-48 object-cover" />
          <div class="p-6">
            <div class="text-sm text-gray-500 mb-2">{{ articulo.fecha }}</div>
            <h3 class="text-xl font-medium text-gray-800 mb-2">{{ articulo.titulo }}</h3>
            <p class="text-gray-600 mb-4">{{ articulo.resumen }}</p>
            <router-link
              :to="`/blog/${articulo.id}`"
              class="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Leer más
            </router-link>
          </div>
        </div>
      </div>

      <div class="text-center mt-10">
        <router-link
          to="/blog"
          class="inline-block px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors"
        >
          Ver todas las entradas
        </router-link>
      </div>
    </section>

    <!-- Testimonios -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-light text-gray-800 mb-12 text-center">
          Lo que dicen nuestros clientes
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Testimonio 1 -->
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              "El ramo que pedí para el cumpleaños de mi madre era precioso. Llegó puntual y las
              flores estaban perfectas. ¡Muy recomendable!"
            </p>
            <div class="font-medium">Ana García</div>
          </div>

          <!-- Testimonio 2 -->
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              "Contratamos sus servicios para nuestra boda y quedamos encantados. La decoración
              floral fue exactamente lo que habíamos imaginado."
            </p>
            <div class="font-medium">Carlos Martínez</div>
          </div>

          <!-- Testimonio 3 -->
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              "Compro regularmente plantas para mi oficina y siempre están en perfecto estado. El
              servicio al cliente es excelente y resuelven todas mis dudas."
            </p>
            <div class="font-medium">Laura Rodríguez</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="container mx-auto px-4 py-16">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl font-light text-gray-800 mb-4">¡Suscríbete a nuestro newsletter!</h2>
        <p class="text-gray-600 mb-8">
          Recibe ofertas exclusivas, novedades y consejos para el cuidado de tus plantas.
        </p>
        <form @submit.prevent="suscribirNewsletter" class="flex flex-col sm:flex-row gap-3">
          <input
            v-model="email"
            type="email"
            placeholder="Tu correo electrónico"
            required
            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Suscribirme
          </button>
        </form>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import CarritoService from '@/services/CarritoService'
import axios from 'axios'
import Carousel from '@/components/Carousel.vue'
import Card from '@/components/Card.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const email = ref('')
const loading = ref(false)
const error = ref(null)
const productosDestacados = ref([])
const categorias = ref([])
const articulosRecientes = ref([])
const loadingCategorias = ref(false)
const errorCategorias = ref(null)
const loadingArticulos = ref(false)
const errorArticulos = ref(null)

//Cargar productos destacados
const cargarProductosDestacados = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get('http://localhost:8000/api/producto/destacados/')

    productosDestacados.value = response.data.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: parseFloat(producto.precio),
      rutaImg: producto.rutaImg,
      categoria: producto.categoria || 'General',
    }))
  } catch (err) {
    console.error('Error al cargar productos destacados:', err)
    error.value =
      'No pudimos cargar los productos destacados. Por favor, intenta de nuevo más tarde.'
  } finally {
    loading.value = false
  }
}

//Cargar categorías
const cargarCategorias = async () => {
  try {
    loadingCategorias.value = true
    errorCategorias.value = null
    const response = await axios.get('http://localhost:8000/api/categoria/')

    categorias.value = response.data
      .map((categoria) => ({
        id: categoria.id,
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
        rutaImg: categoria.rutaImg || obtenerImagenPredeterminada(categoria.id),
      }))
      //Limitamos a 4 categorías para mostrar en la página principal
      .slice(0, 4)
  } catch (err) {
    console.error('Error al cargar categorías:', err)
    errorCategorias.value = 'No pudimos cargar las categorías.'
  } finally {
    loadingCategorias.value = false
  }
}

//Función para obtener una imagen predeterminada según el ID de la categoría
const obtenerImagenPredeterminada = (id) => {
  const imagenesPredeterminadas = [
    'https://images.unsplash.com/photo-1567696153798-068c25a13af1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1561181286-d5c73133aeda?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519095614420-850b5671ac7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531102703131-0478e728c67c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  ]
  return imagenesPredeterminadas[(id - 1) % imagenesPredeterminadas.length]
}

// Cargar artículos recientes del blog
const cargarArticulosRecientes = async () => {
  try {
    loadingArticulos.value = true
    errorArticulos.value = null

    const response = await axios.get('http://localhost:8000/api/articulo/')

    articulosRecientes.value = response.data
      .map((articulo) => ({
        id: articulo.id,
        titulo: articulo.titulo,
        resumen: articulo.contenido.substring(0, 120) + '...',
        fecha: formatearFecha(articulo.created_at),
        imagen:
          articulo.rutaImg ||
          'https://images.unsplash.com/photo-1563241860-3cccea45e666?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      }))
      //Limitamos a los 3 artículos más recientes
      .slice(0, 3)
  } catch (err) {
    console.error('Error al cargar artículos del blog:', err)
    errorArticulos.value = 'No pudimos cargar los artículos del blog.'
  } finally {
    loadingArticulos.value = false
  }
}

//Formatear fecha para mostrarla en formato legible
const formatearFecha = (fechaStr) => {
  if (!fechaStr) return 'Fecha no disponible'

  const fecha = new Date(fechaStr)
  return fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

//Verificar si hay un token de acceso
const checkLoginStatus = () => {
  const token = localStorage.getItem('access_token')
  return !!token
}

//Agregar producto al carrito
const agregarAlCarrito = async (productoId) => {
  if (!checkLoginStatus()) {
    toast.warning('Necesitas iniciar sesión para añadir productos al carrito')
    router.push('/login')
    return
  }

  try {
    await CarritoService.agregarProducto(productoId, 1)
    toast.success('Producto añadido al carrito correctamente')
  } catch (error) {
    console.error('Error al añadir al carrito:', error)
    toast.error('No se pudo añadir el producto al carrito')
  }
}

//Suscripción al newsletter
const suscribirNewsletter = () => {
  //Aquí iría la lógica para procesar la suscripción
  toast.success(`¡Gracias por suscribirte! Recibirás nuestras novedades en ${email.value}`)
  email.value = ''
}

//Cargar datos al montar el componente
onMounted(() => {
  cargarProductosDestacados()
  cargarCategorias()
  cargarArticulosRecientes()
})
</script>

<style scoped>
/* Puedes añadir estilos específicos aquí si los necesitas */
</style>
