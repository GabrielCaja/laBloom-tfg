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
        <span class="font-medium text-gray-900">Privacidad</span>
      </div>
    </div>
  </div>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <!-- Title Section -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6"
        >
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Política de Privacidad</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Cómo protegemos y utilizamos tu información personal en LaBloom
        </p>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="p-8 space-y-8">
          <!-- Section 1 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="text-green-600 font-semibold text-sm">1</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Información que Recopilamos</h2>
            </div>
            <div class="ml-11 space-y-3">
              <p class="text-gray-700 leading-relaxed">
                Recopilamos información para brindarte el mejor servicio posible:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span class="text-gray-700">Datos de registro (nombre, email)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span class="text-gray-700">Información de pedidos</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span class="text-gray-700">Datos de navegación</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span class="text-gray-700">Preferencias del usuario</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 2 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="text-green-600 font-semibold text-sm">2</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Cómo Utilizamos tu Información</h2>
            </div>
            <div class="ml-11 space-y-3">
              <p class="text-gray-700 leading-relaxed">Utilizamos tus datos únicamente para:</p>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start space-x-2">
                  <span class="text-green-500 mt-1">•</span>
                  <span>Procesar y gestionar tus pedidos</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-green-500 mt-1">•</span>
                  <span>Mejorar nuestros productos y servicios</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-green-500 mt-1">•</span>
                  <span>Enviarte comunicaciones importantes sobre tu cuenta</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-green-500 mt-1">•</span>
                  <span>Personalizar tu experiencia en la plataforma</span>
                </li>
              </ul>
            </div>
          </section>

          <!-- Section 3 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="text-green-600 font-semibold text-sm">3</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Protección de Datos</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu
              información personal contra accesos no autorizados, pérdida o alteración. Todos los
              datos se almacenan de forma segura y se transmiten utilizando protocolos de cifrado.
            </p>
          </section>

          <!-- Section 4 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="text-green-600 font-semibold text-sm">4</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Tus Derechos</h2>
            </div>
            <div class="ml-11 space-y-3">
              <p class="text-gray-700 leading-relaxed">Conforme al RGPD, tienes derecho a:</p>
              <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                  <div>✓ Acceder a tus datos personales</div>
                  <div>✓ Rectificar información incorrecta</div>
                  <div>✓ Solicitar la eliminación de datos</div>
                  <div>✓ Limitar el procesamiento</div>
                  <div>✓ Portabilidad de datos</div>
                  <div>✓ Oponerte al procesamiento</div>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 5 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="text-green-600 font-semibold text-sm">5</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Cookies y Tecnologías Similares</h2>
            </div>
            <div class="ml-11 space-y-3">
              <p class="text-gray-700 leading-relaxed">
                Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas
                para mejorar tu experiencia. Puedes gestionar las preferencias de cookies en la
                configuración de tu navegador.
              </p>
              <div class="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
                <svg
                  class="w-5 h-5 text-blue-600 flex-shrink-0"
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
                <span class="text-blue-800 text-sm">
                  Las cookies esenciales no se pueden desactivar ya que son necesarias para el
                  funcionamiento del sitio.
                </span>
              </div>
            </div>
          </section>

          <!-- Section 6 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="text-green-600 font-semibold text-sm">6</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Compartir Información</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              No vendemos, alquilamos ni compartimos tu información personal con terceros para fines
              comerciales. Solo compartimos datos cuando es necesario para procesar pedidos
              (servicios de envío) o cuando la ley lo requiere.
            </p>
          </section>

          <!-- Section 7 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="text-green-600 font-semibold text-sm">7</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Retención de Datos</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              Conservamos tu información personal durante el tiempo necesario para cumplir con los
              fines descritos en esta política, o según requieran las obligaciones legales. Los
              datos de cuenta se conservan mientras mantengas tu cuenta activa.
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
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const fechaActualizacion = ref('Enero 2024')

const volver = () => {
  router.go(-1)
}

const aceptar = () => {
  // Aquí podrías guardar la aceptación en localStorage o enviar a la API
  localStorage.setItem('politicaPrivacidadLeida', 'true')

  // Mostrar confirmación más elegante
  const confirmacion = document.createElement('div')
  confirmacion.className =
    'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
  confirmacion.textContent = '✓ Política de privacidad leída'
  document.body.appendChild(confirmacion)

  setTimeout(() => {
    confirmacion.remove()
    router.push('/')
  }, 1500)
}
</script>

<style scoped></style>
