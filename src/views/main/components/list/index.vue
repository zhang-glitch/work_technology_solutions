<template>
  <div>
    <hm-waterfall
      class="w-full px-1"
      :data="listData"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="false"
    >
      <template v-slot="{ item, width }">
        <item-vue :data="item" :columnWidth="width"></item-vue>
      </template>
    </hm-waterfall>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import getList from '@/api/list.js'
import { isMobileTerminal } from '@/utils/flexible'
import ItemVue from './item.vue'

const query = ref({
  size: 20,
  page: 1
})
const listData = ref([])

const getListData = async () => {
  const res = await getList(query)
  listData.value = res.list
}

getListData()
</script>

<style scoped></style>
