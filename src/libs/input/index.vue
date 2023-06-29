<template>
  <div class="relative">
    <input
      v-if="type === TYPE_TEXT"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
      type="text"
      v-model="inputValue"
      :maxlength="max"
    />
    <textarea
      v-if="type === TYPE_TEXTAREA"
      v-model="inputValue"
      :maxlength="max"
      rows="5"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
    ></textarea>
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentNumber === parseInt(max) }"
      >{{ currentNumber }} / {{ max }}</span
    >
  </div>
</template>

<script>
const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
</script>

<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validate(val) {
      if (val == TYPE_TEXT || val == TYPE_TEXTAREA) {
        return true
      } else {
        throw new Error('请传入正确的类型值(text, textarea)')
      }
    }
  },
  value: {
    type: String,
    required: true
  },
  // 输入最大值
  max: {
    type: [Number, String],
    default: 20
  }
})

const emits = defineEmits(['update:value'])
const inputValue = useVModel(props, 'value', emits)
const currentNumber = computed(() => inputValue.value?.length)
</script>

<style scoped></style>
