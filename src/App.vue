<template>
  <Navbar />
  <div class="grid grid-cols-1 gap-4 p-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <Card
      :name="'Flor'"
      :description="'Descripción de la flor'"
      :price="10"
      :image="'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b'"
    />
    <Card
      :name="'Flor'"
      :description="'Descripción de la flor'"
      :price="10"
      :image="'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b'"
    />
    <Card
      :name="'Flor'"
      :description="'Descripción de la flor'"
      :price="10"
      :image="'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b'"
    />
    <Card
      :name="'Flor'"
      :description="'Descripción de la flor'"
      :price="10"
      :image="'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b'"
    />
    <Card
      :name="'Flor'"
      :description="'Descripción de la flor'"
      :price="10"
      :image="'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b'"
    />
    <Card
      :name="'Flor'"
      :description="'Descripción de la flor'"
      :price="10"
      :image="'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b'"
    />
    <Card
      :name="'Flor'"
      :description="'Descripción de la flor'"
      :price="10"
      :image="'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b'"
    />
    <Card
      :name="'Flor'"
      :description="'Descripción de la flor'"
      :price="10"
      :image="'https://images.unsplash.com/photo-1612838320302-4b3b3b3b3b3b'"
    />
  </div>
  <Footer />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Card from './components/Card.vue'
</script>

<style scoped></style>
