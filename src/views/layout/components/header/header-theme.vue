<template>
  <hm-popover>
    <template #reference>
      <hm-svg-icon
        :name="themeIconName"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      ></hm-svg-icon>
    </template>

    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in themeArr"
        :key="item.id"
        @click="handleHeaderTheme(item)"
      >
        <hm-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></hm-svg-icon>
        <span class="text-zinc-800 dark:text-zinc-300 text-sm">
          {{ item.name }}
        </span>
      </div>
    </div>
  </hm-popover>
</template>

<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'
import { useStore } from 'vuex'
import { computed } from 'vue'

// 构建渲染数据源
const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
]

/**
 * 主题切换实现思路
 * 1. 监听主题切换行为
 * 2. 根据行为保存当前需要展示的主题到 vuex 中
 * 3. 根据 vuex 中保存的当前主题，展示 header-theme 下的显示图标
 * 4. 根据 vuex 中保存的当前主题，修改 html 的class
 */
const store = useStore()
const handleHeaderTheme = (item) => {
  store.commit('theme/setThemeType', item.type)
}
// 获取当前主题图标
const themeIconName = computed(() => {
  const currentTheme = themeArr.find(
    (item) => item.type === store.getters.themeType
  )
  return currentTheme?.icon
})
</script>

<style lang="scss" scoped></style>
