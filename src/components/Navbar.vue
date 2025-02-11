<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-6xl mx-auto px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center">
            <img src="/public/logo.png" alt="Logo" class="h-18 w-auto" />
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-6">
          <router-link to="/blog">Blog</router-link>
          <router-link to="/productos">Productos</router-link>
          <router-link to="/preguntas-frecuentes">Pre</router-link>

          <router-link to="/login">
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
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup></script>
