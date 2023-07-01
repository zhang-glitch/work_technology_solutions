<template>
  <div class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 xl:pt-1">
    <div
      class="max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4"
    >
      <!-- 移动端 navbar 处理 -->
      <hm-navbar
        v-if="isMobileTerminal"
        sticky
        @handleLeftClick="handleNavbarLeftClick"
      >
        精选会员
      </hm-navbar>

      <div class="py-2 px-1">
        <h2
          class="text-center text-[34px] font-bold tracking-widest text-yellow-600"
        >
          精选VIP
        </h2>
        <p class="text-center text-lg text-yellow-500">
          升级精选VIP，畅想所有内容
        </p>
        <div
          class="flex justify-between mt-5 overflow-scroll pb-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
        >
          <pay-menu-item
            v-for="item in vipPayListData"
            :key="item.id"
            :select="item.id === currentPayData.id"
            :data="item"
            @handleItemClick="handleItemClick"
          ></pay-menu-item>
        </div>
        <p class="mt-1 text-sm text-zinc-500">{{ currentPayData.desc }}</p>
        <!-- 支付 -->
        <payment-vue class="mt-4" :payData="currentPayData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'

import { isMobileTerminal } from '@/utils/flexible'
import PayMenuItem from './components/pay-menu-item.vue'
import { getVipPayList } from '@/api/pay'
import PaymentVue from './components/payment/index.vue'

const store = useStore()
const router = useRouter()

/**
 * 获取支付对象列表
 */
const vipPayListData = ref([])
const currentPayData = ref({})
const getPayList = async () => {
  const res = await getVipPayList()
  vipPayListData.value = res
  currentPayData.value = res[0]
}
getPayList()

/**
 * 移动端点击navbar返回
 */
const handleNavbarLeftClick = () => {
  store.commit('app/setRouterType', 'back')
  router.back()
}

/**
 * 点击支付item
 */
const handleItemClick = (item) => {
  currentPayData.value = item
}
</script>

<style scoped></style>
