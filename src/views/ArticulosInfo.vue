<template>
  <Navbar />
  <!-- Breadcrumbs -->
  <div class="bg-gray-100 py-2">
    <div class="container mx-auto px-4">
      <div class="flex items-center text-sm text-gray-600">
        <router-link to="/" class="hover:text-indigo-600">Inicio</router-link>
        <span class="mx-2">/</span>
        <router-link to="/blog" class="hover:text-indigo-600">Blog</router-link>
        <span class="mx-2">/</span>
        <span class="font-medium text-gray-800">{{ articulo?.titulo || 'Artículo' }}</span>
      </div>
    </div>
  </div>

  <div class="bg-gray-50 min-h-screen py-10">
    <div class="container mx-auto px-4">
      <!-- Estado de carga -->
      <div v-if="cargando" class="flex flex-col items-center justify-center py-16">
        <div
          class="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-xl text-gray-600">Cargando artículo...</p>
      </div>

      <!-- Estado de error -->
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
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-red-800">{{ error }}</p>
        </div>
      </div>

      <!-- Contenido del artículo -->
      <div v-else-if="articulo" class="max-w-4xl mx-auto">
        <!-- Cabecera del artículo -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <!-- Imagen destacada -->
          <div class="relative">
            <img
              :src="articulo.rutaImg || 'https://via.placeholder.com/1200x600?text=LaBloom+Blog'"
              :alt="articulo.titulo"
              class="w-full h-80 object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          <!-- Contenido principal -->
          <div class="p-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ articulo.titulo }}</h1>

            <!-- Metadatos -->
            <div class="flex items-center text-sm text-gray-500 mb-6">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>Publicado el {{ formatearFecha(articulo.created_at) }}</span>
              </div>

              <div
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
                <span class="italic">Actualizado el {{ formatearFecha(articulo.updated_at) }}</span>
              </div>
            </div>

            <!-- Contenido completo del artículo -->
            <div class="prose prose-indigo max-w-none">
              <p>{{ articulo.contenido }}</p>
            </div>

            <!-- Compartir en redes sociales -->
            <div class="mt-8 pt-6 border-t border-gray-100">
              <h3 class="text-sm font-medium text-gray-600 mb-3">Comparte este artículo:</h3>
              <div class="flex space-x-3">
                <button
                  @click="compartirEnFacebook"
                  class="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Compartir en Facebook"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"
                    />
                  </svg>
                </button>

                <button
                  @click="compartirEnWhatsApp"
                  class="text-gray-400 hover:text-green-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Compartir por WhatsApp"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"
                    />
                  </svg>
                </button>
                <button
                  @click="copiarEnlace"
                  class="text-gray-400 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Copiar enlace"
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
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const toast = useToast()

const articulo = ref(null)
const cargando = ref(true)
const error = ref(null)

//Cargar datos al montar el componente
onMounted(() => {
  cargarArticulo()
})

//Caraga el artiuclo individual
const cargarArticulo = async () => {
  const id = route.params.id

  if (!id) {
    error.value = 'ID de artículo no válido'
    cargando.value = false
    return
  }

  try {
    cargando.value = true
    error.value = null

    const respuesta = await axios.get(`http://88.198.109.171:8000/api/articulo/${id}/`)

    articulo.value = respuesta.data
  } catch (err) {
    console.error('Error al cargar el artículo:', err)
    error.value =
      'No pudimos cargar la información del artículo. Por favor, inténtalo de nuevo más tarde.'
  } finally {
    cargando.value = false
  }
}

//Formatear las fechas
const formatearFecha = (fechaStr) => {
  const fecha = new Date(fechaStr)
  return fecha.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

//Funciones para compartir en redes sociales
const compartirEnFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const compartirEnWhatsApp = () => {
  const url = encodeURIComponent(window.location.href)
  const titulo = encodeURIComponent(articulo.value?.titulo || 'Artículo interesante')
  window.open(`https://wa.me/?text=${titulo} ${url}`, '_blank')
}

const copiarEnlace = () => {
  navigator.clipboard.writeText(window.location.href)
  toast.success('Enlace copiado al portapapeles')
}
</script>

<style scoped>
/* Estilos específicos para esta vista */
.prose {
  max-width: 65ch;
  color: #374151;
  line-height: 1.75;
}

.prose p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
</style>
