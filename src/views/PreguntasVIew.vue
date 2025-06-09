<template>
  <Navbar />
  <!-- Breadcumbs -->
  <div class="bg-gray-50 border-b border-gray-200">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center text-sm text-gray-500">
        <router-link to="/" class="hover:text-green-600 transition-colors">
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
        <span class="font-medium text-gray-900">Preguntas Frecuentes</span>
      </div>
    </div>
  </div>

  <!-- Sección héroe con imagen de fondo -->
  <div class="relative bg-gradient-to-r from-green-600 to-green-700 py-16">
    <div class="absolute inset-0 opacity-20 bg-patron"></div>
    <div class="container mx-auto px-4 relative z-10">
      <h1 class="text-4xl md:text-5xl font-extrabold text-white text-center mb-4">
        Preguntas Frecuentes
      </h1>
      <p class="text-xl text-green-100 text-center max-w-2xl mx-auto">
        Todo lo que necesitas saber sobre nuestros productos y servicios
      </p>
    </div>
  </div>

  <!-- Categoría de preguntas -->
  <div class="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Buscador -->
      <div class="mb-10">
        <div class="relative">
          <input
            v-model="textoBusqueda"
            type="text"
            placeholder="Buscar pregunta..."
            class="w-full py-3 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400 absolute right-3 top-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Categorías -->
      <div class="mb-8 flex flex-wrap gap-2 justify-center">
        <button
          @click="categoriaActiva = 'todas'"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="
            categoriaActiva === 'todas'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
        >
          Todas
        </button>
        <button
          v-for="(categoria, indice) in categorias"
          :key="indice"
          @click="categoriaActiva = categoria.id"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="
            categoriaActiva === categoria.id
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
        >
          {{ categoria.nombre }}
        </button>
      </div>

      <!-- Preguntas -->
      <div class="space-y-5">
        <div
          v-for="(pregunta, indice) in preguntasFiltradas"
          :key="indice"
          class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-md"
          :class="{ 'shadow-md ring-2 ring-green-500 ring-opacity-50': pregunta.abierta }"
        >
          <button
            @click="alternarPregunta(indice)"
            class="flex justify-between items-center w-full text-left p-5 focus:outline-none"
          >
            <h2 class="text-lg font-medium text-gray-900 pr-8">{{ pregunta.pregunta }}</h2>
            <div
              class="flex-shrink-0 h-8 w-8 rounded-full bg-green-50 flex items-center justify-center transition-transform duration-300"
              :class="{ 'bg-green-100 text-green-600': pregunta.abierta }"
            >
              <svg
                class="h-5 w-5 transition-transform duration-300"
                :class="{
                  'rotate-180 text-green-600': pregunta.abierta,
                  'text-gray-500': !pregunta.abierta,
                }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </button>
          <transition
            enter-active-class="transition-all duration-300 ease-in-out max-h-96"
            enter-from-class="max-h-0 opacity-0"
            leave-active-class="transition-all duration-200 ease-in-out max-h-0 opacity-0"
            leave-from-class="max-h-96"
          >
            <div v-if="pregunta.abierta" class="px-5 pb-5">
              <div class="pt-3 border-t border-gray-100">
                <p class="text-gray-600">{{ pregunta.respuesta }}</p>
                <div
                  v-if="pregunta.infoAdicional"
                  class="mt-4 p-3 bg-green-50 rounded-lg text-green-700 text-sm"
                >
                  <div class="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{{ pregunta.infoAdicional }}</span>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Sin resultados -->
      <div v-if="preguntasFiltradas.length === 0" class="text-center py-12">
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
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="text-lg font-medium text-gray-900">No se encontraron resultados</h3>
        <p class="text-gray-500 mt-1">Intenta con otra búsqueda o categoría</p>
      </div>
    </div>

    <!-- Seccion de Contacto -->
    <div
      class="max-w-4xl mx-auto mt-16 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-sm"
    >
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">¿No has encontrado lo que buscabas?</h2>
        <p class="text-gray-600 mt-2">
          Nuestro equipo de atención al cliente está listo para ayudarte
        </p>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="flex items-center p-4 bg-white rounded-lg shadow-sm">
          <div class="bg-green-100 p-3 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Correo Electrónico</h3>
            <p class="text-green-600 mt-1">info@labloom.com</p>
          </div>
        </div>
        <div class="flex items-center p-4 bg-white rounded-lg shadow-sm">
          <div class="bg-green-100 p-3 rounded-full mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Teléfono</h3>
            <p class="text-green-600 mt-1">+34 623 236 31</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'

//Categorías para filtrar las preguntas
const categorias = [
  { id: 'pedidos', nombre: 'Pedidos' },
  { id: 'pagos', nombre: 'Pagos' },
  { id: 'envios', nombre: 'Envíos' },
  { id: 'devoluciones', nombre: 'Devoluciones' },
  { id: 'contacto', nombre: 'Contacto' },
]

const categoriaActiva = ref('todas')
const textoBusqueda = ref('')

const preguntas = ref([
  {
    pregunta: '¿Cómo puedo realizar un pedido?',
    respuesta:
      'Para realizar un pedido, simplemente navega a nuestra página de productos, selecciona los artículos que deseas y añádelos a tu carrito. Cuando estés listo para finalizar, ve a tu carrito y sigue los pasos para completar la compra.',
    abierta: false,
    categoria: 'pedidos',
    infoAdicional: 'Recuerda crear una cuenta para un proceso más rápido en futuros pedidos.',
  },
  {
    pregunta: '¿Cuáles son los métodos de pago aceptados?',
    respuesta:
      'Aceptamos tarjetas de crédito (Visa, MasterCard, American Express) Todos nuestros métodos de pago son seguros y están protegidos con la última tecnología de encriptación.',
    abierta: false,
    categoria: 'pagos',
    infoAdicional:
      'Para pagos con transferencia bancaria, el envío se realizará después de confirmar el pago.',
  },
  {
    pregunta: '¿Cuánto tarda en llegar mi pedido?',
    respuesta:
      'El tiempo de entrega varía según tu ubicación. Normalmente, los pedidos nacionales llegan en 3-5 días hábiles, mientras que los internacionales pueden demorar entre 7-14 días. Puedes seguir el estado de tu pedido desde tu cuenta.',
    abierta: false,
    categoria: 'envios',
  },
  {
    pregunta: '¿Puedo devolver un producto?',
    respuesta:
      'Sí, ofrecemos devoluciones en un plazo de 30 días desde la recepción del pedido. El producto debe estar en su estado original y sin usar. Para iniciar una devolución, accede a tu cuenta y selecciona el pedido que deseas devolver.',
    abierta: false,
    categoria: 'devoluciones',
    infoAdicional:
      'Los gastos de envío para devoluciones son gratuitos en caso de productos defectuosos.',
  },
  {
    pregunta: '¿Cómo puedo contactar con el servicio al cliente?',
    respuesta:
      'Puedes contactarnos a través de nuestro formulario en línea, por correo electrónico a info@ejemplo.com o por teléfono al +34 632 134 456 de lunes a viernes de 9:00 a 18:00. Nuestro equipo estará encantado de ayudarte con cualquier consulta.',
    abierta: false,
    categoria: 'contacto',
  },
  {
    pregunta: '¿Qué hago si mi pedido llega dañado?',
    respuesta:
      'Si tu pedido llega dañado, por favor toma fotografías del embalaje y del producto, y contáctanos inmediatamente. Procesaremos un reemplazo o reembolso lo antes posible sin costos adicionales.',
    abierta: false,
    categoria: 'envios',
  },
  {
    pregunta: '¿Puedo modificar mi pedido después de realizarlo?',
    respuesta:
      'Puedes modificar tu pedido dentro de las primeras 2 horas después de realizarlo. Para ello, contacta con nuestro servicio de atención al cliente lo antes posible.',
    abierta: false,
    categoria: 'pedidos',
  },
])

//Filtra las preguntas según la categoría activa y la búsqueda
const preguntasFiltradas = computed(() => {
  return preguntas.value.filter((pregunta) => {
    //Filtrar por categoría
    const coincideCategoria =
      categoriaActiva.value === 'todas' || pregunta.categoria === categoriaActiva.value

    //Filtrar por búsqueda
    const coincideBusqueda =
      pregunta.pregunta.toLowerCase().includes(textoBusqueda.value.toLowerCase()) ||
      pregunta.respuesta.toLowerCase().includes(textoBusqueda.value.toLowerCase())

    return coincideCategoria && coincideBusqueda
  })
})

//Función para abrir/cerrar preguntas
const alternarPregunta = (indice: number) => {
  //Encontrar el índice correcto en el array original
  const indiceOriginal = preguntas.value.findIndex(
    (pregunta) => pregunta.pregunta === preguntasFiltradas.value[indice].pregunta,
  )
  if (indiceOriginal !== -1) {
    preguntas.value[indiceOriginal].abierta = !preguntas.value[indiceOriginal].abierta
  }
}
</script>

<style scoped>
.bg-patron {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
}
</style>
