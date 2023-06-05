import { computed } from 'vue'
// import { PC_DEVICE_WIDTH } from '@/constants'
/**
 * 是否是移动端设备； 判断依据： 屏幕宽度小于 PC_DEVICE_WIDTH
 * @returns
 */
export const isMobileTerminal = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
  // return width.value < PC_DEVICE_WIDTH
})

/**
 * 改变根字体大小，用于界面适配
 */

export function useREM() {
  //获取布局视口宽度，因为开启了理想视口，布局视口=设备横向独立像素值
  const dpWidth = document.documentElement.clientWidth
  //计算根字体大小
  const rootFontSize = dpWidth / 10
  //设置根字体大小
  document.documentElement.style.fontSize = rootFontSize + 'px'
}
