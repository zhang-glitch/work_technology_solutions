import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": join(__dirname, "/src")
    }
  },
  server: {
    proxy: {
      // "/api": {
      //   target: "https://api.imooc-front.lgdsunday.club/",
      //   // 改变请求的origin为target的值
      //   changeOrigin: true,
      //   // rewrite: (path) => path.replace(/^\/api/, ''),
      // }
      '/prod-api': {
        target: 'https://imooc-front.lgdsunday.club/',
        changeOrigin: true
      }
    }
  }
})
