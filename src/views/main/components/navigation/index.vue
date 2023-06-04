<template>
  <div class="navigation">
    <mobile-navigation v-if="isMobileTerminal"/>
    <svg-icon name="back" class="w-2 h-2"></svg-icon>111
  </div>
</template>
<script setup>
import {isMobileTerminal} from "@/utils/flexible"
import MobileNavigation from "./mobile/index.vue"
</script>
<style  scoped>
</style>