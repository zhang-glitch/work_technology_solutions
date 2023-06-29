<template>
  <div class="overflow-auto relative flex flex-col items-center">
    <hm-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200 "
      @click="handleClose"
    ></hm-svg-icon>

    <img class="" ref="imageRef" :src="blob" />

    <hm-button
      class="mt-4 w-[80%] xl:w-1/2"
      :loading="loading"
      @click="handleConfirmClick"
    >
      确定
    </hm-button>
  </div>
</template>
<script>
// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1
}
</script>

<script setup>
import { onMounted, ref } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { isMobileTerminal } from '@/utils/flexible'
import { getOSSClient } from '@/utils/sts'
import { createMessage } from '@/libs'
import { useStore } from 'vuex'

defineProps({
  blob: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['handleClose', 'updateImgUrl'])

/**
 * 移动端关闭图片触发事件
 */

const handleClose = () => {
  emits('handleClose')
}

/**
 * 图片裁剪处理
 */
const imageRef = ref(null)
let cropper = null
onMounted(() => {
  /**
   * 接收两个参数：
   * 1. 需要裁剪的图片 DOM
   * 2. options 配置对象
   */
  cropper = new Cropper(
    imageRef.value,
    isMobileTerminal.value ? mobileOptions : pcOptions
  )
})

/**
 * 点击上传
 */
const loading = ref(false)
const handleConfirmClick = async () => {
  loading.value = true
  // 获取裁剪后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 裁剪后的 blob 对象
    putObjectToOSS(blob)
  })
}

/**
 * 上传图片到oss
 */
const store = useStore()
const putObjectToOSS = async (file) => {
  const ossClient = await getOSSClient()
  try {
    // 因为当前凭证只具备 images 文件夹下的访问权限，所以图片需要上传到 images/xxx.xx 。否则你将得到一个 《AccessDeniedError: You have no right to access this object because of bucket acl.》 的错误
    const fileTypeArr = file.type.split('/')
    const fileName = `${store.getters.userInfo.nickname}/${Date.now()}.${
      fileTypeArr[fileTypeArr.length - 1]
    }`
    // 文件存放路径，文件
    const res = await ossClient.put(`images/${fileName}`, file)
    // 通知父元素更改图片地址
    emits('updateImgUrl', res.url)
    createMessage({
      type: 'success',
      content: '图片上传成功'
    })
  } catch (e) {
    createMessage({
      type: 'error',
      content: '图片上传失败'
    })
  } finally {
    // 关闭动画
    loading.value = false
    // 关闭弹窗
    handleClose()
  }
}
</script>

<style scoped></style>
