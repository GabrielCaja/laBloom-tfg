<template>
  <div class="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-gray-900 text-center mb-10">Preguntas Frecuentes</h1>

    <div class="space-y-6">
      <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200 pb-6">
        <button
          @click="toggleFaq(index)"
          class="flex justify-between items-center w-full text-left"
        >
          <h2 class="text-lg font-medium text-gray-900">{{ faq.question }}</h2>
          <svg
            class="h-5 w-5 text-gray-500 transform transition-transform duration-200"
            :class="{ 'rotate-180': faq.isOpen }"
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
        </button>
        <div v-show="faq.isOpen" class="mt-3 prose prose-sm text-gray-600">
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: '¿Cómo puedo realizar un pedido?',
    answer:
      'Para realizar un pedido, simplemente navega a nuestra página de productos, selecciona los artículos que deseas y añádelos a tu carrito. Cuando estés listo para finalizar, ve a tu carrito y sigue los pasos para completar la compra.',
    isOpen: false,
  },
  {
    question: '¿Cuáles son los métodos de pago aceptados?',
    answer:
      'Aceptamos tarjetas de crédito (Visa, MasterCard, American Express), PayPal y transferencia bancaria.',
    isOpen: false,
  },
  {
    question: '¿Cuánto tarda en llegar mi pedido?',
    answer:
      'El tiempo de entrega varía según tu ubicación. Normalmente, los pedidos nacionales llegan en 3-5 días hábiles, mientras que los internacionales pueden demorar entre 7-14 días.',
    isOpen: false,
  },
  {
    question: '¿Puedo devolver un producto?',
    answer:
      'Sí, ofrecemos devoluciones en un plazo de 30 días desde la recepción del pedido. El producto debe estar en su estado original y sin usar.',
    isOpen: false,
  },
  {
    question: '¿Cómo puedo contactar con el servicio al cliente?',
    answer:
      'Puedes contactarnos a través de nuestro formulario en línea, por correo electrónico a info@ejemplo.com o por teléfono al +34 900 123 456 de lunes a viernes de 9:00 a 18:00.',
    isOpen: false,
  },
])

const toggleFaq = (index: number) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>

<style scoped>
/* Tailwind handles most styling, but you can add custom styles here if needed */
</style>
