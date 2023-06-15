<template>
  <hm-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        v-if="true"
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img
          v-lazy
          class="w-3 h-3 rounded-sm"
          src="https://p3-passport.byteimg.com/img/user-avatar/604ae5ca7f7c2b623433eeab3dc4644e~180x180.awebp"
        />
        <!-- 下箭头 -->
        <hm-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></hm-svg-icon>
        <!-- vip 标记 -->
        <hm-svg-icon
          v-if="true"
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
        ></hm-svg-icon>
      </div>
      <div v-else>
        <hm-button
          class="guide-my"
          icon="profile"
          iconColor="#fff"
          @click="onToLogin"
        ></hm-button>
      </div>
    </template>

    <div v-if="true" class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr"
        :key="item.id"
        @click="onItemClick(item.path)"
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
import { useRouter } from 'vue-router'

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
const onToLogin = () => {
  // 配置跳转方式
  router.push('/login')
}

/**
 * menu Item 点击事件，也可以根据其他的 key 作为判定，比如 name
 */
const onItemClick = (path) => {
  // 有路径则进行路径跳转
  if (path) {
    // 配置跳转方式
    router.push(path)
    return
  }
}
</script>

<style lang="scss" scoped></style>
