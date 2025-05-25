<template>
  <Navbar></Navbar>
  <!-- Breadcumbs -->
  <div class="bg-gray-50 border-b border-gray-200">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center text-sm text-gray-500">
        <router-link to="/" class="hover:text-indigo-600 transition-colors">
          <span class="flex items-center"> Inicio </span>
        </router-link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 mx-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="font-medium text-gray-900">Condiciones de Uso</span>
      </div>
    </div>
  </div>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <!-- Title Section -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6"
        >
          <svg
            class="w-8 h-8 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Condiciones de Uso</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Términos y condiciones para el uso de LaBloom
        </p>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="p-8 space-y-8">
          <!-- Section 1 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span class="text-indigo-600 font-semibold text-sm">1</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Aceptación de Términos</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              Al acceder y utilizar LaBloom, aceptas estar sujeto a estos términos y condiciones. Si
              no estás de acuerdo, por favor no utilices nuestra plataforma.
            </p>
          </section>

          <!-- Section 2 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span class="text-indigo-600 font-semibold text-sm">2</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Uso Permitido</h2>
            </div>
            <div class="ml-11 space-y-3">
              <p class="text-gray-700 leading-relaxed">
                LaBloom está destinado para uso personal. Te comprometes a:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span class="text-gray-700">Usar la plataforma responsablemente</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span class="text-gray-700">Respetar las leyes aplicables</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span class="text-gray-700">Mantener la seguridad de tu cuenta</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <span class="text-gray-700">No interferir con el servicio</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 3 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span class="text-indigo-600 font-semibold text-sm">3</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Privacidad y Datos</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              Protegemos tu privacidad. Los datos personales se manejan conforme a nuestra política
              de privacidad y regulaciones de protección de datos aplicables.
            </p>
          </section>

          <!-- Section 4 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span class="text-indigo-600 font-semibold text-sm">4</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Propiedad Intelectual</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              Todo el contenido de LaBloom, incluyendo textos, imágenes y logos, está protegido por
              derechos de autor y leyes de propiedad intelectual.
            </p>
          </section>

          <!-- Section 5 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span class="text-indigo-600 font-semibold text-sm">5</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Limitación de Responsabilidad</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              LaBloom se proporciona "tal como está". No garantizamos que esté libre de errores o
              que funcione sin interrupciones.
            </p>
          </section>

          <!-- Section 6 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span class="text-indigo-600 font-semibold text-sm">6</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Modificaciones</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              Nos reservamos el derecho de modificar estos términos. Los cambios entrarán en vigor
              inmediatamente tras su publicación.
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'

const router = useRouter()
const fechaActualizacion = ref('Enero 2024')

const volver = () => {
  router.go(-1)
}

const aceptar = () => {
  // Aquí podrías guardar la aceptación en localStorage o enviar a la API
  localStorage.setItem('terminosAceptados', 'true')

  // Mostrar confirmación más elegante
  const confirmacion = document.createElement('div')
  confirmacion.className =
    'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
  confirmacion.textContent = '✓ Términos aceptados'
  document.body.appendChild(confirmacion)

  setTimeout(() => {
    confirmacion.remove()
    router.push('/')
  }, 1500)
}
</script>
