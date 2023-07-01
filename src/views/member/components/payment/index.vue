<template>
  <div>
    <!-- PC 端支付 -->
    <pc-payment v-if="!isMobileTerminal" :payData="payData"></pc-payment>
    <!-- 移动端支付 -->
    <mobile-payment v-else :payData="payData"></mobile-payment>
  </div>
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import PcPayment from './pc-payment/index.vue'
import MobilePayment from './mobile-payment/index.vue'

defineProps({
  payData: {
    required: true,
    type: Object
  }
})
</script>
