<template>
  <div id="app">
    <router-view />
    <ChatBot />
  </div>
</template>

<script lang="ts" setup>
import ChatBot from '@/components/ChatBot.vue'
</script>
