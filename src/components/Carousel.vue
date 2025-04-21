<template>
  <div class="relative overflow-hidden w-full h-[500px] lg:h-[600px]">
    <!-- Slides -->
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="absolute inset-0 transition-opacity duration-1000"
      :class="index === currentSlide ? 'opacity-100' : 'opacity-0'"
    >
      <img
        :src="slide.image"
        :alt="slide.alt"
        class="w-full h-full object-cover"
        :style="{ objectPosition: slide.position || 'center' }"
      />
    </div>

    <!-- Controles de navegación -->
    <div class="absolute inset-0 flex items-center justify-between px-4">
      <button
        @click="prevSlide"
        class="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 focus:outline-none z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        @click="nextSlide"
        class="bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 focus:outline-none z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Indicadores -->
    <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="currentSlide = index"
        class="w-3 h-3 rounded-full focus:outline-none transition-colors duration-300"
        :class="index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Datos de ejemplo para el carousel - puedes adaptarlos según tus necesidades
const slides = ref([
  {
    image:
      'https://images.unsplash.com/photo-1527061011720-61c5f3757f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    alt: 'Arreglos florales LaBloom',
    position: 'center',
  },
  {
    image:
      'https://images.unsplash.com/photo-1561178275-9edbd6110b78?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    alt: 'Flores frescas',
    position: 'center',
  },
  {
    image:
      'https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    alt: 'Diseño floral',
    position: 'center',
  },
])

const currentSlide = ref(0)
let timer = null

// Funciones para controlar el carousel
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

// Autoplay
onMounted(() => {
  timer = setInterval(nextSlide, 5000) // Cambia cada 5 segundos
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
