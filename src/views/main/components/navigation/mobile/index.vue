<template>
  <div>
    移动端下的navigation
  </div>
</template>
<script setup>
import {getCategoryList} from "@/api/category"

getCategoryList().then(res => {
  console.log("res", res)
})
</script>
<style  scoped>
</style>