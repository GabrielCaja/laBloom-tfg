<template>
  <Navbar />

  <div class="container mx-auto px-4 py-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Finalizar Compra</h1>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-8">
      <div
        class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"
      ></div>
      <p class="mt-2">Cargando...</p>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      <p>{{ error }}</p>
      <button
        @click="$router.push('/carrito')"
        class="mt-2 bg-red-600 text-white px-4 py-2 rounded"
      >
        Volver al carrito
      </button>
    </div>

    <!-- Success -->
    <div v-else-if="paymentSucceeded" class="text-center py-8">
      <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        <h2 class="text-xl font-bold">¡Pago completado con éxito!</h2>
        <p class="mt-2">Tu pedido ha sido procesado correctamente.</p>
      </div>
      <router-link
        to="/productos"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
      >
        Seguir comprando
      </router-link>
    </div>

    <!-- Payment Form -->
    <div
      v-else-if="carritoData.productos && carritoData.productos.length > 0"
      class="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <!-- Resumen -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold mb-4">Resumen del pedido</h2>
        <div class="space-y-3">
          <div
            v-for="producto in carritoData.productos"
            :key="producto.id"
            class="flex justify-between"
          >
            <div>
              <p class="font-medium">{{ producto.nombre }}</p>
              <p class="text-sm text-gray-500">Cantidad: {{ producto.cantidad }}</p>
            </div>
            <p class="font-bold">
              {{ formatPrice((producto.precio_actual || producto.precio) * producto.cantidad) }}€
            </p>
          </div>
          <hr />
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span>{{ formatPrice(subtotal) }}€</span>
          </div>
          <div class="flex justify-between">
            <span>Envío</span>
            <span>{{ envioGratuito ? 'Gratuito' : '4.99€' }}</span>
          </div>
          <div class="flex justify-between">
            <span>IVA (21%)</span>
            <span>{{ formatPrice(iva) }}€</span>
          </div>
          <div class="flex justify-between text-xl font-bold border-t pt-2">
            <p>Total:</p>
            <p>{{ formatPrice(total) }}€</p>
          </div>
        </div>
      </div>

      <!-- Formulario de pago -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold mb-4">Información de pago</h2>

        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Información de la tarjeta
            </label>
            <!-- Elemento de Stripe con mejor estilo -->
            <div class="stripe-card-container">
              <div id="card-element"></div>
            </div>
            <div id="card-errors" class="text-red-500 text-sm mt-2"></div>
          </div>

          <button
            type="submit"
            :disabled="processing || !stripeReady"
            class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg"
          >
            <span v-if="processing">Procesando...</span>
            <span v-else-if="!stripeReady">Preparando pago...</span>
            <span v-else>Pagar {{ formatPrice(total) }}€</span>
          </button>
        </form>

        <!-- Debug info -->
        <div v-if="stripeReady" class="mt-4 text-xs text-gray-500">✅ Formulario de pago listo</div>
      </div>
    </div>

    <!-- Empty cart -->
    <div v-else class="text-center py-8">
      <p class="text-gray-500 mb-4">No hay productos en el carrito</p>
      <router-link
        to="/productos"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
      >
        Ir a la tienda
      </router-link>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()
const toast = useToast()

// Estados
const stripe = ref(null)
const cardElement = ref(null)
const carritoData = ref({ productos: [] })
const loading = ref(true)
const processing = ref(false)
const paymentSucceeded = ref(false)
const clientSecret = ref('')
const error = ref('')
const stripeReady = ref(false)

const token = localStorage.getItem('access_token')

// Configuración de envío
const costoEnvio = 4.99
const minimoEnvioGratuito = 20

// Computed
const subtotal = computed(() => {
  if (!carritoData.value.productos) return 0
  return carritoData.value.productos.reduce((sum, producto) => {
    return sum + (producto.precio_actual || producto.precio) * producto.cantidad
  }, 0)
})

const envioGratuito = computed(() => {
  return subtotal.value >= minimoEnvioGratuito
})

const costoEnvioFinal = computed(() => {
  return envioGratuito.value ? 0 : costoEnvio
})

const iva = computed(() => {
  return (subtotal.value + costoEnvioFinal.value) * 0.21
})

const total = computed(() => {
  return subtotal.value + costoEnvioFinal.value + iva.value
})

// Inicialización
onMounted(async () => {
  if (!token) {
    toast.error('Necesitas iniciar sesión')
    router.push('/login')
    return
  }

  try {
    await cargarDatos()
  } catch (err) {
    error.value = 'Error al cargar los datos'
  } finally {
    loading.value = false
  }
})

const cargarDatos = async () => {
  // 1. Cargar Stripe
  const publicKey =
    'pk_test_51RT6B9R0A0m3YVHV1lQ5vs54nYXmH5ZpspVWrKMmwALyNtTQXrP6D5un6HeM9kK17xsVX8RVQjUD8MXAZqKjqd0600LxPIZ5t1'
  stripe.value = await loadStripe(publicKey)

  // 2. Cargar carrito
  const carritoResponse = await axios.get('/api/carrito/mi-carrito', {
    headers: { Authorization: `Bearer ${token}` },
  })
  carritoData.value = carritoResponse.data || { productos: [] }

  // 3. Si hay productos, crear payment intent
  if (carritoData.value.productos?.length > 0) {
    const paymentResponse = await axios.post(
      '/api/payment/create-intent',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    clientSecret.value = paymentResponse.data.client_secret

    // 4. Esperar a que el DOM se actualice y luego configurar Stripe
    await nextTick()

    // Verificar múltiples veces si el elemento existe
    let intentos = 0
    const maxIntentos = 20

    const configurarStripeConReintentos = () => {
      const elemento = document.getElementById('card-element')

      if (elemento) {
        configurarStripe()
      } else if (intentos < maxIntentos) {
        intentos++
        console.log(`Intento ${intentos}: Elemento #card-element no encontrado, reintentando...`)
        setTimeout(configurarStripeConReintentos, 100)
      } else {
        console.error(
          'No se pudo encontrar el elemento #card-element después de múltiples intentos',
        )
        error.value = 'Error al configurar el formulario de pago'
      }
    }

    configurarStripeConReintentos()
  }
}

const configurarStripe = () => {
  try {
    console.log('Configurando Stripe Elements...')

    // Verificar que el elemento existe
    const cardElementDiv = document.getElementById('card-element')
    if (!cardElementDiv) {
      throw new Error('Elemento #card-element no encontrado')
    }

    const elements = stripe.value.elements()
    cardElement.value = elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      },
      hidePostalCode: true,
    })

    cardElement.value.mount('#card-element')

    cardElement.value.on('ready', () => {
      console.log('Stripe card element listo y funcional')
      stripeReady.value = true
    })

    cardElement.value.on('change', (event) => {
      const errorElement = document.getElementById('card-errors')
      if (errorElement) {
        if (event.error) {
          errorElement.textContent = event.error.message
        } else {
          errorElement.textContent = ''
        }
      }
    })

    cardElement.value.on('focus', () => {
      console.log('Card element focused')
    })

    cardElement.value.on('blur', () => {
      console.log('Card element blurred')
    })

    console.log('Stripe configurado correctamente')
  } catch (err) {
    console.error('Error configurando Stripe:', err)
    error.value = 'Error al configurar el pago'
  }
}

const handleSubmit = async () => {
  if (processing.value || !stripeReady.value) return

  processing.value = true

  try {
    console.log('Iniciando proceso de pago...')
    console.log('Client Secret:', clientSecret.value)

    // Verificar que tenemos todo lo necesario
    if (!stripe.value || !cardElement.value || !clientSecret.value) {
      throw new Error('Faltan datos necesarios para el pago')
    }

    // Crear el payment method con información adicional
    const { error: paymentMethodError, paymentMethod } = await stripe.value.createPaymentMethod({
      type: 'card',
      card: cardElement.value,
      billing_details: {
        name: 'Cliente', // Puedes agregar más detalles aquí si los tienes
      },
    })

    if (paymentMethodError) {
      console.error('Error creando payment method:', paymentMethodError)
      toast.error(paymentMethodError.message)
      return
    }

    console.log('Payment method creado:', paymentMethod)

    // Confirmar el pago
    const { error: confirmError, paymentIntent } = await stripe.value.confirmCardPayment(
      clientSecret.value,
      {
        payment_method: paymentMethod.id,
      },
    )

    if (confirmError) {
      console.error('Error confirmando pago:', confirmError)
      toast.error(confirmError.message)
      return
    }

    console.log('Pago confirmado:', paymentIntent)

    // Confirmar en el backend
    await axios.post(
      '/api/payment/confirm',
      {
        payment_intent_id: paymentIntent.id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    paymentSucceeded.value = true
    toast.success('¡Pago completado!')
  } catch (err) {
    console.error('Error en el proceso de pago:', err)

    // Mostrar el error específico si está disponible
    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message)
    } else if (err.message) {
      toast.error(err.message)
    } else {
      toast.error('Error al procesar el pago')
    }
  } finally {
    processing.value = false
  }
}

const formatPrice = (price) => {
  return parseFloat(price || 0).toFixed(2)
}
</script>
