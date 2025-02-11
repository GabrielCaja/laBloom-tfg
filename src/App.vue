<template>
  <Navbar />
  <div class="grid grid-cols-1 gap-4 p-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <Card v-for="producto in productos" nombre="{{producto.nombre}}" />
  </div>
  <Footer />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Card from './components/Card.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
const productos = ref([])

onMounted(() => {
  console.log('Recopilando datos...')
  axios.get('http://localhost:8000/api/producto/').then((response) => {
    console.log(response.data)
    productos.value = response.data
  })
})
</script>

<style scoped></style>
