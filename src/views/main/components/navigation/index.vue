<template>
  <div class="navigation">
<<<<<<< Updated upstream
    <mobile-navigation v-if="isMobileTerminal"/>
  </div>
</template>
<script setup>
import {isMobileTerminal} from "@/utils/flexible"
import MobileNavigation from "./mobile/index.vue"
=======
    <mobile-navigation v-if="isMobileTerminal" />
    <hm-svg-icon name="back" class="w-2 h-2"></hm-svg-icon>
  </div>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import MobileNavigation from './mobile/index.vue'
>>>>>>> Stashed changes
</script>
<style scoped></style>
