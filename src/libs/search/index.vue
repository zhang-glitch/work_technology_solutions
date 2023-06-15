<template>
  <!-- 指定group类名，可以在我们hover时，作用域父类 -->
  <div
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
    ref="searchRef"
  >
    <div>
      <!-- 搜索图标 -->
      <hm-svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        name="search"
        color="#707070"
      />
      <!-- 输入框 -->
      <input
        class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 focus:border-red-300"
        type="text"
        placeholder="搜索"
        v-model="searchValue"
        @keyup.enter="handleSearchClick"
        @focus="handleFocus"
        @input="handleInput"
        @blur="handleUnFocus"
      />
      <!-- 删除按钮 -->
      <hm-svg-icon
        v-show="searchValue"
        name="input-delete"
        class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"
        @click="handleDeleteSearchValue"
      ></hm-svg-icon>
      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- TODO: 搜索按钮(通用组件) -->
      <hm-button
        class="absolute translate-y-[-50%] top-[50%] right-1 rounded-xl duration-500 opacity-0 group-hover:opacity-100"
        icon="search"
        iconColor="#ffffff"
        @click="handleSearchClick"
      ></hm-button>
    </div>
    <!-- 下拉区 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-3xl scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
      >
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script>
const EMIT_UPDATE_SEARCHVALUE = 'update:searchValue'
const EMIT_HANDLE_SEARCH = 'handleSearch'
// 删除所有文本
const EMIT_HANDLE_DELETE = 'handleDelete'
// 输入事件
const EMIT_HANDLE_INPUT = 'handleInput'
// 获取焦点
const EMIT_HANDLE_FOCUS = 'handleFocus'
// 失去焦点
const EMIT_HANDLE_UNFOCUS = 'handleUnFocus'
</script>

<script setup>
/**
 * 输入内容，双向绑定
 * 搜索按钮在hover时展示
 * 一键清空文本
 * 触发搜索
 * 控制下拉展示区
 * 事件处理
 */
import { useVModel } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  searchValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits([
  EMIT_UPDATE_SEARCHVALUE,
  EMIT_HANDLE_SEARCH,
  EMIT_HANDLE_DELETE,
  EMIT_HANDLE_FOCUS,
  EMIT_HANDLE_INPUT,
  EMIT_HANDLE_UNFOCUS
])
// 如果props不是默认值modelValue，需要指定
// 当searchValue发生变化，自动触发emit去修改searchValue
const searchValue = useVModel(props, 'searchValue', emit)

// 删除输入的内容
const handleDeleteSearchValue = () => {
  // 因为我们使用了useVModel，所以修改当前组件的值，就会自动触发emit更新searchValue props
  searchValue.value = ''
  emit(EMIT_HANDLE_DELETE)
}

// 点击搜索
const handleSearchClick = () => {
  emit(EMIT_HANDLE_SEARCH, searchValue.value)
}

// input是否获取焦点
const isFocus = ref(false)
const handleFocus = () => {
  isFocus.value = true
  emit(EMIT_HANDLE_FOCUS)
}
// 当点击搜索以外的区域，隐藏
const searchRef = ref()

const handler = (e) => {
  // 防止节点为获取到
  if (searchRef.value) {
    // 这个函数是判断点击区域是否是下拉菜单。
    if (searchRef.value.contains(e.target)) {
      isFocus.value = true
    } else {
      isFocus.value = false
    }
  }
}

onMounted(() => {
  window.addEventListener('click', handler)
})

onUnmounted(() => {
  window.removeEventListener('click', handler)
})

// 输入文本
const handleInput = () => {
  emit(EMIT_HANDLE_INPUT)
}
// 失去焦点
const handleUnFocus = () => {
  emit(EMIT_HANDLE_UNFOCUS)
}
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

/* 进入之前，离开之后 */
.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
