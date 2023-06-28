<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <!-- 头部图标 -->
    <header-vue></header-vue>
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        注册账号
      </h3>
      <!-- 表单 -->
      <vee-form @submit="handleRegister">
        <!-- 用户名 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
          v-model="regForm.username"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        >
        </vee-error-message>
        <!-- 密码 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          type="password"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
          v-model="regForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        >
        </vee-error-message>
        <!-- 确认密码 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="confirmPassword"
          type="password"
          placeholder="确认密码"
          autocomplete="on"
          rules="validateConfirmPassword:@password"
          v-model="regForm.confirmPassword"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="confirmPassword"
        >
        </vee-error-message>

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <div class="mb-2">
            <a
              class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
              target="__black"
              @click="handleToLogin"
            >
              去登录
            </a>
          </div>
          <div class="text-center">
            <a
              class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400"
              href="https://www.haomiao.love/"
              target="__black"
            >
              注册即同意《昊淼网注册协议》
            </a>
          </div>
        </div>

        <hm-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :isActiveAnim="false"
          :loading="loading"
        >
          立即注册
        </hm-button>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import md5 from 'md5'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from 'vee-validate'

import {
  validateUsername,
  validatePassword,
  validateConfirmPassword
} from '../login/validate'
import HeaderVue from '../login/components/header.vue'
import { postRegister } from '../../api/sys'
import { useStore } from 'vuex'

const regForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

/**
 * 点击注册
 */
const loading = ref(false)
const handleRegister = () => {
  loading.value = true
  handleRegisterRequest()
    .then(() => {
      router.push('/')
    })
    .finally(() => {
      loading.value = false
    })
}

/**
 * 注册请求
 */
const store = useStore()
const handleRegisterRequest = async () => {
  // 已注册等情况
  try {
    await postRegister({
      username: regForm.value.username,
      password: regForm.value.password ? md5(regForm.value.password) : ''
    })
  } catch (error) {
    return Promise.reject(error)
  }
  // 注册成功，触发登录
  await store.dispatch('user/changToken', {
    username: regForm.value.username,
    password: regForm.value.password,
    loginType: 'username'
  })
}
/**
 * 跳转到登录页
 */
const router = useRouter()
const handleToLogin = () => {
  router.push('/login')
}

/**
 * 定义关联规则， 例如确认密码
 */
defineRule('validateConfirmPassword', validateConfirmPassword)
</script>

<style scoped></style>
