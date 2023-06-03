<template>
  <div class="navigation">
    <mobile-navigation v-if="isMobileTerminal"/>
  </div>
</template>
<script setup>
import {isMobileTerminal} from "@/utils/flexible"
import MobileNavigation from "./mobile/index.vue"
</script>
<style  scoped>
</style>