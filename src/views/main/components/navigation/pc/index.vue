<template>
  <div
    class="bg-white dark:bg-zinc-800 duration-500 sticky top-0 left-0 w-full z-10"
  >
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']"
    >
      <!-- lg 下展开箭头 -->
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="triggerState"
      >
        <hm-svg-icon
          :name="isOpenCategory ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></hm-svg-icon>
      </div>
      <!-- category item -->
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 last:mr-4 text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
        :class="{
          'text-zinc-900 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-900':
            currentIndex == index
        }"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

/**
 * 状态切换处理
 */
const isOpenCategory = ref(false)
const triggerState = () => {
  isOpenCategory.value = !isOpenCategory.value
}

/**
 * 选中状态处理
 */
const currentIndex = ref(0)
const onItemClick = (index) => {
  currentIndex.value = index
}
</script>

<style lang="scss" scoped></style>
