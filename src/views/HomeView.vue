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
            class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
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
            class="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"
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
        <h2 class="text-3xl font-light text-gray-800">Algunos de nuestros productos</h2>
        <router-link to="/productos" class="text-green-700 hover:text-green-900 flex items-center">
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
          class="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"
        ></div>
      </div>

      <div v-else-if="error" class="bg-red-50 p-4 rounded-lg text-red-600">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="producto in productosDestacados"
          :key="producto.id"
          :id="producto.id"
          :nombre="producto.nombre"
          :descripcion="producto.descripcion"
          :precio="producto.precio"
          :imagen="producto.rutaImg"
          :stock="producto.stock"
          :visible="producto.visible"
          @agregar-al-carrito="agregarAlCarrito"
        />
      </div>
    </section>

    <!-- Banner promocional -->
    <section class="bg-green-700 py-16">
      <div class="container mx-auto px-4">
        <div class="md:flex items-center justify-between">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h2 class="text-3xl font-light text-white mb-4">Envío gratuito en tu primer pedido</h2>
            <p class="text-green-200 mb-6">
              Disfruta de envío gratis en tu primer pedido al registrarte en nuestra web.
            </p>
            <router-link
              to="/register"
              class="inline-block px-6 py-3 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors"
            >
              Registrarme ahora
            </router-link>
          </div>
          <div class="md:w-1/3">
            <img src="/src/assets/promo.png " class="rounded-lg shadow-lg" />
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
          class="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"
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
              class="text-green-700 hover:text-green-900 font-medium"
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

        <!-- Estado de carga -->
        <div v-if="loadingValoraciones" class="flex justify-center py-12">
          <div
            class="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"
          ></div>
        </div>

        <!-- Error -->
        <div
          v-else-if="errorValoraciones"
          class="bg-red-50 p-4 rounded-lg text-red-600 text-center"
        >
          {{ errorValoraciones }}
        </div>

        <!-- Sin valoraciones -->
        <div v-else-if="valoracionesDestacadas.length === 0" class="text-center py-12">
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
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a3 3 0 01-3-3V8a3 3 0 013-3h8z"
            />
          </svg>
          <p class="text-gray-500">Aún no tenemos valoraciones para mostrar.</p>
        </div>

        <!-- Lista de valoraciones -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="valoracion in valoracionesDestacadas"
            :key="valoracion.id"
            class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <!-- Estrellas -->
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="w-5 h-5"
                  :class="i <= valoracion.valoracion ? 'text-yellow-400' : 'text-gray-300'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <span class="ml-2 text-sm text-gray-600">{{ valoracion.valoracion }}/5</span>
            </div>

            <!-- Comentario -->
            <p class="text-gray-600 mb-4 line-clamp-4">"{{ valoracion.comentario }}"</p>

            <!-- Producto -->
            <div class="border-t pt-4">
              <div class="font-medium text-gray-800"></div>
              <div class="text-sm text-gray-500">Producto: {{ valoracion.producto.nombre }}</div>
            </div>
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
            class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
          />
          <button
            type="submit"
            class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
const valoracionesDestacadas = ref([])
const loadingValoraciones = ref(false)
const errorValoraciones = ref(null)
// Cargar valoraciones aleatorias
// Cargar valoraciones aleatorias (sin datos de usuario)
const cargarValoracionesDestacadas = async () => {
  try {
    loadingValoraciones.value = true
    errorValoraciones.value = null

    // Cargar todas las valoraciones
    const valoracionesResponse = await axios.get('http://localhost:8000/api/valoraciones')

    // Cargar productos para obtener nombres
    const productosResponse = await axios.get('http://localhost:8000/api/producto/')

    // Filtrar valoraciones con comentarios y puntuación alta (4-5 estrellas)
    const valoracionesBuenas = valoracionesResponse.data.filter(
      (valoracion) => valoracion.comentario && valoracion.valoracion >= 4,
    )

    if (valoracionesBuenas.length === 0) {
      valoracionesDestacadas.value = []
      return
    }

    // Crear mapa de productos para búsqueda rápida
    const productosMap = new Map(productosResponse.data.map((p) => [p.id, p]))

    // Procesar valoraciones con información completa
    const valoracionesCompletas = valoracionesBuenas
      .map((valoracion) => {
        const producto = productosMap.get(valoracion.producto_id)

        if (!producto) return null

        return {
          id: valoracion.id,
          comentario: valoracion.comentario,
          valoracion: valoracion.valoracion,
          fecha: formatearFecha(valoracion.created_at),
          producto: {
            id: producto.id,
            nombre: producto.nombre,
          },
          usuario: {
            nombre: 'Cliente verificado', // Nombre genérico
          },
        }
      })
      .filter((valoracion) => valoracion !== null)

    // Seleccionar 3 valoraciones aleatorias
    const valoracionesAleatorias = valoracionesCompletas.sort(() => Math.random() - 0.5).slice(0, 3)

    valoracionesDestacadas.value = valoracionesAleatorias
  } catch (err) {
    console.error('Error al cargar valoraciones:', err)
    errorValoraciones.value = 'No pudimos cargar las valoraciones.'
  } finally {
    loadingValoraciones.value = false
  }
}
// Cargar algunos productos (sin filtrar por valoraciones)
const cargarProductosDestacados = async () => {
  try {
    loading.value = true
    error.value = null

    // Cargar todos los productos
    const response = await axios.get('http://localhost:8000/api/producto/')

    // Filtrar productos visibles y tomar 3 aleatorios
    const productosVisibles = response.data.filter(
      (producto) => producto.visible === true || producto.visible === 1,
    )

    // Mezclar array aleatoriamente y tomar los primeros 3
    const productosAleatorios = productosVisibles
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: parseFloat(producto.precio),
        rutaImg: producto.rutaImg,
        categoria: producto.categoria || 'General',
        stock: producto.stock || 0,
        visible: producto.visible === true || producto.visible === 1,
      }))

    productosDestacados.value = productosAleatorios
  } catch (err) {
    console.error('Error al cargar productos:', err)
    error.value = 'No pudimos cargar los productos. Por favor, intenta de nuevo más tarde.'
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
  cargarValoracionesDestacadas()
})
</script>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
