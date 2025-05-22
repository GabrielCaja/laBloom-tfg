<template>
  <footer class="bg-gray-100 py-6 mt-auto">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p class="text-gray-600 text-sm">© 2024 LaBloom. Todos los derechos reservados.</p>
        </div>
        <div class="flex space-x-6">
          <router-link
            to="/sobre-nosotros"
            class="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sobre nosotros
          </router-link>
          <router-link to="/contacto" class="text-gray-600 hover:text-gray-900 transition-colors">
            Contacto
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
