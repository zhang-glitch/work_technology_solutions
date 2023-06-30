<template>
  <!-- 一级路由 -->
  <div class="h-screen fixed top-0 left-0 w-screen">
    <!-- <router-view></router-view> -->
    <hm-transition-router-view
      :routerType="$store.getters.routerType"
      mainComponentName="home"
    ></hm-transition-router-view>
  </div>
</template>

<script setup>
import HmTransitionRouterView from '@/libs/transition-router-view/index.vue'
</script>

<style></style>
