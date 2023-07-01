<template>
  <!-- 单个的支付项 -->
  <div
    class="flex-none flex flex-col items-center w-[100px] mt-2 mr-2 py-3 border-[1px] hover:bg-orange-50 hover:border-orange-300 rounded-md relative cursor-pointer xl:w-[150px] xl:py-2"
    :class="[
      select
        ? 'bg-orange-50 dark:bg-orange-50/10 border-orange-300 '
        : 'bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-500'
    ]"
    @click="handleItemClick"
  >
    <!-- 标题 -->
    <p
      class="text-base"
      :class="[
        select
          ? 'text-yellow-800 dark:text-orange-300'
          : 'text-yellow-800 dark:text-zinc-300'
      ]"
    >
      {{ data.title }}
    </p>
    <!-- 价格 -->
    <p
      class="text-[32px] tracking-tighter font-sans font-bold"
      :class="[
        select
          ? 'text-yellow-800 dark:text-orange-300'
          : 'text-yellow-800 dark:text-zinc-300'
      ]"
    >
      <span class="text-base">￥</span>
      {{ data.price }}
    </p>
    <!-- 原价 -->
    <p class="text-xs text-yellow-500 line-through">￥{{ data.oldPrice }}</p>
    <!-- 热销 -->
    <div
      v-if="data.isHot"
      class="absolute right-[-1px] top-[-12px] h-[22px] w-[48px] leading-[22px] text-center text-yellow-700 bg-gradient-to-r from-orange-300 to-orange-100 text-[12px] rounded-tr-[10px] rounded-bl-[10px]"
    >
      热销
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // 数据源
  data: {
    type: Object,
    required: true
  },
  // 是否被选中
  select: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['handleItemClick'])

const handleItemClick = () => {
  emits('handleItemClick', props.data)
}
</script>

<style lang="scss" scoped></style>
