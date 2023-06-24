<template>
  <!-- 这个插槽的意思就是循环这个组件的插槽。默认插槽，组件中的内容就作为所有默认插槽的内容 -->
  <div
    class="relative"
    ref="containerRef"
    :style="{
      height: containerHeight + 'px' // 因为当前为 relative 布局，所以需要主动指定高度
    }"
  >
    <!-- 因为列数不确定，所以需要根据列数计算每列的宽度，所以等待列宽计算完成，并且有了数据源之后进行渲染 -->
    <template v-if="columnWidth && data.length">
      <!-- 通过动态的 style 来去计算对应的列宽、left、top -->
      <div
        class="hm-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
    <!-- 可以给一个加载中的描述，没有也无所谓 -->
    <!-- <div v-else>加载中...</div> -->
  </div>
</template>
<script>
export default {
  name: 'waterfall'
}
</script>
<script setup>
import { computed, onMounted, ref, watch, nextTick } from 'vue'
import {
  getAllImgSrc,
  getImgElements,
  allImgComplete,
  getMinHeightColumn,
  getMinHeight,
  getMaxHeight
} from './utils'

const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识 key
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    type: [String, Number],
    default: 2
  },
  // 列间距
  columnSpacing: {
    type: [String, Number],
    default: 20
  },
  // 行间距
  rowSpacing: {
    type: [String, Number],
    default: 20
  },
  // 是否需要进行图片预读取
  picturePreReading: {
    type: Boolean,
    default: true
  }
})

// 容器的总高度
const containerHeight = ref(0)
// 记录每列高度的容器。key：所在列  val：列高
const columnHeightObj = ref({})
/**
 * 构建记录各列的高度的对象。初始化都为0
 */
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

/**
 * 计算容器宽度,不需要padding,margin,border
 */
// 容器宽度
const containerWidth = ref(0)
// 容器dom
const containerRef = ref(null)
// 容器左边距
const containerLeft = ref(0)
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerRef.value,
    null
  )
  // 容器左边距
  containerLeft.value = parseFloat(paddingLeft)
  // 容器宽度
  containerWidth.value =
    containerRef.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}
/**
 * 计算item宽度
 */
// 列宽度
const columnWidth = ref(0)
// 列间距总大小 (column - 1) * columnSpacing
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})
const useColumnWidth = () => {
  // 获取容器宽度
  useContainerWidth()
  // 获取列宽
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
  // 计算列宽
  useColumnWidth()
})

/**
 * 计算每个item高度, 根据图片是否已定义指定宽度 （预加载  /  直接计算）
 */
// item高度列表
let itemsHeight = []
/**
 *  图片未定义高度
 */
const waitImgComplete = () => {
  // 初始化item高度列表
  itemsHeight = []
  // 获取 item 元素
  const itemElements = [...document.getElementsByClassName('hm-waterfall-item')]
  // 获取所有元素的 img 标签
  const imgElements = getImgElements(itemElements)
  // 获取所有 img 图片路径
  const allImgSrc = getAllImgSrc(imgElements)
  // 计算图片预加载，然后计算高度
  allImgComplete(allImgSrc).then(() => {
    itemElements.forEach((itemEl) => {
      itemsHeight.push(itemEl.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  })
}

/**
 * 图片不需要预加载时，计算 item 高度
 */
const useItemHeight = () => {
  // 初始化item高度列表
  itemsHeight = []
  // 获取 item 元素
  const itemElements = [...document.getElementsByClassName('hm-waterfall-item')]
  // 获取item高度
  itemElements.forEach((itemEl) => {
    itemsHeight.push(itemEl.offsetHeight)
  })
  // 渲染位置
  useItemLocation()
}

// 渲染位置
const useItemLocation = () => {
  props.data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) return

    // 拿到最小高度，计算_style中的left， top
    item._style = {}
    item._style.left = getItemLeft()
    item._style.top = getItemTop()
    // 每次设置完偏移量时，都需要更改最短列的高度。
    increasingHeight(index)
  })

  // 当所有item设置好偏移量时，将容器高度设置为列最高的高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

/**
 * 计算当前元素的left偏移量
 */
const getItemLeft = () => {
  // 获取最小高度的列
  const column = getMinHeightColumn(columnHeightObj.value)
  // 计算left
  return (
    (columnWidth.value + props.columnSpacing) * column + containerLeft.value
  )
}

/**
 * 计算当前元素的top偏移量
 */
const getItemTop = () => {
  // 获取列最小高度
  const minHeight = getMinHeight(columnHeightObj.value)
  return minHeight
}

/**
 * 重新计算最小高度列高度
 */
const increasingHeight = (index) => {
  // 获取最小高度的列
  const column = getMinHeightColumn(columnHeightObj.value)
  // 该列高度重新计算
  columnHeightObj.value[column] =
    columnHeightObj.value[column] + itemsHeight[index] + props.rowSpacing
}

/**
 * 何时计算item 高度。当props.data发生改变时
 */
watch(
  () => props.data,
  (newVal) => {
    // 重置数据源
    const resetColumnHeight = newVal.every((item) => !item._style)
    if (resetColumnHeight) {
      // 构建高度记录容器
      useColumnHeightObj()
    }
    nextTick(() => {
      if (props.picturePreReading) {
        waitImgComplete()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)

/**
 * 监听列数变化，重新构建瀑布流
 */
const reset = () => {
  setTimeout(() => {
    // 重新计算列宽
    useColumnWidth()
    // 重置所有的定位数据，因为 data 中进行了深度监听，所以该操作会触发 data 的 watch
    props.data.forEach((item) => {
      item._style = null
    })
  }, 100)
}
watch(
  () => props.column,
  () => {
    if (props.picturePreReading) {
      // 在 picturePreReading 为 true 的前提下，需要首先为列宽滞空，列宽滞空之后，会取消瀑布流渲染
      columnWidth.value = 0
      // 等待页面渲染之后，重新执行计算。否则在 item 没有指定过高度的前提下，计算出的 item 高度会不正确
      nextTick(reset)
    } else {
      reset()
    }
  }
)
</script>

<style scoped></style>
