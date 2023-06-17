import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import { useREM } from './utils/flexible'
import libs from './libs'
import store from './store'
// 注册 svg-icons
import 'virtual:svg-icons-register'
import useTheme from '@/utils/theme'

useREM()
// 注意：onresize事件检测的是布局视口的变化。
window.onresize = useREM

useTheme()

createApp(App).use(router).use(store).use(libs).mount('#app')
