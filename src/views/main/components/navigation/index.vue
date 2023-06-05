<template>
  <div class="navigation">
    <mobile-navigation v-if="isMobileTerminal" />
    <hm-svg-icon name="back" class="w-2 h-2"></hm-svg-icon>
  </div>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import MobileNavigation from './mobile/index.vue'
</script>
<style scoped></style>
