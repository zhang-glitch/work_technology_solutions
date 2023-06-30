<template>
  <div
    class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 overflow-auto xl:pt-1"
  >
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4 xl:py-2"
    >
      <!-- 移动端 navbar -->
      <hm-navbar
        sticky
        v-if="isMobileTerminal"
        @handleLeftClick="handleLeftClick"
      >
        个人资料
      </hm-navbar>
      <!-- pc 端 -->
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">
        个人资料
      </div>
      <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3 xl:pb-0">
        <!-- 头像 -->
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <span
            class="w-8 inline-block mb-2 font-bold text-sm dark:text-zinc-300 xl:block xl:mx-auto"
            >我的头像</span
          >
          <!-- 头像部分 -->
          <div
            class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-[50%] xl:translate-x-[-50%]"
            @click="handleAvatarClick"
          >
            <img
              v-lazy
              :src="userInfo.avatar"
              alt=""
              class="rounded-[50%] w-full h-full xl:inline-block"
            />
            <!-- 移入时，显示的提示内容 -->
            <div
              class="absolute top-0 rounded-[50%] w-full h-full bg-[rgba(0,0,0,.4)] hidden xl:group-hover:block"
            >
              <hm-svg-icon
                name="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              ></hm-svg-icon>
              <div
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
              >
                点击更换头像
              </div>
            </div>
          </div>
          <!-- 隐藏域 -->
          <input
            v-show="false"
            ref="inputFileRef"
            type="file"
            accept=".png, .jpeg, .jpg, .gif"
            @change="handleImgSelect"
          />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持 jpg、png、jpeg 格式大小 5M 以内的图片
          </p>
        </div>
        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >用户名</span
          >
          <hm-input
            v-model:value="userInfo.nickname"
            class="w-full"
            type="text"
            max="20"
          ></hm-input>
        </div>
        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >职位</span
          >
          <hm-input
            v-model:value="userInfo.title"
            class="w-full"
            type="text"
          ></hm-input>
        </div>
        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >公司</span
          >
          <hm-input
            v-model:value="userInfo.company"
            class="w-full"
            type="text"
          ></hm-input>
        </div>
        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人主页</span
          >
          <hm-input
            v-model:value="userInfo.homePage"
            class="w-full"
            type="text"
          ></hm-input>
        </div>
        <!-- 个人介绍 -->
        <div class="py-1 xl:flex xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人介绍</span
          >
          <hm-input
            v-model:value="userInfo.introduction"
            class="w-full"
            type="textarea"
            max="50"
          ></hm-input>
        </div>
        <!-- 保存修改 -->
        <hm-button
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          :loading="loading"
          @click="handleSaveEdit"
        >
          保存修改
        </hm-button>
        <!-- 移动端退出登录 -->
        <hm-button
          v-if="isMobileTerminal"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="handleLogout"
        >
          退出登录
        </hm-button>
      </div>
    </div>

    <!-- PC 端 -->
    <hm-dialog
      v-if="!isMobileTerminal"
      title="剪切图片"
      v-model:isVisible="isDialogVisible"
    >
      <change-avatar
        :blob="currentBlob"
        @handleClose="isDialogVisible = false"
        @updateImgUrl="handleUpdateImgUrl"
      ></change-avatar>
    </hm-dialog>
    <!-- 移动端 -->
    <hm-popup
      v-else
      :class="{ 'h-screen': isDialogVisible }"
      v-model:isOpenPopup="isDialogVisible"
    >
      <change-avatar
        :blob="currentBlob"
        @handleClose="isDialogVisible = false"
        @updateImgUrl="handleUpdateImgUrl"
      ></change-avatar>
    </hm-popup>
  </div>
</template>

<script>
export default {
  name: 'profile'
}
</script>

<script setup>
import { ref, watch } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import { createConfirm } from '@/libs'
import { useRouter } from 'vue-router'
import { putProfile } from '@/api/sys'
import { createMessage } from '@/libs'
import ChangeAvatar from './components/change-avatar.vue'

const store = useStore()
const userInfo = ref({
  // username: '',
  // title: '',
  // company: '',
  // homePage: '',
  // introduction: ''
  ...store.getters.userInfo
})

/**
 * 点击选择图片的可是区域
 */
const inputFileRef = ref(null)
const handleAvatarClick = () => {
  // 触发input的点击事件
  inputFileRef.value?.click()
}
/**
 * 选中图片，回调
 */
const isDialogVisible = ref(false)
const currentBlob = ref('')
const handleImgSelect = () => {
  currentBlob.value = URL.createObjectURL(inputFileRef.value.files[0])
  isDialogVisible.value = true
}

/**
 * 监听 dialog 关闭
 *
 * 目的是：当两次选择相同图片时，change事件不会被触发。所以就不会展示图片弹框或者下方抽屉
 *
 * 当弹框关闭以后，重置value就行
 */
watch(isDialogVisible, (val) => {
  if (!val) {
    // 防止 change 不重复触发
    inputFileRef.value.value = null
  }
})

/**
 * 移动端点击左侧navbar
 */
const router = useRouter()
const handleLeftClick = () => {
  // 配置跳转方式
  store.commit('app/setRouterType', 'back')
  router.back()
}

/**
 * 移动端退出登录
 */
const handleLogout = () => {
  createConfirm({
    content: '确定要退出登录？'
  }).then(() => {
    store.commit('user/postLogout')
  })
}

/**
 * 保存修改
 */
const loading = ref(false)
const handleSaveEdit = async () => {
  loading.value = true
  const res = await putProfile(userInfo.value)
  createMessage({
    type: 'success',
    content: '用户信息修改成功'
  })
  // 修改成功，同步vuex数据
  store.commit('user/setUserInfo', res)
  loading.value = false
}

/**
 * 当图片成功上传oss后
 */
const handleUpdateImgUrl = (url) => {
  userInfo.value.avatar = url
}
</script>

<style scoped></style>
