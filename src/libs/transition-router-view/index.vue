<template>
  <!-- 路由出口 -->
  <router-view v-slot="{ Component }">
    <!-- 动画组件 -->
    <transition
      :name="transitionName"
      @before-enter="beforeEnter"
      @after-leave="afterLeave"
    >
      <!-- 缓存组件 -->
      <!-- :key="$route.fullPath" 防止动态路由间跳转有缓存 -->
      <keep-alive :include="virtualTaskStack">
        <component
          :class="{ 'fixed top-0 left-0 w-screen z-50': isAnimation }"
          :is="Component"
          :key="$route.fullPath"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
const ROUTER_TYPE_NONE = 'none'
const ROUTER_TYPE_PUSH = 'push'
const ROUTER_TYPE_BACK = 'back'
</script>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  // 跳转类型。pc端不进行跳转动画 为none
  routerType: {
    type: String,
    default: ROUTER_TYPE_NONE,
    validate(val) {
      if (
        val == ROUTER_TYPE_BACK ||
        val == ROUTER_TYPE_NONE ||
        val == ROUTER_TYPE_PUSH
      ) {
        return true
      } else {
        console.error(
          `请传入${ROUTER_TYPE_NONE}、${ROUTER_TYPE_BACK}、${ROUTER_TYPE_PUSH}类型之一`
        )
        return false
      }
    }
  },
  // 首页的组件名称，对应任务栈中的第一个组件
  mainComponentName: {
    type: String,
    required: true
  }
})
// 缓存的组件
const virtualTaskStack = ref([props.mainComponentName])

/**
 * 监听跳转类型，然后确定动画名称
 */
const transitionName = ref('')
watch(
  () => props.routerType,
  (val) => {
    transitionName.value = val
  }
)

/**
 * 每次路由切换，改变缓存组件数组。
 */
const router = useRouter()
router.beforeEach((to, from) => {
  // // 定义当前动画名称
  // transitionName.value = props.routerType

  if (props.routerType === ROUTER_TYPE_PUSH) {
    // 入栈
    virtualTaskStack.value.push(to.name)
  } else if (props.routerType === ROUTER_TYPE_BACK) {
    // 出栈
    virtualTaskStack.value.pop()
  }

  // 进入首页默认清空栈
  if (to.name === props.mainComponentName) {
    clearTask()
  }
})

/**
 * 动画开始
 */
const isAnimation = ref(false)
const beforeEnter = () => {
  isAnimation.value = true
}

/**
 * 动画结束
 */
const afterLeave = () => {
  isAnimation.value = false
}

/**
 * 清空栈
 */
const clearTask = () => {
  virtualTaskStack.value = [props.mainComponentName]
}
</script>

<style lang="scss" scoped>
// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.6s;
}
// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.6s;
}
// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.6s;
}
// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.6s;
}
// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
