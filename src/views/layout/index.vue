<template>
  <div class="h-screen">
    <header-vue class="h-header"></header-vue>
    <main-vue class="h-main"></main-vue>
    <floating-vue></floating-vue>
  </div>
</template>

<script setup>
import HeaderVue from './components/header/index.vue'
import floatingVue from './components/floating/index.vue'
import MainVue from './components/main/index.vue'
</script>

<style scoped></style>
