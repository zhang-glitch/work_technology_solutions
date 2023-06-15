<template>
  <div class="navigation">
    <mobile-navigation v-if="isMobileTerminal" />
    <pc-navigation v-else></pc-navigation>
  </div>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import MobileNavigation from './mobile/index.vue'
import PcNavigation from './pc/index.vue'
import { useStore } from 'vuex'
const store = useStore()
store.dispatch('category/getCategoryList')
</script>
<style scoped></style>
