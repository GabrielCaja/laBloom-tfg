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
        <span class="font-medium text-gray-900">Sobre Nosotros</span>
      </div>
    </div>
  </div>

  <!-- Sección Hero -->
  <div class="relative bg-gradient-to-r from-indigo-500 to-indigo-600 py-20">
    <div class="absolute inset-0 opacity-20" style=""></div>
    <div class="container mx-auto px-4 relative z-10">
      <h1 class="text-4xl md:text-5xl font-bold text-white text-center mb-4">Nuestra Historia</h1>
      <p class="text-xl text-indigo-100 text-center max-w-2xl mx-auto">
        Creando belleza floral con pasión desde 2015
      </p>
    </div>
  </div>

  <!-- Contenido Principal -->
  <div class="container mx-auto px-4 py-16">
    <!-- Nuestra Misión -->
    <div class="max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl font-light text-gray-800 mb-6 text-center">Nuestra Misión</h2>
      <p class="text-lg text-gray-600 leading-relaxed mb-8">
        En LaBloom, creemos que cada flor cuenta una historia. Nuestra misión es transformar esos
        relatos en creaciones florales que expresen emociones, celebren momentos especiales y
        embellezcan espacios. Buscamos llevar la magia de la naturaleza a tu vida cotidiana, con
        arreglos cuidadosamente diseñados que inspiren y emocionen.
      </p>
      <div class="flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1587729927069-dedd7eb118c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zmxvd2VyJTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          alt="Nuestro trabajo"
          class="rounded-lg shadow-lg w-full max-w-2xl h-80 object-cover"
        />
      </div>
    </div>

    <!-- Nuestros Valores -->
    <div class="py-16 bg-gray-50 -mx-4 px-4">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-light text-gray-800 mb-12 text-center">Nuestros Valores</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Valor 1 -->
          <div class="bg-white p-8 rounded-lg shadow-sm text-center">
            <div class="inline-block p-4 bg-indigo-50 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-gray-800 mb-3">Pasión</h3>
            <p class="text-gray-600">
              Amamos lo que hacemos y ponemos el corazón en cada creación.
            </p>
          </div>

          <!-- Valor 2 -->
          <div class="bg-white p-8 rounded-lg shadow-sm text-center">
            <div class="inline-block p-4 bg-indigo-50 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-gray-800 mb-3">Calidad</h3>
            <p class="text-gray-600">
              Seleccionamos las mejores flores y materiales para asegurar su frescura y duración.
            </p>
          </div>

          <!-- Valor 3 -->
          <div class="bg-white p-8 rounded-lg shadow-sm text-center">
            <div class="inline-block p-4 bg-indigo-50 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-gray-800 mb-3">Sostenibilidad</h3>
            <p class="text-gray-600">
              Comprometidos con prácticas responsables y el respeto al medio ambiente.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contacto CTA -->
    <div
      class="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-8 mt-16 max-w-4xl mx-auto shadow-lg"
    >
      <div class="text-center">
        <h2 class="text-2xl font-bold text-white mb-4">¿Tienes alguna consulta?</h2>
        <p class="text-indigo-100 mb-6">
          Estamos aquí para ayudarte. Contáctanos y responderemos a todas tus preguntas.
        </p>
        <router-link
          to="/contacto"
          class="inline-block px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors shadow-md"
        >
          Contactar ahora
        </router-link>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script lang="ts" setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
/* Puedes agregar estilos adicionales específicos aquí si es necesario */
</style>
