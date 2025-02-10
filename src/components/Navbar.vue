<template>
  <nav>
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0">
          <router-link
            to="/"
            class="text-gray-800 font-bold text-xl hover:-translate-y-0.5 transition-transform"
          >
            Logo
          </router-link>
        </div>

        <div class="hidden md:flex space-x-8">
          <router-link
            v-for="item in [
              'Inicio',
              'Productos',
              'Carrito',
              'Categorias',
              'Carrito',
              'Login',
              'Registro',
            ]"
            :key="item"
            :to="'/' + item.toLowerCase()"
            class="text-gray-600 hover:text-gray-900 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gray-900"
          >
            {{ item }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup></script>

<style scoped></style>
