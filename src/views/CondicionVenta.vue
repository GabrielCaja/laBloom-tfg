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
        <span class="font-medium text-gray-900">Condiciones de Venta</span>
      </div>
    </div>
  </div>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 py-12">
      <!-- Title Section -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6"
        >
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Condiciones de Venta</h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Términos y condiciones comerciales para compras en LaBloom
        </p>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="p-8 space-y-8">
          <!-- Section 1 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Información General</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              Estas condiciones de venta regulan las relaciones contractuales entre LaBloom y sus
              clientes para la compra de productos florales a través de nuestra plataforma online.
            </p>
          </section>

          <!-- Section 2 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 font-semibold text-sm">2</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Productos y Precios</h2>
            </div>
            <div class="ml-11 space-y-3">
              <p class="text-gray-700 leading-relaxed">
                Nuestros productos están sujetos a disponibilidad:
              </p>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start space-x-2">
                  <span class="text-blue-500 mt-1">•</span>
                  <span>Los precios incluyen IVA y están expresados en euros</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-blue-500 mt-1">•</span>
                  <span>Las imágenes son orientativas y pueden variar según temporada</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-blue-500 mt-1">•</span>
                  <span>Nos reservamos el derecho a modificar precios sin previo aviso</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-blue-500 mt-1">•</span>
                  <span>Stock limitado sujeto a disponibilidad</span>
                </li>
              </ul>
            </div>
          </section>

          <!-- Section 3 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 font-semibold text-sm">3</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Proceso de Pedido</h2>
            </div>
            <div class="ml-11 space-y-3">
              <p class="text-gray-700 leading-relaxed">Para realizar un pedido debes:</p>
              <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <div class="space-y-2 text-sm text-gray-700">
                  <div class="flex items-center">
                    <span
                      class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3"
                      >1</span
                    >
                    <span>Seleccionar productos y añadir al carrito</span>
                  </div>
                  <div class="flex items-center">
                    <span
                      class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3"
                      >2</span
                    >
                    <span>Proporcionar datos de envío y facturación</span>
                  </div>
                  <div class="flex items-center">
                    <span
                      class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3"
                      >3</span
                    >
                    <span>Elegir método de pago y confirmar pedido</span>
                  </div>
                  <div class="flex items-center">
                    <span
                      class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3"
                      >4</span
                    >
                    <span>Recibir confirmación por email</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 4 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 font-semibold text-sm">4</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Métodos de Pago</h2>
            </div>
            <div class="ml-11 space-y-3">
              <p class="text-gray-700 leading-relaxed">Aceptamos los siguientes métodos de pago:</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span class="text-gray-700">Tarjetas de crédito/débito</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span class="text-gray-700">PayPal</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span class="text-gray-700">Transferencia bancaria</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span class="text-gray-700">Bizum</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 5 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 font-semibold text-sm">5</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Envío y Entrega</h2>
            </div>
            <div class="ml-11 space-y-3">
              <p class="text-gray-700 leading-relaxed">
                Información sobre nuestros servicios de entrega:
              </p>
              <div class="bg-yellow-50 p-4 rounded-lg">
                <div class="flex items-start space-x-3">
                  <svg
                    class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div class="text-sm text-yellow-800">
                    <p class="font-medium">Importante:</p>
                    <ul class="mt-1 space-y-1">
                      <li>• Envíos en 24-48h laborables</li>
                      <li>• Gastos de envío desde 4,95€</li>
                      <li>• Envío gratuito a partir de 50€</li>
                      <li>• Entrega en horario de 9:00 a 18:00</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 6 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 font-semibold text-sm">6</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Derecho de Desistimiento</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              Dispones de 14 días naturales desde la recepción del pedido para ejercer tu derecho de
              desistimiento, excepto para productos perecederos como flores frescas, que quedan
              excluidos conforme a la normativa vigente.
            </p>
          </section>

          <!-- Section 7 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 font-semibold text-sm">7</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Garantías y Reclamaciones</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              Garantizamos la calidad de nuestros productos. En caso de defectos o daños durante el
              transporte, contacta con nosotros en las primeras 24 horas tras la recepción.
              Evaluaremos cada caso de forma individual.
            </p>
          </section>

          <!-- Section 8 -->
          <section class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 font-semibold text-sm">8</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-900">Facturación</h2>
            </div>
            <p class="text-gray-700 leading-relaxed ml-11">
              Todas las compras incluyen factura electrónica que se enviará a tu correo electrónico.
              Para facturas con datos específicos de empresa, indica la información necesaria
              durante el proceso de compra.
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
  localStorage.setItem('condicionesVentaLeidas', 'true')

  // Mostrar confirmación más elegante
  const confirmacion = document.createElement('div')
  confirmacion.className =
    'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50'
  confirmacion.textContent = '✓ Condiciones de venta entendidas'
  document.body.appendChild(confirmacion)

  setTimeout(() => {
    confirmacion.remove()
    router.push('/')
  }, 1500)
}
</script>

<style scoped></style>
