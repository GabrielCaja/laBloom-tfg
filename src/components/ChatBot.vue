<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Botón del chat (cerrado) -->
    <button
      v-if="!chatAbierto"
      @click="abrirChat"
      class="bg-green-700 hover:bg-green-800 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110"
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
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    </button>

    <!-- Ventana de chat (abierta) -->
    <div
      v-if="chatAbierto"
      class="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col transition-all duration-300 animate-fadeIn"
      style="height: 450px"
    >
      <!-- Encabezado del chat -->
      <div
        class="bg-gradient-to-r from-green-700 to-green-800 text-white px-4 py-3 rounded-t-lg flex justify-between items-center"
      >
        <div class="flex items-center">
          <div class="bg-white rounded-full p-1 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h3 class="font-medium">Asistente LaBloom</h3>
        </div>
        <button @click="cerrarChat" class="hover:bg-green-800 rounded p-1">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mensajes del chat -->
      <div class="flex-1 p-4 overflow-y-auto" ref="mensajesContainer">
        <div v-for="(mensaje, index) in mensajes" :key="index" class="mb-3">
          <div
            :class="[
              'rounded-lg px-4 py-2 max-w-3/4',
              mensaje.tipo === 'bot'
                ? 'bg-green-50 text-green-800 mr-auto border border-green-200'
                : 'bg-green-700 text-white ml-auto',
            ]"
          >
            {{ mensaje.texto }}
          </div>
        </div>
        <div v-if="esperandoRespuesta" class="flex items-center mb-3">
          <div class="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
            <div class="flex space-x-1">
              <div class="bg-green-700 rounded-full w-2 h-2 animate-bounce"></div>
              <div
                class="bg-green-700 rounded-full w-2 h-2 animate-bounce"
                style="animation-delay: 0.2s"
              ></div>
              <div
                class="bg-green-700 rounded-full w-2 h-2 animate-bounce"
                style="animation-delay: 0.4s"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Entrada de mensajes -->
      <div class="border-t border-gray-200 p-3">
        <form @submit.prevent="enviarMensaje" class="flex items-center">
          <input
            v-model="nuevoMensaje"
            type="text"
            placeholder="Escribe tu pregunta..."
            class="flex-1 border border-gray-300 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <button
            type="submit"
            class="bg-green-700 hover:bg-green-800 text-white rounded-r-lg py-2 px-4 transition-colors"
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
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, nextTick } from 'vue'

const chatAbierto = ref(false)
const nuevoMensaje = ref('')
const mensajes = ref([])
const mensajesContainer = ref(null)
const esperandoRespuesta = ref(false)

//Mensaje de bienvenida cuando se abre el chat
watch(chatAbierto, (nuevo) => {
  if (nuevo) {
    mensajes.value = [
      {
        tipo: 'bot',
        texto: '👋 ¡Hola! Soy el asistente virtual de LaBloom. ¿En qué puedo ayudarte hoy?',
      },
    ]
  }
})

//Función para abrir el chat
const abrirChat = () => {
  chatAbierto.value = true
}

//Función para cerrar el chat
const cerrarChat = () => {
  chatAbierto.value = false
  mensajes.value = []
  nuevoMensaje.value = ''
}

//Hacer scroll hacia abajo en los mensajes
watch(mensajes, () => {
  nextTick(() => {
    if (mensajesContainer.value) {
      mensajesContainer.value.scrollTop = mensajesContainer.value.scrollHeight
    }
  })
})

//Enviar mensaje y recibir respuesta
const enviarMensaje = async () => {
  if (nuevoMensaje.value.trim() === '') return

  //Añadir mensaje del usuario
  mensajes.value.push({
    tipo: 'usuario',
    texto: nuevoMensaje.value,
  })

  const consulta = nuevoMensaje.value.toLowerCase()
  nuevoMensaje.value = ''

  //Mostrar indicador de escritura
  esperandoRespuesta.value = true

  //Simular tiempo de respuesta
  setTimeout(() => {
    esperandoRespuesta.value = false

    //Respuestas predefinidas basadas en palabras clave
    if (consulta.includes('envío') || consulta.includes('entrega') || consulta.includes('llega')) {
      mensajes.value.push({
        tipo: 'bot',
        texto:
          'Los pedidos nacionales llegan en 3-5 días hábiles. Los internacionales pueden demorar entre 7-14 días.',
      })
    } else if (
      consulta.includes('pago') ||
      consulta.includes('tarjeta') ||
      consulta.includes('paypal')
    ) {
      mensajes.value.push({
        tipo: 'bot',
        texto:
          'Aceptamos tarjetas de crédito (Visa, MasterCard, American Express), PayPal y transferencia bancaria.',
      })
    } else if (
      consulta.includes('devolver') ||
      consulta.includes('devolución') ||
      consulta.includes('devuelvo')
    ) {
      mensajes.value.push({
        tipo: 'bot',
        texto:
          'Ofrecemos devoluciones en un plazo de 30 días desde la recepción. El producto debe estar en su estado original.',
      })
    } else if (
      consulta.includes('contacto') ||
      consulta.includes('teléfono') ||
      consulta.includes('email')
    ) {
      mensajes.value.push({
        tipo: 'bot',
        texto:
          'Puedes contactarnos por correo electrónico a info@ejemplo.com o por teléfono al +34 900 123 456 de lunes a viernes de 9:00 a 18:00.',
      })
    } else {
      mensajes.value.push({
        tipo: 'bot',
        texto:
          'No tengo información específica sobre eso. ¿Puedo ayudarte con algo más sobre envíos, pagos, devoluciones o contacto?',
      })
    }
  }, 1000)
}
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
