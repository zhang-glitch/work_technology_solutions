import { createApp } from 'vue'
import "./styles/index.scss"
import App from './App.vue'
import router from "./router"
import libs from "./libs"
// 注册 svg-icons
import "virtual:svg-icons-register"

createApp(App).use(router).use(libs).mount('#app')
