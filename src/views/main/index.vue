<template>
  <!-- 二级路由组件 -->
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
    ref="containerRef"
  >
    <!-- 头部 / 移动端categorymenu -->
    <navigation-vue></navigation-vue>
    <!-- 内容列表展示 -->
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list-vue></list-vue>
    </div>
    <!-- 底部tabbar -->
    <hm-trigger-menu
      v-if="isMobileTerminal"
      class="fixed bottom-6 m-auto left-0 right-0 w-[220px]"
    >
      <hm-trigger-menu-item
        icon="home"
        iconClass="fill-zinc-900 dark:fill-zinc-200"
      >
        首页
      </hm-trigger-menu-item>
      <hm-trigger-menu-item
        v-if="token"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="handleVipClick"
      >
        VIP
      </hm-trigger-menu-item>
      <hm-trigger-menu-item
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="handleMyClick"
      >
        {{ token ? '我的' : '登录' }}
      </hm-trigger-menu-item>
    </hm-trigger-menu>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<script setup>
import NavigationVue from './components/navigation/index.vue'
import ListVue from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import { computed, onActivated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useScroll } from '@vueuse/core'

const store = useStore()
const router = useRouter()

const token = computed(() => store.getters.token)
/**
 * 点击vip
 */
const handleVipClick = () => {
  // 配置跳转方式
  store.commit('app/setRouterType', 'push')
  router.push('/member')
}

/**
 * 点击登录或者我的
 */

const handleMyClick = () => {
  // 配置跳转方式
  store.commit('app/setRouterType', 'push')
  // 未登录跳转到登录
  if (token.value) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}

/**
 * 记录页面滚动位置
 */
const containerRef = ref(null)
const { y: containerRefScrollY } = useScroll(containerRef)
// 被缓存的组件再次可见，会回调 onActivated 方法
onActivated(() => {
  if (!containerRef.value) {
    return
  }
  containerRef.value.scrollTop = containerRefScrollY.value
})
</script>

<style></style>
