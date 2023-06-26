import { h, render } from 'vue'
import Confirm from './index.vue'

export default function createConfirm({
  title,
  content,
  cancelText = '取消',
  confirmText = '确定'
}) {
  return new Promise((resolve, reject) => {
    // 暂时性死区
    // const confirmInstance = createApp(Confirm, {
    //   title,
    //   content,
    //   cancelText,
    //   confirmText,
    //   closeAfter,
    //   handleConfirmClick,
    //   handleCancelClick
    // })
    // const mountNode = document.createElement('div')
    // document.body.appendChild(mountNode)
    // confirmInstance.mount(mountNode)

    /**
     * 移除confirm
     */
    const closeAfter = () => {
      // const confirmId = document.getElementById('confirm')
      // confirmId && document.body.removeChild(confirmId)

      // 2. render
      render(null, document.body)
    }

    /**
     * 点击确定按钮，回调
     */
    const handleConfirmClick = resolve

    /**
     * 点击取消按钮，回调
     */
    const handleCancelClick = reject

    // 1. vnode 生成vnode，并传入props
    const vnode = h(Confirm, {
      title,
      content,
      cancelText,
      confirmText,
      closeAfter,
      handleConfirmClick,
      handleCancelClick
    })
    // 2. render 渲染组件到body中
    render(vnode, document.body)
  })
}
