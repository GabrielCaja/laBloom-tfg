<template>
  <Navbar />
  <!-- Breadcrumbs -->
  <div class="bg-gray-50 border-b border-gray-200">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center text-sm text-gray-500">
        <router-link to="/" class="hover:text-indigo-600 transition-colors">
          <span class="flex items-center">Inicio</span>
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
        <span class="font-medium text-gray-900">Contacto</span>
      </div>
    </div>
  </div>

  <!-- Sección Hero -->
  <div class="bg-gradient-to-r from-green-500 to-green-600 py-16">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">Contacta con nosotros</h1>
      <p class="text-indigo-100 max-w-xl mx-auto">
        ¿Tienes alguna pregunta o sugerencia? Estamos aquí para ayudarte. Completa el formulario y
        te responderemos lo antes posible.
      </p>
    </div>
  </div>

  <div class="bg-green-50 py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- Notificación de éxito -->
          <transition
            enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-y-2 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition ease-in duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <div
              v-if="mensajeEnviado"
              class="bg-green-50 border-l-4 border-green-500 p-4 mb-6 flex items-center"
            >
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-green-700">
                  Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo pronto.
                </p>
              </div>
            </div>
          </transition>

          <div class="grid grid-cols-1 md:grid-cols-2">
            <!-- Información de contacto -->
            <div class="bg-teal-600 p-8 text-white">
              <h2 class="text-2xl font-semibold mb-6">Información de contacto</h2>

              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-6 w-6 text-teal-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-teal-100">Calle Madrid</p>
                    <p class="text-teal-100">28290, Madrid, España</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-6 w-6 text-teal-300"
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
                  <div class="ml-4">
                    <p class="text-teal-100">info@labloom.com</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-6 w-6 text-teal-300"
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
                  <div class="ml-4">
                    <p class="text-teal-100">+34 623 232 32</p>
                  </div>
                </div>
              </div>

              <div class="mt-12">
                <h3 class="text-lg font-medium text-teal-100 mb-4">Síguenos en redes</h3>
                <div class="flex space-x-4">
                  <a href="#" class="text-teal-200 hover:text-white transition-colors">
                    <span class="sr-only">Instagram</span>
                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fill-rule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                  <a href="#" class="text-teal-200 hover:text-white transition-colors">
                    <span class="sr-only">Twitter</span>
                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                  </a>
                  <a href="#" class="text-teal-200 hover:text-white transition-colors">
                    <span class="sr-only">Facebook</span>
                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fill-rule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Formulario -->
            <div class="p-8">
              <h2 class="text-2xl font-semibold text-gray-800 mb-6">Envíanos un mensaje</h2>
              <form @submit.prevent="enviarContacto" class="space-y-5">
                <div>
                  <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    id="nombre"
                    v-model="formulario.nombre"
                    type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    :class="{ 'border-red-500 focus:ring-red-500': errores.nombre }"
                  />
                  <p v-if="errores.nombre" class="text-red-500 text-xs mt-1">
                    {{ errores.nombre[0] }}
                  </p>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    v-model="formulario.email"
                    type="email"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    :class="{ 'border-red-500 focus:ring-red-500': errores.email }"
                  />
                  <p v-if="errores.email" class="text-red-500 text-xs mt-1">
                    {{ errores.email[0] }}
                  </p>
                </div>

                <div>
                  <label for="asunto" class="block text-sm font-medium text-gray-700 mb-1">
                    Asunto
                  </label>
                  <input
                    id="asunto"
                    v-model="formulario.asunto"
                    type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    :class="{ 'border-red-500 focus:ring-red-500': errores.asunto }"
                  />
                  <p v-if="errores.asunto" class="text-red-500 text-xs mt-1">
                    {{ errores.asunto[0] }}
                  </p>
                </div>

                <div>
                  <label for="mensaje" class="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    v-model="formulario.mensaje"
                    rows="5"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    :class="{ 'border-red-500 focus:ring-red-500': errores.mensaje }"
                  ></textarea>
                  <p v-if="errores.mensaje" class="text-red-500 text-xs mt-1">
                    {{ errores.mensaje[0] }}
                  </p>
                </div>

                <div class="mt-4">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="aceptarCondiciones"
                        v-model="formulario.aceptarCondiciones"
                        type="checkbox"
                        class="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        :class="{ 'border-red-500': errores.aceptarCondiciones }"
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="aceptarCondiciones" class="text-gray-600">
                        Acepto la
                        <router-link to="/privacy-policy" class="text-teal-600 hover:underline"
                          >política de privacidad</router-link
                        >
                        y el
                        <router-link to="/aviso-legal" class="text-teal-600 hover:underline"
                          >tratamiento de mis datos personales</router-link
                        >.
                      </label>
                      <p v-if="errores.aceptarCondiciones" class="text-red-500 text-xs mt-1">
                        {{ errores.aceptarCondiciones[0] }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="pt-2">
                  <button
                    type="submit"
                    class="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex justify-center items-center"
                    :disabled="enviando"
                  >
                    <svg
                      v-if="enviando"
                      class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>{{ enviando ? 'Enviando...' : 'Enviar mensaje' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const formulario = ref({
  nombre: '',
  email: '',
  asunto: '',
  mensaje: '',
  aceptarCondiciones: false,
})

const errores = ref({})
const enviando = ref(false)
const mensajeEnviado = ref(false)

const enviarContacto = async () => {
  errores.value = {}

  // Validación manual para el checkbox
  if (!formulario.value.aceptarCondiciones) {
    errores.value.aceptarCondiciones = ['Debes aceptar la política de privacidad para continuar.']
    return
  }

  enviando.value = true

  try {
    await axios.post('http://localhost:8000/api/contacto', formulario.value)

    //Resetear formulario y mostrar mensaje de éxito
    formulario.value = {
      nombre: '',
      email: '',
      asunto: '',
      mensaje: '',
      aceptarCondiciones: false,
    }

    mensajeEnviado.value = true

    //Scroll hasta arriba para mostrar el mensaje de éxito
    window.scrollTo({ top: 0, behavior: 'smooth' })

    //Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      mensajeEnviado.value = false
    }, 5000)
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errores.value = error.response.data.errors
    } else {
      console.error('Error al enviar el formulario:', error)
    }
  } finally {
    enviando.value = false
  }
}
</script>

<style scoped></style>
