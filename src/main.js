import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import { useREM } from './utils/flexible'
import libs from './libs'
// 注册 svg-icons
import 'virtual:svg-icons-register'

useREM()
// 注意：onresize事件检测的是布局视口的变化。
window.onresize = useREM

createApp(App).use(router).use(libs).mount('#app')
