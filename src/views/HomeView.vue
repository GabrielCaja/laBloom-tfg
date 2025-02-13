<template>
  <Navbar @search-productos="searchProductos" />
  <div
    v-if="filteredProducts.length"
    class="grid grid-cols-1 gap-4 p-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <Card
      v-for="producto in filteredProducts"
      :key="producto.id"
      :nombre="producto.nombre"
      :descripcion="producto.descripcion"
      :precio="producto.precio"
      :imagen="producto.rutaImg"
    />
  </div>
  <div v-else class="p-12 text-center">Sin resultados</div>

  <Footer />
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Card from '../components/Card.vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const productos = ref([])
const searchQuery = ref('')

onMounted(() => {
  console.log('Recopilando datos...')
  axios.get('http://localhost:8000/api/producto/').then((response) => {
    console.log(response.data)
    productos.value = response.data
  })
})
const filteredProducts = computed(() => {
  if (!searchQuery.value) return productos.value
  return productos.value.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const searchProductos = (query) => {
  searchQuery.value = query
}
</script>

<style scoped></style>
