<template>
  <hm-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        v-if="token"
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img
          v-lazy
          class="w-3 h-3 rounded-sm"
          :src="$store.getters.userInfo.avatar"
        />
        <!-- 下箭头 -->
        <hm-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></hm-svg-icon>
        <!-- vip 标记 -->
        <hm-svg-icon
          v-if="$store.getters.userInfo.vipLevel"
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
        ></hm-svg-icon>
      </div>
      <div v-else>
        <hm-button
          class="guide-my"
          icon="profile"
          iconColor="#fff"
          @click="handleToLogin"
        ></hm-button>
      </div>
    </template>

    <div v-if="token" class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr"
        :key="item.id"
        @click="handleItemClick(item.path)"
      >
        <hm-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></hm-svg-icon>
        <span class="text-zinc-800 dark:text-zinc-300 text-sm">
          {{ item.title }}
        </span>
      </div>
    </div>
  </hm-popover>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { createConfirm } from '../../../../libs'

const router = useRouter()
// 构建 menu 数据源
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]

// 进入登录
const handleToLogin = () => {
  // 配置跳转方式
  store.commit('app/setRouterType', 'push')
  router.push('/login')
}

/**
 * menu Item 点击事件，也可以根据其他的 key 作为判定，比如 name
 */
const handleItemClick = (path) => {
  // 有路径则进行路径跳转
  if (path) {
    // 配置跳转方式
    store.commit('app/setRouterType', 'push')
    router.push(path)
    return
  } else {
    createConfirm({
      content: '您确定要退出登录？'
    }).then(() => {
      // 退出登录
      store.commit('user/postLogout')
    })
  }
}

/**
 * 获取token，判断展示图标
 */
const store = useStore()
const token = computed(() => store.getters.token)
</script>

<style lang="scss" scoped></style>
