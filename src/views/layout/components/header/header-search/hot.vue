<template>
  <div class="">
    <div class="text-xs mb-1 text-zinc-400">热门精选</div>
    <div class="flex h-[140px]" v-if="hotThemeData.list.length">
      <div
        class="relative rounded w-[260px] cursor-pointer"
        :style="{
          backgroundColor: randomRGB()
        }"
      >
        <img
          v-lazy
          class="h-full w-full object-cover rounded"
          :src="hotThemeData.big.photo"
          alt=""
        />
        <p
          class="absolute bottom-0 left-0 w-full h-[45%] flex items-center backdrop-blur rounded px-1 text-white text-xs duration-300 hover:backdrop-blur-none"
        >
          # {{ hotThemeData.big.title }}
        </p>
      </div>
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          v-for="item in hotThemeData.list"
          :key="item.id"
          class="h-[45%] w-[260px] text-white text-xs relative ml-1.5 mb-1.5 rounded"
          :style="{
            backgroundColor: randomRGB()
          }"
        >
          <img
            v-lazy
            class="w-full h-full object-cover rounded"
            :src="item.photo"
          />
          <p
            class="backdrop-blur absolute top-0 left-0 w-full h-full flex items-center px-1 rounded cursor-pointer duration-300 hover:backdrop-blur-none"
          >
            # {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getHotThemes } from '@/api/list'
import randomRGB from '@/utils/color'

const hotThemeData = ref({
  big: {},
  list: []
})

const getHotThemeData = async () => {
  const { themes } = await getHotThemes()
  hotThemeData.value = {
    big: themes[0],
    list: themes.splice(1, themes.length)
  }
}

getHotThemeData()
</script>

<style scoped></style>
