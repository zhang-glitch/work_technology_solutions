import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from "path"
import {createSvgIconsPlugin} from "vite-plugin-svg-icons"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [join(__dirname, "/src/assets/icons")],
      // 指定symbolId格式，就是svg.use使用的href
      symbolId: "icon-[name]"
    })
  ],
  resolve: {
    alias: {
      "@": join(__dirname, "/src")
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.imooc-front.lgdsunday.club/",
        // 改变请求的origin为target的值
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      }
      // '/prod-api': {
      //   target: 'https://imooc-front.lgdsunday.club/',
      //   changeOrigin: true
      // }
    }
  }
})
