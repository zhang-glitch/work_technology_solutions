import { createApp, h, render } from 'vue'
import Message from './index.vue'

export function createMessage({ type, content, delay = 3000 }) {
  // const messageInstance = createApp(Message, {
  //   type,
  //   content,
  //   delay
  // })

  // // 挂载
  // const mountNode = document.createElement('div')
  // document.body.appendChild(mountNode)
  // messageInstance.mount(mountNode)
  // // 指定时间内，移除message组件
  // setTimeout(() => {
  //   messageInstance.unmount(mountNode)
  //   document.body.removeChild(mountNode)
  // }, delay)

  /**
   * 动画结束时的回调
   */
  const closeAfter = () => {
    // message 销毁
    render(null, document.body)
  }

  // 生成vnode
  const vnode = h(Message, {
    type,
    content,
    delay,
    closeAfter
  })
  // 渲染组件
  render(vnode, document.body)
}
