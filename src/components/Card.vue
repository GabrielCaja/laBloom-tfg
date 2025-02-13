<template>
  <div class="card-container">
    <div
      class="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
    >
      <!-- Imagen con overlay -->
      <div class="relative h-48">
        <img class="w-full h-full object-cover" :src="imagen" :alt="imagen" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <!-- Contenido -->
      <div class="p-5">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-gray-800">{{ nombre }}</h3>
        </div>

        <!-- Sistema de valoración -->
        <div class="flex items-center mb-3">
          <div class="flex text-yellow-400">
            <span v-for="i in 5" :key="i" class="cursor-pointer">
              <svg
                :class="i <= rating ? 'text-yellow-400' : 'text-gray-300'"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </span>
          </div>
          <span class="ml-2 text-sm text-gray-600">{{ rating }} de 5</span>
        </div>

        <p class="text-gray-600 mb-4">
          {{ descripcion }}
        </p>

        <!-- Footer con botones -->
        <div class="flex items-center justify-between pt-3 border-t border-gray-100">
          <span class="px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
            {{ precio }} €
          </span>
          <button
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transform hover:scale-105 transition-transform duration-200"
            @click="addCart"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  nombre: String,
  descripcion: String,
  precio: Number,
  imagen: String,
})

const addCart = () => {
  console.log('Producto añadido al carrito')
}
</script>

<style scoped>
.card-container {
  width: 320px;
  margin: 1rem;
}

.card-container:hover img {
  transform: scale(1.05);
  transition: transform 0.6s ease;
}
</style>
