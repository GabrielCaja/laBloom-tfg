<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-6xl mx-auto px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex items-center space-x-4 flex-1">
          <router-link to="/" class="flex items-center">
            <img src="/src/logo.png" alt="Logo" class="h-16 w-auto" />
          </router-link>
          <!-- Nombre de la tienda -->
          <router-link to="/" class="flex items-center">
            <span class="text-xl font-bold">LaBloom</span>
          </router-link>
        </div>

        <!-- Barra de busqueda -->
        <div class="flex-1 flex justify-center">
          <input
            v-if="mostrarBusqueda"
            v-model="searchQuery"
            @input="searchProductos"
            type="text"
            placeholder="Buscar productos..."
            class="p-2 text-black rounded border w-64"
          />
        </div>

        <!-- Navigation -->
        <div class="hidden md:flex items-center space-x-6 flex-1 justify-end">
          <router-link to="/productos" class="hover:text-gray-600">Productos</router-link>
          <router-link to="/blog" class="hover:text-gray-600">Blog</router-link>
          <router-link to="/preguntas-frecuentes" class="hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </router-link>
          <router-link v-if="!logeado" to="/login" class="hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </router-link>
          <router-link v-if="logeado" to="/perfil" class="hover:text-blue-600 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </router-link>
          <router-link v-if="logeado" to="/carrito" class="hover:text-green-600 text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </router-link>
          <!-- Selector de moneda  -->
          <div class="relative group">
            <button
              class="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              <span class="text-sm font-medium text-gray-700">{{ getCurrencySymbol }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Dropdown -->
            <div
              class="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
            >
              <div class="py-1">
                <button
                  v-for="(currency, code) in currenciesWithFlags"
                  :key="code"
                  @click="setCurrency(code)"
                  class="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                  :class="{ 'bg-blue-50 text-blue-600': currentCurrency === code }"
                >
                  <span class="mr-2">{{ currency.flag }}</span>
                  <span class="font-medium">{{ currency.symbol }} {{ code }}</span>
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="logeado"
            class="cursor-pointer hover:text-red-600 text-red-500"
            @click="logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="js" setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCurrency } from '@/composables/useCurrency'

const router = useRouter()
const route = useRoute()
const logeado = ref(false)
const searchQuery = ref('')
const { currentCurrency, currencies, setCurrency, getCurrencySymbol } = useCurrency()

const emit = defineEmits(['search-productos'])
const currenciesWithFlags = {
  EUR: { symbol: '€', rate: 1, name: 'Euro', flag: '🇪🇺' },
  USD: { symbol: '$', rate: 1.09, name: 'US Dollar', flag: '🇺🇸' },
  GBP: { symbol: '£', rate: 0.87, name: 'British Pound', flag: '🇬🇧' },
}
//Propiedad para determinar si se debe mostrar la barra de búsqueda
const mostrarBusqueda = computed(() => {
  return route.name === 'productos' || route.path === '/productos'
})

//Verificar si hay un token al cargar el componente
onMounted(() => {
  checkLoginStatus()
})

//Función para verificar el estado de login
const checkLoginStatus = () => {
  const token = localStorage.getItem('access_token')
  logeado.value = !!token
}

//Funcion para cerrar sesion
const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('es_admin')
  logeado.value = false
  router.push('/')
}

const searchProductos = () => {
  emit('search-productos', searchQuery.value)
}
</script>
