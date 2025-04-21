<template>
  <Navbar />
  <!-- Breadcrumbs -->
  <div class="bg-gray-100 py-2">
    <div class="container mx-auto px-4">
      <div class="flex items-center text-sm text-gray-600">
        <router-link to="/" class="hover:text-indigo-600">Inicio</router-link>
        <span class="mx-2">/</span>
        <span class="font-medium text-gray-800">Carrito</span>
      </div>
    </div>
  </div>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-light text-center mb-8 text-gray-800">Carrito de Compras</h1>

    <transition name="fade" mode="out-in">
      <div v-if="items.length === 0" class="text-center py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-24 w-24 mx-auto text-gray-300 mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p class="text-gray-500 mb-6">Tu carrito está vacío</p>
        <router-link
          to="/productos"
          class="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors transform hover:scale-105 duration-200"
        >
          Seguir comprando
        </router-link>
      </div>

      <div v-else class="space-y-6">
        <transition-group name="list" tag="div" class="space-y-6">
          <div
            v-for="(item, index) in items"
            :key="item.id"
            class="flex flex-col sm:flex-row items-center p-6 border border-gray-100 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
          >
            <img :src="item.imagen" :alt="item.nombre" class="w-24 h-24 object-cover rounded-md" />
            <div class="flex-grow ml-0 sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
              <h3 class="font-medium text-gray-800 text-lg">{{ item.nombre }}</h3>
              <p class="text-gray-600">{{ formatPrice(item.precio) }}€</p>
            </div>
            <div class="flex items-center space-x-2 mt-4 sm:mt-0">
              <button
                @click="decrementarCantidad(index)"
                class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span class="w-8 text-center">{{ item.cantidad }}</span>
              <button
                @click="incrementarCantidad(index)"
                class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
            <div class="ml-4 mt-4 sm:mt-0">
              <p class="font-semibold text-gray-800">
                {{ formatPrice(item.precio * item.cantidad) }}€
              </p>
            </div>
            <button
              @click="eliminarProducto(item.producto_id)"
              class="ml-4 text-gray-400 hover:text-red-500 transition-colors mt-4 sm:mt-0"
              title="Eliminar producto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </transition-group>

        <!-- Resumen del carrito -->
        <div class="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h2 class="text-xl font-medium text-gray-800 mb-4">Resumen de tu pedido</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>{{ formatPrice(subtotal) }}€</span>
            </div>
            <div class="flex justify-between">
              <span>IVA (21%)</span>
              <span>{{ formatPrice(iva) }}€</span>
            </div>
            <div class="border-t border-gray-200 mt-2 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>{{ formatPrice(total) }}€</span>
            </div>
          </div>

          <button
            @click="procesarPedido"
            class="w-full mt-6 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors transform hover:scale-[1.02] duration-200 flex items-center justify-center"
          >
            Proceder al pago
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CarritoService from '@/services/CarritoService'
import { useToast } from 'vue-toastification'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const toast = useToast()

//Estados
const items = ref([])
const loading = ref(false)
const error = ref(null)
const direccionEnvio = ref('')
const procesandoPedido = ref(false)
const userId = ref(1) // Deberías obtener esto de tu sistema de autenticación

//Obtener el carrito desde la API
const cargarCarrito = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await CarritoService.getCarrito()

    if (response && response.productos) {
      //Transformamos los productos recibidos al formato que espera el componente
      items.value = response.productos.map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        precio: parseFloat(producto.precio_actual || producto.precio),
        cantidad: producto.cantidad,
        imagen: producto.rutaImg,
        producto_id: producto.producto_id,
      }))
    } else {
      items.value = []
    }
  } catch (err) {
    console.error(err)
    error.value = 'Error al cargar el carrito'
    toast.error('No se pudo cargar el carrito')
  } finally {
    loading.value = false
  }
}

//Funciones para manipular cantidades
const incrementarCantidad = async (index) => {
  try {
    const item = items.value[index]
    await CarritoService.actualizarProducto(item.producto_id, item.cantidad + 1)
    //Recargar el carrito para obtener datos actualizados
    await cargarCarrito()
    toast.success('Cantidad actualizada')
  } catch (err) {
    console.error(err)
    toast.error('No se pudo actualizar la cantidad')
  }
}

const decrementarCantidad = async (index) => {
  try {
    const item = items.value[index]
    if (item.cantidad > 1) {
      await CarritoService.actualizarProducto(item.producto_id, item.cantidad - 1)
      await cargarCarrito()
      toast.success('Cantidad actualizada')
    }
  } catch (err) {
    console.error(err)
    toast.error('No se pudo actualizar la cantidad')
  }
}

const eliminarProducto = async (idProductoCarrito) => {
  try {
    await CarritoService.eliminarProducto(idProductoCarrito)
    await cargarCarrito()
    toast.success('Producto eliminado del carrito')
  } catch (err) {
    console.error(err)
    toast.error('No se pudo eliminar el producto')
  }
}

//Calculos para el resumen
const subtotal = computed(() => {
  return items.value.reduce((total, item) => total + item.precio * item.cantidad, 0)
})

const iva = computed(() => {
  return subtotal.value * 0.21
})

const total = computed(() => {
  return subtotal.value + iva.value
})

//Formatear precio con 2 decimales
const formatPrice = (price) => {
  return price.toFixed(2)
}

//Procesar el pedido
const procesarPedido = async () => {
  if (!direccionEnvio.value) {
    toast.warning('Por favor, ingresa una dirección de envío')
    return
  }

  try {
    procesandoPedido.value = true
    const response = await CarritoService.procesarPedido(userId.value, direccionEnvio.value)

    toast.success('¡Pedido procesado correctamente!')
    router.push({
      path: '/pedido-confirmado',
      query: { orderId: response.orden_id },
    })
  } catch (err) {
    console.error(err)
    toast.error('Error al procesar el pedido. Por favor, inténtalo de nuevo.')
  } finally {
    procesandoPedido.value = false
  }
}

//Cargar el carrito al montar el componente
onMounted(() => {
  cargarCarrito()
})
</script>

<style scoped>
/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
