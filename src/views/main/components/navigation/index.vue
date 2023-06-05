<template>
  <div class="navigation">
    <mobile-navigation v-if="isMobileTerminal"/>
    <svg-icon name="back" class="w-2 h-2"></svg-icon>
    <ul>
      <li v-for="item in arr" :key="item" ref="itemRef">{{ item }}</li>
    </ul>
  </div>
</template>
<script setup>
import {isMobileTerminal} from "@/utils/flexible"
import { onMounted, ref } from "vue"
import MobileNavigation from "./mobile/index.vue"
const arr = ["zh", "llm"]
const itemRef = ref()
onMounted(() => {
  console.log("res", itemRef.value)
})
</script>
<style  scoped>
</style>