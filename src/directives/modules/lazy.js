import { useIntersectionObserver } from '@vueuse/core'

export default {
  mounted(el) {
    // 保存图片路径
    const imgSrc = el.getAttribute('src')
    // 将图片src置空
    el.setAttribute('src', '')

    // 监听图片的可见
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.setAttribute('src', imgSrc)
        // 停止监听
        stop()
      }
    })
  }
}
