<template>
  <div class="bg-white dark:bg-zinc-900 duration-500 sticky top-0 left-0 z-10">
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
      ref="ulTarget"
    >
      <!-- 汉堡按钮 -->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc"
        @click="isOpenPopup = !isOpenPopup"
      >
        <hm-svg-icon class="w-1.5 h-1.5" name="hamburger"></hm-svg-icon>
      </li>

      <!-- 滑块 -->
      <li
        class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"
        :style="sliderStyle"
      ></li>

      <!-- category item -->
      <li
        v-for="(item, index) in categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{
          'text-zinc-100 ': currentCategoryIndex === index
        }"
        :ref="setItemRef"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>

    <!-- 弹出框 -->
    <hm-popup v-model:isOpenPopup="isOpenPopup">
      <menu-vue
        :categorys="categorys"
        @handleItem="onItemClick"
        :currentCategoryIndex="currentCategoryIndex"
    /></hm-popup>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUpdate } from 'vue'
import { useScroll } from '@vueuse/core'
// import MenuVue from '@/views/main/components/menu/index.vue'
import { useStore } from 'vuex'
import { getCategoryList } from '@/api/category'
import MenuVue from '../../menu/index.vue'

const store = useStore()

const categorys = ref([])
const currentCategoryIndex = ref(0)

const getCategoryData = async () => {
  const res = await getCategoryList()
  categorys.value = [{ id: 'all', name: '全部' }, ...res.categorys]
}

getCategoryData()

// 滑块
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

// 获取填充的所有 item 元素
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}
// onBeforeUpdate(() => {
//   itemRefs = []
// })
// 获取 ul 元素，以计算偏移位置
const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)
watch(currentCategoryIndex, (val) => {
  // 获取选中元素的 left、width
  const { left, width } = itemRefs[val].getBoundingClientRect()

  // 为 sliderStyle 设置属性
  sliderStyle.value = {
    // ul 横向滚动位置 + 当前元素的 left 偏移量
    transform: `translateX(${ulScrollLeft.value + left - 10 + 'px'})`,
    // 阴影的宽度刚好设置该元素的宽度
    width: width + 'px'
  }
})

// popup 展示
const isOpenPopup = ref(false)
// item 点击事件
const onItemClick = (index) => {
  currentCategoryIndex.value = index
  isOpenPopup.value = false
}
</script>

<style lang="scss" scoped></style>
