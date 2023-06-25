/**
 * 生成随机色值
 */
export default function randomRGB() {
  const r = Math.ceil(Math.random() * 255)
  const g = Math.ceil(Math.random() * 255)
  const b = Math.ceil(Math.random() * 255)
  return `rgb(${r}, ${g}, ${b})`
}
