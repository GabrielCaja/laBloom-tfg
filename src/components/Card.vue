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

        <p class="text-gray-600 mb-4 line-clamp-3">
          {{ descripcion }}
        </p>

        <!-- Footer con botones -->
        <div class="pt-3 border-t border-gray-100">
          <div class="flex items-center justify-between mb-3">
            <span class="px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
              {{ precio }} €
            </span>
            <router-link
              :to="`/producto/${id}`"
              class="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
            >
              Ver detalles
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </router-link>
          </div>
          <button
            @click="addCart"
            :disabled="!visible || stock <= 0"
            :class="[
              'text-sm px-3 py-1 rounded-md',
              !visible || stock <= 0
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white',
            ]"
          >
            {{ !visible || stock <= 0 ? 'No disponible' : 'Añadir al carrito' }}
          </button>
          <!-- Sistema de disponibilidad -->
          <div class="mt-2">
            <div v-if="!visible" class="text-xs text-red-600 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              No disponible
            </div>
            <div
              v-else-if="stock > 0"
              class="text-xs"
              :class="{ 'text-green-600': stock > 10, 'text-red-600': stock <= 10 }"
            >
              {{ stock > 10 ? 'En stock' : `¡Solo quedan ${stock}!` }}
            </div>
            <div v-else class="text-xs text-orange-600">Agotado</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'
import CarritoService from '@/services/CarritoService'
import { useToast } from 'vue-toastification'

const toast = useToast()
const rating = ref(4)

const props = defineProps({
  id: Number,
  nombre: String,
  descripcion: String,
  precio: Number,
  imagen: String,
  stock: {
    type: Number,
    default: 0,
  },
  visible: {
    type: Boolean,
    default: true,
  },
})

const addCart = async () => {
  try {
    if (!props.visible) {
      toast.error('Este producto no está disponible actualmente.')
      return
    }

    if (props.stock <= 0) {
      toast.error('Este producto está agotado.')
      return
    }

    // Llamamos al método del servicio para agregar el producto
    const response = await CarritoService.agregarProducto(props.id, 1)
    toast.success(`${props.nombre} añadido al carrito`)
    console.log('Producto añadido al carrito', response)
  } catch (error) {
    toast.error('No se pudo añadir el producto al carrito')
    console.error('Error al añadir producto al carrito:', error)
  }
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

/* Asegurar que la descripción tenga altura limitada */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
