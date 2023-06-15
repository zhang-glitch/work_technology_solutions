<template>
  <div class="w-full">
    <hm-search v-model:searchValue="searchValue" @handleInput="handleInput">
      <template #dropdown>
        <div>1111</div>
      </template>
    </hm-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchValue = ref('')

const handleInput = () => {
  console.log('=====')
}
</script>

<style scoped></style>
