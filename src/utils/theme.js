import { watch } from 'vue'
import store from '../store'
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '../constants'

/**
 * 监听系统主题变化
 */
let matchMedia = ''
function changeSystemTheme() {
  // 仅需初始化一次即可
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')

  // let systemTheme = ''
  // matchMedia.addEventListener('change', (event) => {
  //   // true是深色模式， false是浅色主题
  //   // systemTheme = event.matches ? THEME_DARK : THEME_LIGHT
  // })
  // return systemTheme

  matchMedia.addEventListener('change', (event) => {
    // true是深色模式， false是浅色主题
    changeTheme(THEME_SYSTEM)
  })
}

/**
 * 主题匹配函数
 * @param val {*} 主题标记
 */
const changeTheme = (val) => {
  let htmlClass = ''
  if (val === THEME_LIGHT) {
    // 浅色主题
    htmlClass = THEME_LIGHT
  } else if (val === THEME_DARK) {
    // 深色主题
    htmlClass = THEME_DARK
  } else {
    // 跟随系统
    changeSystemTheme()
    htmlClass = matchMedia.matches ? THEME_DARK : THEME_LIGHT
  }
  document.querySelector('html').className = htmlClass
}

/**
 * 初始化主题
 */
export default () => {
  // 监听主题切换，修改html class的值
  watch(() => store.getters.themeType, changeTheme, {
    immediate: true
  })
}
