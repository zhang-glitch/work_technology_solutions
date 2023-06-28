<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <!-- 头部图标：PC端 -->
    <header-vue></header-vue>
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        账号登录
      </h3>
      <!-- 表单 -->
      <vee-form @submit="handleLogin">
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          :rules="validateUsername"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          v-model="loginForm.username"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        >
        </vee-error-message>
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          :rules="validatePassword"
          type="password"
          placeholder="密码"
          autocomplete="on"
          v-model="loginForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        >
        </vee-error-message>

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
            @click="handleToRegister"
          >
            去注册
          </a>
        </div>
        <hm-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :loading="loading"
          :isActiveAnim="false"
        >
          登录
        </hm-button>
      </vee-form>

      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <qq-login></qq-login>
        <!-- 微信 -->
        <wechat-login></wechat-login>
      </div>
    </div>
    <!-- 人类行为验证模块 -->
    <slider-captcha
      v-if="isSliderCaptchaVisible"
      @handleClose="isSliderCaptchaVisible = false"
      @verifySuccess="handleVerifySuccess"
    ></slider-captcha>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import { validateUsername, validatePassword } from './validate'
import HeaderVue from './components/header.vue'
import QqLogin from './components/qq-login.vue'
import WechatLogin from './components/wechat-login.vue'
import sliderCaptcha from './components/slider-captcha.vue'
import { useStore } from 'vuex'

// 人类行为验证弹框
const isSliderCaptchaVisible = ref(false)

//表单值
const loginForm = ref({
  username: 'admin',
  password: '123456'
})

/**
 * 点击跳转到注册页面
 */
const router = useRouter()
const handleToRegister = () => {
  router.push('/register')
}

/**
 * 点击提交
 */
const handleLogin = () => {
  isSliderCaptchaVisible.value = true
}

/**
 * 验证成功, 发送请求
 */
const handleVerifySuccess = async () => {
  isSliderCaptchaVisible.value = false
  // 登录请求
  handleLoginRequest()
}

/**
 * 用户触发登录
 */

// loading
const loading = ref(false)
const store = useStore()
const handleLoginRequest = async () => {
  loading.value = true
  try {
    await store.dispatch('user/changToken', {
      ...loginForm.value,
      loginType: 'username'
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
</script>

<style scoped></style>
