import {createRouter, createWebHistory} from "vue-router"
import { isMobileTerminal } from "@/utils/flexible"
import mobileRoutes from "./modules/mobile-routes"
import pcRoutes from "./modules/pc-routes"

const router = createRouter({
  history: createWebHistory(),
  // 根据窗口尺寸，区分移动，pc路由表
  routes: isMobileTerminal.value ? mobileRoutes : pcRoutes
})

export default router