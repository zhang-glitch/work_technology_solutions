<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 font-bold mb-2 px-1">所有分类</h2>
    <ul class="overflow-y-scroll">
      <li
        v-for="(item, index) in categorys"
        :key="item.id"
        class="text-lg text-zinc-900 dark:text-zinc-300 px-1 py-1.5 duration-100 active:bg-zinc-100 active:dark:bg-zinc-900"
        :class="{
          'text-red-600': index == currentCategoryIndex ? true : false
        }"
        @click="$emit('handleItem', index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  categorys: {
    type: Array,
    required: true
  },
  currentCategoryIndex: {
    type: Number,
    required: true
  }
})

defineEmits('handleItem')
</script>

<style scoped></style>
